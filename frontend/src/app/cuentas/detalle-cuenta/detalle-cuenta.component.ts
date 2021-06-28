import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CuentaService} from '../service/cuenta.service';
import {ActivatedRoute} from '@angular/router';
import {Cuenta} from '../models/cuenta';
import {Movimientos} from '../models/movimiento';
import {CuentaImpl} from '../models/cuenta-impl';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styles: []
})
export class DetalleCuentaComponent implements OnInit {

  formularioAltaCuenta: FormGroup;
  cuentaId: number;
  cuenta: Cuenta;
  movimientos: Movimientos;
  total = 0;

  constructor(private cuentasService: CuentaService,
              private activeRoute: ActivatedRoute) {

    this.movimientos = new Movimientos();
    this.cuenta = new CuentaImpl();
    this.cuentaId = this.activeRoute.snapshot.params.id;
    this.formularioAltaCuenta = new FormGroup({
      iban: new FormControl('')
    });

  }

  ngOnInit(): void {
    this.getCuenta();
  }

  getCuenta(): void {
    this.cuentasService.getCuenta(this.cuentaId).subscribe(
      response => {
        this.cuenta = response;
        this.formularioAltaCuenta.patchValue({
          iban: response.iban
        });
        this.getMovimientos();
      }
    );
  }

  getMovimientos(): void {
    this.cuentasService.getMovimientosCuenta(this.cuenta._links.movimientos.href)
      .subscribe(r => {
        this.movimientos = this.cuentasService.extraerMovimiento(r);
        this.movimientos.ingresos.forEach(ingreso => this.total = this.total + ingreso.importe);
        this.movimientos.gastos.forEach(gasto => this.total = this.total - gasto.importe);
      });
  }

  modificarCuenta(): void {
    this.cuenta.iban = this.formularioAltaCuenta.value.iban;
    this.cuentasService.modificarCuenta(this.cuenta)
      .subscribe(response => {
        this.ngOnInit();
      });
  }

}
