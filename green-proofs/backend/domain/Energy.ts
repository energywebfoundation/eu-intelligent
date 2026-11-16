import { Volume } from '@energywebfoundation/generic-green-proofs-api';

import { unitVolumeFactor } from './const.js';

export class Energy {
  private constructor(protected volume: Volume) { }

  public toVolume() {
    return this.volume;
  }

  public toWh() {
    return this.volume.toNumberWithFactor(unitVolumeFactor);
  }

  public tokWh() {
    return this.toWh() / 1000;
  }

  public gt(energy: Energy | number) {
    return this.volume.gt(energy instanceof Energy ? energy.volume : energy);
  }

  public gte(energy: Energy | number) {
    return this.volume.gte(energy instanceof Energy ? energy.volume : energy);
  }

  public sub(energy: Energy | number) {
    return Energy.fromVolume(this.volume.sub(energy instanceof Energy ? energy.volume : energy));
  }

  public eq(energy: Energy | number) {
    return this.volume.eq(energy instanceof Energy ? energy.volume : energy);
  }

  public mul(energy: Energy | number) {
    return Energy.fromVolume(this.volume.mul(energy instanceof Energy ? energy.volume : energy));
  }

  public static sum(energies: Energy[]): Energy {
    return Energy.fromVolume(Volume.sum(energies.map(e => e.volume)));
  }

  public static fromKWh(energy: number): Energy {
    const wh = energy * 1000;

    return Energy.fromWh(wh);
  }

  public static fromWh(energy: number): Energy {
    // We truncate precision after PRECISION digit.
    // e.g. PRECISION=3, energy=10.512999 -> 10.512
    const wh = Math.floor(energy * Math.pow(10, Energy.PRECISION)) / Math.pow(10, Energy.PRECISION);

    return new Energy(Volume.from(wh, unitVolumeFactor));
  }

  public static fromVolume(volume: Volume): Energy {
    return new Energy(volume);
  }

  public static PRECISION = 3;
}
