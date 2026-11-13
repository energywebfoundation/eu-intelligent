import {
  DataResolver,
  type ProcessResolved,
  ProcessStatusColor,
} from '@energywebfoundation/generic-green-proofs-api';

import type { SelfConsumptionEnergyProcess } from './self-consumption-energy-process.process.js';

export const SelfConsumptionEnergyProcessResolver = () =>
  DataResolver.create<SelfConsumptionEnergyProcess>()
    .withFields(_f => ({
    }))
    .map((_resolved, _process): ProcessResolved => {
      return {
        processName: 'Register Self Consumption',
        computed: {
        },
        uiSchema: {
        },
        jsonSchema: {
        },
        status: {
          color: ProcessStatusColor.Success,
          label: 'Finished',
        },
      } satisfies ProcessResolved;
    });
