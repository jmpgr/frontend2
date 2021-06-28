import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoriaImpl} from '../models/CategoriaImpl';
import {CategoriaService} from '../service/categoria.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: []
})
export class CategoriaComponent implements OnInit {

  formularioAltaCategoria: FormGroup;

  constructor(private categoriaService: CategoriaService,
              private router: Router) {

    this.formularioAltaCategoria = new FormGroup({
      nombre: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  crearCategoria(): void {
    const jSonAltaCategoria = this.formularioAltaCategoria.value;
    let categoria = new CategoriaImpl();
    categoria.nombreCategoria = jSonAltaCategoria.nombre;
    this.categoriaService.crearCategoria(categoria).subscribe(value => {
      this.formularioAltaCategoria.reset();
      this.router.navigate(['/categorias']);
    });

  }

}
