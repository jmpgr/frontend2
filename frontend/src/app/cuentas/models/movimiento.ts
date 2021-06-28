import {Ingreso} from './Ingreso';
import {Gasto} from './gasto';

export class Movimientos{

  ingresos: Ingreso[];
  gastos: Gasto[];


  constructor() {
    this.ingresos = [];
    this.gastos = [];
  }
}
