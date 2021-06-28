import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Categoria} from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  urlEndPoint: string = environment.host + 'categorias/';

  constructor(private http: HttpClient) {
  }

  getCategorias(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(this.urlEndPoint + id);
  }

  modificarCategoria(categoria: Categoria): Observable<any> {
    return this.http.put<Categoria>(categoria._links.self.href, categoria);
  }

  borrarCategoria(url: string): Observable<any> {
    return this.http.delete(url);
  }

  crearCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<Categoria>(this.urlEndPoint, categoria);
  }

  extraerCategorias(respuestaApi: any): Categoria[] {
    const categorias: Categoria[] = [];
    respuestaApi._embedded.categorias.forEach(c => {
      const categoriaMapeada: Categoria = this.mapearCategoria(c);
      categorias.push(categoriaMapeada);
    });
    return categorias;
  }

  mapearCategoria(categoriaAPI: Categoria): Categoria {
    categoriaAPI.id = this.getIdDeUrl(categoriaAPI._links.self.href);
    return categoriaAPI;
  }

  getIdDeUrl(url: string): number {
    let urlSplit = url.split('/');
    return parseInt(urlSplit.pop());
  }
}
