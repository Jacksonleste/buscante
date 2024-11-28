import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Item, LivrosResultado } from '../interfaces/livros';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private API: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  buscar(textoBusca: string): Observable<LivrosResultado> {
    let params = new HttpParams().set('q', textoBusca);
    return this.http
      .get<LivrosResultado>(this.API, { params })
  }
}
