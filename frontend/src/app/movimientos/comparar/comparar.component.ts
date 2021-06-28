import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CuentaService} from '../../cuentas/service/cuenta.service';
import {Cuenta} from '../../cuentas/models/cuenta';
import {Movimientos} from '../../cuentas/models/movimiento';
import {CategoriaService} from '../../categorias/service/categoria.service';
import {Categoria} from '../../categorias/models/categoria';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styles: []
})
export class CompararComponent implements OnInit {

  formularioBusqueda: FormGroup;
  cuenta1: Cuenta;
  cuenta2: Cuenta;
  movimientos1: Movimientos = new Movimientos();
  movimientos2: Movimientos = new Movimientos();

  categorias: Categoria[] = [];
  cuentas: Cuenta[] = [];

  constructor(private cuentaService: CuentaService,
              private categoriaService: CategoriaService) {
    this.formularioBusqueda = new FormGroup({
      iban1: new FormControl('',Validators.required),
      iban2: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getCategorias();
    this.cuentaService.getCuentas()
      .subscribe(response => {
        this.cuentas = this.cuentaService.extraerCuentas(response);
        console.log(response);
      });
  }

  getCategorias(): void {
    this.categoriaService.getCategorias()
      .subscribe(response => {
        this.categorias = this.categoriaService.extraerCategorias(response);
        console.log(response);
      });
  }

  buscarMovimientos(): void {
    let valores = this.formularioBusqueda.value;
    this.getMovimientos(valores.categoria, valores.iban1).subscribe(r => {
      this.movimientos1 = this.cuentaService.extraerMovimiento(r);
    });
    this.getMovimientos(valores.categoria, valores.iban2).subscribe(r => {
      this.movimientos2 = this.cuentaService.extraerMovimiento(r);
    });
  }

  getMovimientos(categoria: string, iban: string): Observable<any> {
    return this.cuentaService.getMovimientosPorCategoria(categoria, iban);
  }

  sumarGastos1(movimientos: Movimientos):Number{
    return this.movimientos1.gastos.reduce((acum, g)=> acum+ g.importe,0)
   }
   sumarIngresos1(movimientos:Movimientos):Number{
     return this.movimientos1.ingresos.reduce((acum, g)=> acum+ g.importe,0)
   }
   sumarGastos2(movimientos: Movimientos):Number{
     return this.movimientos2.gastos.reduce((acum, g)=> acum+ g.importe,0)
    }
    sumarIngresos2(movimientos:Movimientos):Number{
      return this.movimientos2.ingresos.reduce((acum, g)=> acum+ g.importe,0)
    }


}
