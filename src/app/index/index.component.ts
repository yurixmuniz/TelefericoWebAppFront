import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public produtos: any = [];
  private _filtroLista: string = '';
  produtosFiltrados: any = [];
  constructor(private http: HttpClient) { }

  public get filtroLista(): string{
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.produtosFiltrados = this.filtroLista ? this.filtrarProdutos(this.filtroLista): this.produtos;
  }
  filtrarProdutos(filtrarPor: string): any{
    filtrarPor= filtrarPor.toLocaleLowerCase();
    return this.produtos.filter(
      (produto: {Nome: string;}) => produto.Nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }



  ngOnInit(): void {
    this.getProdutos();
  }
  public getProdutos(): void {
    this.http.get('https://localhost:5001/api/Produtos').subscribe(
      response => {
        this.produtos = response;
        this.produtosFiltrados = this.produtos;
      }
    )
  }

}
