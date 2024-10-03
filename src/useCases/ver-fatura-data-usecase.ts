import { Fatura } from "../entities/fatura";
import { IFaturaRepository } from "../repositories/interfaces/fatura-repository-interface";

export class VerFaturaDataUseCase {
  
  constructor(private faturaRepository: IFaturaRepository) {}

  async execute(data: string): Promise<Fatura[] | undefined> {
    if (data.trim() === "") {
      throw new Error("Data da Fatura não informada");
    }
    const fatura = await this.faturaRepository.findByDate(data)
    if(!fatura){
      throw new Error("Fatura não encontrado!!!")
    }
    return fatura;
  }
}