import { Produto } from "../entities/produto";
import { IProdutoRepository } from "../repositories/interfaces/produto-repository-interface";

// type VerProdutoParams = {
//   descricao: string;
//   estoque: number;
//   baseICMS: number;
//   aliquotaICMS: number;
//   aliquotaIPI: number;
//   valorCompra: number;
//   valorVenda: number;
//   maxDesconto: number;
// };

export class VerProdutoUsesCases{
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(descricao: string): Promise<Produto | undefined> {
    if (descricao.trim() === "") {
        throw new Error("Descrição do produto não informada");
    }
    const produto = await this.produtoRepository.findByDesc(descricao)
    if(!produto){
        throw new Error("Produto não encontrado!")
    }
    return produto;
    }
}
