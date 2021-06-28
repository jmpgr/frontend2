import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeroesComponent } from './heroes/heroes.component';
import { HttpClientModule } from '@angular/common/http';
import { NuevoIngresoComponent } from './movimientos/nuevo-ingreso/nuevo-ingreso.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NuevoGastoComponent } from './movimientos/nuevo-gasto/nuevo-gasto.component';
import { CompararComponent } from './movimientos/comparar/comparar.component';
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    NuevoIngresoComponent,
    NuevoGastoComponent,
    CompararComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
