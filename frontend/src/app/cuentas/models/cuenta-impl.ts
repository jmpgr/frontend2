import {Cuenta} from './cuenta';
import {CuentaLinks} from './cuenta-links';

export class CuentaImpl implements Cuenta {
  id: number;
  iban: string;
  _links: CuentaLinks;

  constructor() {
  }

  getId(): number {
    return this.id;
  }

  getIban(): string {
    return this.iban;
  }

}
