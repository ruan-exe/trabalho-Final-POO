import { randomUUID } from "crypto";
import { Produto } from "../entities/produto";
import { IProdutoRepository } from "../repositories/interfaces/produto-repository-interface";

type CriarProdutoParams = {
  descricao: string;
  estoque: number;
  baseICMS: number;
  aliquotaICMS: number;
  aliquotaIPI: number;
  valorCompra: number;
  valorVenda: number;
  maxDesconto: number;
};

export class CriarProdutoUseCase{
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(produto: CriarProdutoParams): Promise<Produto> {
    if (produto.descricao.trim() === "") {
      throw new Error("Descrição do produto não informada");
    }
    if (Object.values(produto).every(p => p === null || p === '')){
      throw new Error('Erro. Há propriedades nulas ou vazias neste produto');
    }

    return this.produtoRepository.create({
      idProduto: randomUUID(),
      estoque: produto.estoque,
      aliquotaICMS: produto.aliquotaICMS,
      aliquotaIPI: produto.aliquotaIPI,
      baseICMS: produto.baseICMS,
      descricao: produto.descricao,
      maxDesconto: produto.maxDesconto,
      valorCompra: produto.valorCompra,
      valorVenda: produto.valorVenda,
    });
  }
}
