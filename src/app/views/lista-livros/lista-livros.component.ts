import { Item, Livro } from 'src/app/interfaces/livros';
import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listaLivros: Livro[];
  textoBusca:string = '';
  inputOnFocus:boolean = false;

  constructor(private livroService: LivroService) { }

  buscaLivros(){
    this.livroService.buscar(this.textoBusca).subscribe({
      next: (response)=>{
        this.listaLivros = this.resultadoParaLivro(response)
      }
    })
  }

  resultadoParaLivro(items:Item[]): Livro[] {
    const livros:Livro[] = [];

    items.forEach(item =>{
      livros.push({
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        previewLink: item.volumeInfo.infoLink,
        publishedDate: item.volumeInfo.publishedDate,
        publisher: item.volumeInfo.publisher,
        thumbnail: item.volumeInfo.imageLinks.thumbnail,
      })
    })

    return livros;
  }
}



