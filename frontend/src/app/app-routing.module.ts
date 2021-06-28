import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { HeroesComponent } from './heroes/heroes.component';
import {CategoriaComponent} from './categorias/categoria/categoria.component';
import {CategoriaModificarComponent} from './categorias/categoria-modificar/categoria-modificar.component';
import {CuentaComponent} from './cuentas/cuenta/cuenta.component';
import {DetalleCuentaComponent} from './cuentas/detalle-cuenta/detalle-cuenta.component';
import {NuevoIngresoComponent} from './movimientos/nuevo-ingreso/nuevo-ingreso.component';
import {NuevoGastoComponent} from './movimientos/nuevo-gasto/nuevo-gasto.component';
import {CompararComponent} from './movimientos/comparar/comparar.component';

const routes: Routes = [
   {
    path: '',
    loadChildren: () => import ('src/app/home/home.module').then(m => m.HomeModule) /*  si nos fijamos no se hace el Import de homeModule asi ganamos que no se cargue en el main */
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'nueva-categoria',
    component: CategoriaComponent
  },
  {
    path: 'nueva-cuenta',
    component: CuentaComponent
  },
  {
    path: 'categorias/:id', component: CategoriaModificarComponent
  },
  {
    path: 'cuentas/:id', component: DetalleCuentaComponent
  },
  {
    path: 'cuentas/:id/nuevo-ingreso', component: NuevoIngresoComponent
  },
  {
    path: 'cuentas/:id/nuevo-gasto', component: NuevoGastoComponent
  },
  {
    path: 'comparar-cuentas', component: CompararComponent
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule)
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./cuentas/cuentas.module').then(m => m.CuentasModule)
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
