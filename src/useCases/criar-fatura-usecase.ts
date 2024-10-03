import { randomUUID } from "crypto";
import { Fatura } from "../entities/fatura";
import { Produto } from "../entities/produto";
import { IProdutoRepository } from "../repositories/interfaces/produto-repository-interface";
import fs from "fs";
import { IFaturaRepository } from "../repositories/interfaces/fatura-repository-interface";
import { atualizarEstoqueUseCase } from "./atualizar-estoque";

type CriarFaturaParams = {
  cnpjCpf: string;
  nome: string;
  data: string;
};

export class CriarFaturaUseCase {
  constructor(private produtoRepository: IProdutoRepository, private faturaRepository: IFaturaRepository) {}
  //@params = cnpjCpf: string cpf ou cnpj, nome:string nome, data: string data 
  async execute(fatura: CriarFaturaParams): Promise<void> {
    
    const novaFatura = new Fatura();
    
    if (Object.values(fatura).every(f => f === null || f === '')){
      throw new Error('Erro. Há propriedades nulas ou vazias nesta fatura');
    }

    novaFatura.idFatura = randomUUID();
    novaFatura.nome = fatura.nome;
    novaFatura.cnpjCpf = fatura.cnpjCpf;
    novaFatura.data = fatura.data

    await this.faturaRepository.create(novaFatura);
  }
}