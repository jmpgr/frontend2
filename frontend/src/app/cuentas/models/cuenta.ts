import {Links} from '../../core/model/links';
import {CuentaLinks} from './cuenta-links';

export interface Cuenta {
  id: number;
  iban: string;
  _links: CuentaLinks;

}
