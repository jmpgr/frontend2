import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from '../about/about/about.component';
import {LinksComponent} from '../about/about/links/links.component';
import {InfoComponent} from '../about/about/info/info.component';
import {AuthorsComponent} from '../about/about/authors/authors.component';
import {AuthorComponent} from '../about/about/authors/author/author.component';
import {CategoriasComponent} from './categorias/categorias.component';
import {CategoriaComponent} from './categoria/categoria.component';
import {CategoriaModificarComponent} from './categoria-modificar/categoria-modificar.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriasComponent,
    children: [
      {
        path: 'nueva-categoria', component: CategoriaComponent
      },
      {
        path: 'authors', component: AuthorsComponent
      },
      {
        path: 'authors/:id', component: AuthorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule {
}
