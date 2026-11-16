import {
  DataResolver,
  type ProcessResolved,
  ProcessStatusColor,
} from '@energywebfoundation/generic-green-proofs-api';

import type { LocalOriginEnergyProcess } from './local-origin-energy-process.process.js';

export const LocalOriginEnergyProcessResolver = () =>
  DataResolver.create<LocalOriginEnergyProcess>()
    .withFields(_f => ({
    }))
    .map((_resolved, _process): ProcessResolved => {
      return {
        processName: 'Register Energy Production',
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
