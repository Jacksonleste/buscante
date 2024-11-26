import { Item, Livro } from 'src/app/interfaces/livros';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, retry, switchMap, tap } from 'rxjs';

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
    switchMap((value: string) => {
      this.loading = false;
      if (value) {
        return this.livroService.buscar(value);
      }
      return '';
    }),
    map((value) => {
      if (value != '') {
        return this.resultadoParaLivro(value as Item[]);
      }
      return [];
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
