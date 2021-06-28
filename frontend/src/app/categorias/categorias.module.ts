import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CoreModule } from '../core/core.module';
import {ReactiveFormsModule} from '@angular/forms';
import { CategoriaModificarComponent } from './categoria-modificar/categoria-modificar.component';


@NgModule({
  declarations: [CategoriasComponent, CategoriaComponent, CategoriaModificarComponent],
    imports: [
        CommonModule,
        CategoriasRoutingModule,
        CoreModule,
        ReactiveFormsModule
    ]
})
export class CategoriasModule { }
