import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Cuenta} from '../models/cuenta';
import {Movimientos} from '../models/movimiento';
import {Categoria} from '../../categorias/models/categoria';
import {createI18nOptions} from '@angular-devkit/build-angular/src/utils/i18n-options';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  urlEndPoint: string = environment.host + 'cuentas/';
  customUrlEndPoint: string = environment.host + 'movimientos/search/por-categoria';

  constructor(private http: HttpClient) {
  }

  borrarCuenta(url: string): Observable<any> {
    return this.http.delete(url);
  }

  getCuentas(): Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  }

  crearCuenta(cuenta: Cuenta): Observable<any> {
    return this.http.post<Cuenta>(this.urlEndPoint, cuenta);
  }

  modificarCuenta(cuenta: Cuenta): Observable<any> {
    return this.http.put<Categoria>(cuenta._links.self.href, cuenta);
  }

  getCuenta(id: number): Observable<Cuenta> {
    return this.http.get<Cuenta>(this.urlEndPoint + id);
  }

  getMovimientosCuenta(url: string): Observable<any> {
    return this.http.get(url);
  }

  getMovimientosPorCategoria(categoria: string, iban: string): Observable<any> {
    const options = {
      params: new HttpParams().set('categoria', categoria).set('iban', iban)
    };
    return this.http.get(this.customUrlEndPoint, options);
  }

  extraerMovimiento(respuestaApi: any): Movimientos {
    const movimientos: Movimientos = new Movimientos();
    if (respuestaApi._embedded.gastos !== undefined) {
      respuestaApi._embedded.gastos.forEach(gasto => {
        movimientos.gastos.push(gasto);
      });
    }
    if (respuestaApi._embedded.ingresos !== undefined) {
      respuestaApi._embedded.ingresos.forEach(ingreso => {
        movimientos.ingresos.push(ingreso);
      });
    }
    return movimientos;
  }

  extraerCuentas(respuestaApi: any): Cuenta[] {
    const cuentas: Cuenta[] = [];
    respuestaApi._embedded.cuentas.forEach(c => {
      const cuentaMapeada: Cuenta = this.mapearCuenta(c);
      cuentas.push(cuentaMapeada);
    });
    return cuentas;
  }

  mapearCuenta(cuentaAPI: Cuenta): Cuenta {
    cuentaAPI.id = this.getIdDeUrl(cuentaAPI._links.self.href);
    return cuentaAPI;
  }

  getIdDeUrl(url: string): number {
    let urlSplit = url.split('/');
    return parseInt(urlSplit.pop());
  }
}
