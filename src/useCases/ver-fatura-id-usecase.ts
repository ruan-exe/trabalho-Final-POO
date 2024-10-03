import { Fatura } from "../entities/fatura";
import { IFaturaRepository } from "../repositories/interfaces/fatura-repository-interface";

export class VerFaturaIDUseCase {
  
  constructor(private faturaRepository: IFaturaRepository) {}

  async execute(idFatura: string): Promise<Fatura | undefined> {
    if (idFatura.trim() === "") {
      throw new Error("ID da Fatura não informada");
    }
    const fatura = await this.faturaRepository.findById(idFatura)
    if(!fatura){
      throw new Error("Fatura não encontrado!")
    }
    return fatura;
  }
}
