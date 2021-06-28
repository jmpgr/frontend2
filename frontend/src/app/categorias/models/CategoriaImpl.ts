import {Categoria} from './categoria';
import {Links} from '../../core/model/links';

export class CategoriaImpl implements Categoria {

  id: number;
  nombreCategoria: string;
  _links: Links;

}
