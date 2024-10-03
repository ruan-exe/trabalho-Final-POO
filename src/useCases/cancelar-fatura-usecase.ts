import { Fatura } from "../entities/fatura";
import { IFaturaRepository } from "../repositories/interfaces/fatura-repository-interface";

export class cancelarFaturaUseCase{
    constructor(private faturaRepository: IFaturaRepository) {}

    async execute(idFatura: string):Promise<Fatura>{
        const fatura = await this.faturaRepository.findById(idFatura);

        if(!fatura){
            throw new Error("Fatura não existe!");
        }else{
            if (fatura.cancelada){
                throw new Error("Fatura já cancelada");
            }
        }
        
        this.faturaRepository.cancelarFatura(fatura,idFatura);
        return fatura  
    }
}