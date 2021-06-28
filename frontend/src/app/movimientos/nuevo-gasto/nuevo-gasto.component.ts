import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cuenta} from '../../cuentas/models/cuenta';
import {Categoria} from '../../categorias/models/categoria';
import {MovimientoService} from '../service/movimiento.service';
import {CategoriaService} from '../../categorias/service/categoria.service';
import {CuentaService} from '../../cuentas/service/cuenta.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Ingreso} from '../../cuentas/models/Ingreso';
import {Gasto} from '../../cuentas/models/gasto';

@Component({
  selector: 'app-nuevo-gasto',
  templateUrl: './nuevo-gasto.component.html',
  styles: [
  ]
})
export class NuevoGastoComponent implements OnInit {

  formularioGasto: FormGroup;
  cuentaId: number;
  cuenta: Cuenta;
  categorias: Categoria[] = [];
  opcionSeleccionada: Categoria;

  constructor(private movimientoService: MovimientoService,
              private categoriaService: CategoriaService,
              private cuentasService: CuentaService,
              private activeRoute: ActivatedRoute,
              private router: Router) {

    this.cuentaId = this.activeRoute.snapshot.params.id;
    this.formularioGasto = new FormGroup({
      idMovimiento: new FormControl(''),
      fecha: new FormControl('', Validators.required),
      concepto: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      autorizado: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.getCuenta();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias()
      .subscribe(response => {
        this.categorias = this.categoriaService.extraerCategorias(response);
        console.log(response);
      });
  }

  getCuenta(): void {
    this.cuentasService.getCuenta(this.cuentaId).subscribe(
      response => {
        this.cuenta = response;
        this.getCategorias();
      }
    );
  }

  crearGasto(): void {
    const gasto: Gasto = this.formularioGasto.value;
    gasto.cuenta = this.cuenta._links.self.href;
    gasto.categoria = this.formularioGasto.value.categoria;
    this.movimientoService.crearGasto(gasto).subscribe(res => this.router.navigate(['/cuentas/', this.cuentaId]));
  }

}
