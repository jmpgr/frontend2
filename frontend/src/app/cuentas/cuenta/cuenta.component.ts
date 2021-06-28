import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CuentaImpl} from '../models/cuenta-impl';
import {CuentaService} from '../service/cuenta.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: []
})
export class CuentaComponent implements OnInit {

  formularioAltaCuenta: FormGroup;

  constructor(private cuentasService: CuentaService,
              private router: Router) {

    this.formularioAltaCuenta = new FormGroup({
      iban: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  crearCuenta(): void {
    const jSonAltaCuenta = this.formularioAltaCuenta.value;
    let cuenta = new CuentaImpl();
    cuenta.iban = jSonAltaCuenta.iban;
    this.cuentasService.crearCuenta(cuenta).subscribe(value => {
      this.formularioAltaCuenta.reset();
      this.router.navigate(['/cuentas']);
    });

  }

}
