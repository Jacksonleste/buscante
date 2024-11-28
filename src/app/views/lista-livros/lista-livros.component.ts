import { Item, Livro } from 'src/app/interfaces/livros';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounce, debounceTime, distinctUntilChanged, filter, map, Observable, retry, switchMap, tap, throwError } from 'rxjs';

const PAUSA = 500;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  textoBusca: FormControl = new FormControl();
  inputOnFocus: boolean = false;
  loading: boolean = false;
  mensagemErro:string = "";
  totalResultados: number;

  constructor(private livroService: LivroService) {}

  listarLivros$ = this.textoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    map(value => value.toLowerCase().trim()),
    filter((value:string) => value.length >= 3),
    distinctUntilChanged(),
    switchMap((value: string) => { return this.livroService.buscar(value);}),
    tap(value => this.totalResultados = value.totalItems),
    map((value) => value.items ?? []),
    map((value) => this.resultadoParaLivro(value as Item[])),
    catchError((error) => {
      console.error('Erro ao buscar livros', error);
      return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro ao buscar os livros, recarregue a aplicação.'))
    })
  );

  resultadoParaLivro(items: Item[]): Livro[] {
    const livros: Livro[] = [];

    items.forEach((item) => {
      livros.push({
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.infoLink,
        publishedDate: item.volumeInfo?.publishedDate,
        publisher: item.volumeInfo?.publisher,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail ?? undefined,
      });
    });
    console.log(livros);
    return livros;
  }
}
