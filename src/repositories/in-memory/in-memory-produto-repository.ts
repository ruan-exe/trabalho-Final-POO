import { Produto } from "../../entities/produto";
import { IProdutoRepository } from "../interfaces/produto-repository-interface";

export class InMemoryProdutoRepository implements IProdutoRepository {
  private produtos: Produto[] = [];

  async create(produto: Produto): Promise<Produto> {
    this.produtos.push(produto);
    return produto;
  }

  async atualizaProduto(produto: Produto): Promise<Produto> {
    const atualizar = this.produtos.find((p) => p === produto);
    if(!atualizar) {
      throw new Error("Produto deixou de existir antes dessa execução");
    }

    this.produtos.push(produto)
    return produto
  }

  async atualizaEstoque(idProduto: string, produto: Produto): Promise<Produto> {
    this.produtos.splice(this.produtos.findIndex(p => p.idProduto===idProduto),1)
    this.produtos.push(produto);
    return produto;
  }

  async findById(id: string): Promise<Produto | undefined> {
    return this.produtos.find((p) => p.idProduto === id);
  }

  async findByDesc(descricao: string): Promise<Produto | undefined> {
    return this.produtos.find((p) => p.descricao === descricao);
  }
}