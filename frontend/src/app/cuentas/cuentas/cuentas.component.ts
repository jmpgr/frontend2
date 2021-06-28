import {Component, OnInit} from '@angular/core';
import {Cuenta} from '../models/cuenta';
import {CuentaService} from '../service/cuenta.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styles: []
})
export class CuentasComponent implements OnInit {


  cuentas: Cuenta[] = [];

  constructor(private cuentaService: CuentaService) {
  }

  ngOnInit(): void {
    this.cuentaService.getCuentas()
      .subscribe(response => {
        this.cuentas = this.cuentaService.extraerCuentas(response);
        console.log(response);
      });

  }

  borrarCuenta(url: string): void {
    this.cuentaService.borrarCuenta(url).subscribe(r => this.ngOnInit());
  }
}
