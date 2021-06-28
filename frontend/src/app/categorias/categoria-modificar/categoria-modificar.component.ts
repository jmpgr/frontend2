import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CategoriaService} from '../service/categoria.service';
import {Categoria} from '../models/categoria';

@Component({
  selector: 'app-categoria-modificar',
  templateUrl: './categoria-modificar.component.html',
  styles: []
})
export class CategoriaModificarComponent implements OnInit {

  formularioAltaCategoria: FormGroup;
  categoriaId: number;
  categoria: Categoria;

  constructor(private activeRoute: ActivatedRoute,
              private categoriaService: CategoriaService) {
  }

  ngOnInit(): void {
    this.categoriaId = this.activeRoute.snapshot.params.id;
    console.log(this.activeRoute.snapshot.data);
    this.formularioAltaCategoria = new FormGroup({
      nombre: new FormControl('')
    });
    this.getCategoria();
  }

  getCategoria(): void {
    this.categoriaService.getCategoria(this.categoriaId).subscribe(
      response => {
        console.log(response);
        this.categoria = response;
        this.formularioAltaCategoria.patchValue({
          nombre: this.categoria.nombreCategoria
        });
      }
    );
  }

  actualizarCategoria(): void {
    this.categoria.nombreCategoria = this.formularioAltaCategoria.value.nombre;
    this.categoriaService.modificarCategoria(this.categoria)
      .subscribe(response => {
        this.ngOnInit();
      });
  }

}
