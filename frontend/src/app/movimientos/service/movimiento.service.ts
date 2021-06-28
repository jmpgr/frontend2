import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Ingreso} from '../../cuentas/models/Ingreso';
import {Observable} from 'rxjs';
import {Gasto} from '../../cuentas/models/gasto';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  ingresoEndPoint: string = environment.host + 'ingresos/';
  gastosEndPoint: string = environment.host + 'gastos/';

  constructor(private http: HttpClient) {
  }

  crearIngreso(ingreso: Ingreso): Observable<any> {
    return this.http.post(this.ingresoEndPoint, ingreso);
  }

  crearGasto(gasto: Gasto): Observable<any> {
    return this.http.post(this.gastosEndPoint, gasto);
  }
}
