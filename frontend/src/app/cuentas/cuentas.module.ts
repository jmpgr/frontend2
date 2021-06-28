import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasRoutingModule } from './cuentas-routing.module';
import { CuentasComponent } from './cuentas/cuentas.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DetalleCuentaComponent } from './detalle-cuenta/detalle-cuenta.component';


@NgModule({
  declarations: [CuentasComponent, CuentaComponent, DetalleCuentaComponent],
    imports: [
        CommonModule,
        CuentasRoutingModule,
        ReactiveFormsModule
    ]
})
export class CuentasModule { }
