import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CuentaService} from '../../cuentas/service/cuenta.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MovimientoService} from '../service/movimiento.service';
import {Cuenta} from '../../cuentas/models/cuenta';
import {CategoriaService} from '../../categorias/service/categoria.service';
import {Categoria} from '../../categorias/models/categoria';
import {Ingreso} from '../../cuentas/models/Ingreso';

@Component({
  selector: 'app-nuevo-ingreso',
  templateUrl: './nuevo-ingreso.component.html',
  styles: []
})
export class NuevoIngresoComponent implements OnInit {

  formularioIngreso: FormGroup;
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
    this.formularioIngreso = new FormGroup({
      idMovimiento: new FormControl(''),
      fecha: new FormControl('', Validators.required),
      concepto: new FormControl('', Validators.required),
      importe: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      compartido: new FormControl(false)
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

  crearIngreso(): void {
    const ingreso: Ingreso = this.formularioIngreso.value;
    ingreso.cuenta = this.cuenta._links.self.href;
    ingreso.categoria = this.formularioIngreso.value.categoria;
    this.movimientoService.crearIngreso(ingreso).subscribe(res => this.router.navigate(['/cuentas/', this.cuentaId]));
  }

}
