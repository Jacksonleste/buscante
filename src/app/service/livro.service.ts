import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private API: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient, private httpParams: HttpParams) {}

  buscar(textoBusca: string) {
    const params = new HttpParams().set('q', textoBusca);
    this.http.get(this.API, { params });
  }
}
