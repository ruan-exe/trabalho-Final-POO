import { Produto } from "../../entities/produto";
import { IProdutoRepository } from "../interfaces/produto-repository-interface";
import * as fs from 'fs';

const filePath:string = "./repositories/json-repo/products.json";

const jsonReader = fs.readFileSync(filePath, {encoding: 'utf-8'});

const toJson = JSON.parse(jsonReader);

export class JSONProdutoRepository implements IProdutoRepository {
  atualizaProduto(produto: Produto): Promise<Produto> {
    throw new Error("Method not implemented.");
  }
  atualizaEstoque(idProduto: string, produto: Produto): Promise<Produto> {
    throw new Error("Method not implemented.");
  }
  private produtos: Produto[] = toJson; //<- Funçao para pegar todos os produtos de products.json para esse array
  
  async create(produto: Produto): Promise<Produto> {
    this.produtos.push(produto);
    //Aqui precisa um código que salve o produto em .json
    return produto;
  }

  async findById(id: string): Promise<Produto | undefined> {
    return this.produtos.find((p) => p.idProduto === id);
  }

  async findByDesc(descricao: string): Promise<Produto | undefined> {
    return this.produtos.find((p) => p.descricao === descricao);
  }
}
