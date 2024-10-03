import { Fatura, ProdutoFatura } from "../../entities/fatura";
import { atualizarParams, IFaturaRepository } from "../interfaces/fatura-repository-interface";
import { IProdutoRepository } from "../interfaces/produto-repository-interface";

export class InMemoryFaturaRepository implements IFaturaRepository {
    private faturas: Fatura[] = [];
  
    async create(fatura: Fatura): Promise<void> {
        this.faturas.push(fatura);
    };
    
    async findById(idFatura: string): Promise<Fatura | undefined> {
        return this.faturas.find((f) => f.idFatura === idFatura);
    }
    
    async findByDate(dataFatura: string): Promise<Fatura[] | undefined> {
        return this.faturas.filter((f) => f.data === dataFatura);
    }

    async cancelarFatura(fatura: Fatura, idFatura?: string): Promise<Fatura> {
        const cancelar = this.faturas.find((f) => f === fatura);
        
        if(!cancelar) {
            throw new Error("A fatura foi alterada antes desta execução!");
        }

        this.faturas.splice(this.faturas.findIndex(f => f.idFatura===idFatura),1) //Remove o elemento e atualiza fatura
        this.faturas.push(fatura)
        return fatura;
    }

    async atualizarFatura(fatura: Fatura): Promise<Fatura | void> {        

        //if(!idFatura){throw new Error("ID da Fatura não existe!")}
        if(!fatura){throw new Error("Fatura não existe!")}
        //if(!atualizarParams){throw new Error("Sem parâmetros! Nada a se fazer.")}
        
        this.faturas.splice(this.faturas.findIndex(f => f.idFatura===fatura.idFatura),1)
        this.faturas.push(fatura)
        return fatura
    }

    async addProdutoFatura(fatura: Fatura): Promise<Fatura> {
        this.faturas.splice(this.faturas.findIndex((f) => f.idFatura===fatura.idFatura),1);
        this.faturas.push(fatura);
        return fatura
    }

    async rmProdutoFatura(fatura: Fatura): Promise<Fatura> {
        this.faturas.splice(this.faturas.findIndex((f) => f.idFatura===fatura.idFatura),1);
        this.faturas.push(fatura);
        return fatura
    }
}