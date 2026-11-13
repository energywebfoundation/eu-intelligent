import { assert } from '@energywebfoundation/generic-green-proofs-api';
import type { DomainTypes } from '@shared/index.js';
import type { UnitMetadata } from '@shared/index.js';

import { Energy } from './Energy.js';

/** Original record that initiated the event, saved in certificate metadata */
export type EnergyEventRecord
  = | { localOriginRecord: DomainTypes.LocalOriginRecord }
    | { selfConsumptionRecord: DomainTypes.SelfConsumptionRecord };

type EnergyEventInput = {
  seller: EnergyEventSeller;
  buyer: EnergyEventBuyer;
  energyKwh: number;
  record: EnergyEventRecord;
};

export type EnergyEventSeller = { id: string; isBattery: boolean };
export type EnergyEventBuyer = { id: string; isBattery: boolean };

export type EnergyEventIssuePayload = { ownerId: string; energy: Energy; metadata: UnitMetadata };
export type EnergyEventModifyEntry = {
  certificateId: string;
  energy: Energy;
  newOwnerId?: string;
  isRetired?: boolean;
  metadata: Partial<UnitMetadata>;
};

type MatchingCertificate = { id: string; energy: Energy };
type MatchingData = { energy: Energy; certificates: MatchingCertificate[]; matches: MatchingCertificate[] };

export type EnergyEventProcessTransactions = {
  createCertificate: (payload: EnergyEventIssuePayload) => Promise<MatchingCertificate>;
  modifyCertificates: (payload: EnergyEventModifyEntry[]) => Promise<void>;
  getCertificatesOwnedBy: (ownerId: string) => Promise<Array<MatchingCertificate & { createdAt: Date }>>;
};

export class NoEnergyForEventError extends Error {
  constructor(details: {
    eventEnergy: Energy;
    availableEnergy: Energy;
  }) {
    super(`Matching cannot be done: the event volume ${details.eventEnergy.toWh()}Wh is more than available ${details.availableEnergy.toWh()}Wh`);
  }
}

/**
 * Energy event moves energy from seller to buyer:
 * - local origin: trade between two sites (any of them can be a battery)
 * - self consumption: energy produced and consumed by the same site (seller and buyer are the same non-battery site)
 */
export class EnergyEvent {
  private energy: Energy;
  private seller: EnergyEventSeller;
  private buyer: EnergyEventBuyer;
  private record: EnergyEventRecord;

  constructor(input: EnergyEventInput) {
    this.energy = Energy.fromKWh(input.energyKwh);
    this.seller = input.seller;
    this.buyer = input.buyer;
    this.record = input.record;
  }

  public async processTransactions({
    getCertificatesOwnedBy,
    createCertificate,
    modifyCertificates,
  }: EnergyEventProcessTransactions): Promise<{ leftoverEnergy: Energy }> {
    const availableCertificates = await (async () => {
      if (this.seller.isBattery === false) {
        // Normal production site, so we just issue new certificate
        return [
          await createCertificate({
            metadata: {
              version: 1,
              status: 'issued',
              ...this.record,
            },
            ownerId: this.seller.id,
            energy: this.energy,
          }),
        ];
      }

      // Battery is a seller, so we take out of all certificates its holding
      // they need to be sorted by date ASC (FIFO)
      const batteryOwnedCertificates = await getCertificatesOwnedBy(this.seller.id);
      return batteryOwnedCertificates.toSorted((u1, u2) => (u1.createdAt < u2.createdAt ? -1 : 1));
    })();

    const matchResult = this.match({
      matches: [],
      certificates: availableCertificates,
      energy: this.energy,
    });

    const groupedByCertificateId = Object.groupBy(matchResult.matches, m => m.id);
    const leftoverCertificates = Object.groupBy(matchResult.certificates, u => u.id);

    const modifyEntries = Object.entries(groupedByCertificateId).flatMap(([certificateId, matches]) => {
      assert(matches, 'Unreachable');

      const modifyEntries: EnergyEventModifyEntry[] = matches.map(match => ({
        certificateId,
        energy: match.energy,
        isRetired: this.buyer.isBattery === false, // If buyer is battery, then we only transfer, not retire
        newOwnerId: this.buyer.id !== this.seller.id ? this.buyer.id : undefined, // for self-consumption buyer and seller is the same
        metadata: {
          status: this.buyer.isBattery === true ? 'transferred' : 'retired',
          // If battery is the seller, we need to additionally save the record, because no unit is issued so record info would get lost
          ...(this.seller.isBattery === true ? this.record : {}),
        },
      }));

      if (leftoverCertificates[certificateId]) {
        assert(leftoverCertificates[certificateId].length === 1, `Should be single leftover certificate of id ${certificateId} but got: ${leftoverCertificates[certificateId].length}`);

        const leftoverCertificate = leftoverCertificates[certificateId][0];
        assert(leftoverCertificate);

        modifyEntries.unshift({
          certificateId,
          metadata: {},
          energy: leftoverCertificate.energy,
        });
      }

      return modifyEntries;
    });

    if (modifyEntries.length > 0) {
      await modifyCertificates(modifyEntries);
    }

    if (matchResult.energy.gt(0)) {
      // We do not throw in this case.
      // process should acknowledge that situation (via leftoverEnergy return), and save the information
      // throw new NoEnergyForEventError({
      //   availableEnergy: Energy.sum(availableCertificates.map(u => u.energy)),
      //   eventEnergy: this.energy,
      // });
    }

    return { leftoverEnergy: matchResult.energy };
  }

  private match({
    matches = [],
    certificates,
    energy,
  }: MatchingData): MatchingData {
    if (energy.eq(0) || certificates.length === 0) {
      return {
        matches,
        certificates: certificates.filter(u => !u.energy.eq(0)),
        energy,
      };
    }

    const [firstCertificate, ...rest] = certificates;
    assert(firstCertificate); // guarantted by `certificates.length === 0`

    if (firstCertificate.energy.gte(energy)) {
      return this.match({
        matches: [...matches, { id: firstCertificate.id, energy }],
        certificates: [{ id: firstCertificate.id, energy: firstCertificate.energy.sub(energy) }, ...rest],
        energy: Energy.fromWh(0),
      });
    } else {
      return this.match({
        matches: [...matches, { id: firstCertificate.id, energy: firstCertificate.energy }],
        certificates: rest,
        energy: energy.sub(firstCertificate.energy),
      });
    }
  }
}
