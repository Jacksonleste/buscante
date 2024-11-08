import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listaLivros: [];
  textoBusca:string = '';

  constructor(private livroService: LivroService) { }

  buscaLivros(){
    this.livroService.buscar(this.textoBusca).subscribe({
      next: (response)=>{
        console.log()
      }
    })
  }

}



