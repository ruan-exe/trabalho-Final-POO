import { randomUUID } from "crypto";
import { Fatura } from "../../entities/fatura";
import { Produto } from "../../entities/produto";
import { IProdutoRepository } from "../../repositories/interfaces/produto-repository-interface";
import fs from "fs";
import { IFaturaRepository } from "../../repositories/interfaces/fatura-repository-interface";
import { atualizarEstoqueUseCase } from "../atualizar-estoque";

type CriarFaturaParams = {
  cnpjCpf: string;
  nome: string;
  data: string;
   produtos: {
    idProduto: string;
    quantidade: number;
    desconto: number;
  }[];
};

export class CriarFaturaUseCase {
  constructor(private produtoRepository: IProdutoRepository, private faturaRepository: IFaturaRepository) {}

  async execute(fatura: CriarFaturaParams): Promise<Fatura> {
    
    const novaFatura = new Fatura();
    
    if (Object.values(fatura).every(f => f === null || f === '')){
      throw new Error('Erro. Há propriedades nulas ou vazias nesta fatura');
    }
    for (let p of fatura.produtos){

    const produtoExiste = await this.produtoRepository.findById(p.idProduto);

    if (produtoExiste === undefined) {
      throw new Error("Produto não encontrado.");
    }

    if (p.quantidade>produtoExiste.estoque){
      throw new Error("Não há estoque suficiente deste produto.");
    }else{
      let atualizaEstoque = new atualizarEstoqueUseCase(this.produtoRepository);
      atualizaEstoque.execute(produtoExiste.idProduto,p.quantidade);
    }

    if (p.desconto>produtoExiste.maxDesconto){
      throw new Error("Desconto excede o permitido.");
    }

    novaFatura.idFatura = randomUUID();
    novaFatura.nome = fatura.nome;
    novaFatura.cnpjCpf = fatura.cnpjCpf;
    novaFatura.data = fatura.data
    novaFatura.produtos.push({
      idProdutoFatura: produtoExiste.idProduto, //randomUUID(),  // Funcional, mas difícil de testar rapidamente...
      baseICMS: produtoExiste.baseICMS,
      descricao: produtoExiste.descricao,
      quantidade: p.quantidade,
      valorUnitario: produtoExiste.valorVenda,
      total: produtoExiste.valorVenda * p.quantidade,
      valorDesconto: 0,
      valorIPI: 0,
    });
    novaFatura.valorBaseICMS = produtoExiste.baseICMS;
  }

    return this.faturaRepository.create(novaFatura);
  }
}