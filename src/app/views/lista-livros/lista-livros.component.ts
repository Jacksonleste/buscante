import { Item, Livro } from 'src/app/interfaces/livros';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, filter, map, retry, switchMap, tap } from 'rxjs';

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

  constructor(private livroService: LivroService) {}

  listarLivros$ = this.textoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((value:string) => value.length >= 3),
    map(value => value.toLowerCase()),
    map(value => value.trim()),
    distinctUntilChanged(),
    switchMap((value: string) => {
      return this.livroService.buscar(value);
    }),
    map((value) => this.resultadoParaLivro(value as Item[])),
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
