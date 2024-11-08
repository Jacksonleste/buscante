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

  buscar(textoBusca: string): Observable<Item[]> {
    let params = new HttpParams().set('q', textoBusca);
    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      map(res =>res.items),
      tap(res => console.log('Após o Map', res))
    );
  }
}
