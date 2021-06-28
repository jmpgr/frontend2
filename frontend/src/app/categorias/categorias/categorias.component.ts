import {Component, OnInit} from '@angular/core';
import {Categoria} from '../models/categoria';
import {CategoriaService} from '../service/categoria.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService, private router: Router) {
  }

  ngOnInit(): void {
    this.categoriaService.getCategorias()
      .subscribe(response => {
        this.categorias = this.categoriaService.extraerCategorias(response);
      });

  }

  borrarCategoria(url: string): void {
    this.categoriaService.borrarCategoria(url)
      .subscribe(response => this.ngOnInit());

  }

  modificar(categoria: Categoria): void {
    this.router.navigate(['/categorias/1', JSON.stringify(categoria)]);
  }

}
