import { Fatura, ProdutoFatura} from "../entities/fatura";
import { IFaturaRepository, atualizarParams } from "../repositories/interfaces/fatura-repository-interface";
import { IProdutoRepository } from "../repositories/interfaces/produto-repository-interface";
// import { AddProdutoFatura } from "./fatura-atualizar-add";
// import { rmProdutoFatura } from "./fatura-atualizar-rm";

export class atualizarFaturaUseCase{
    constructor(private faturaRepository: IFaturaRepository, private produtoRepository: IProdutoRepository) {}
    
    async execute(idFatura: string, atualizar?: atualizarParams):Promise<Fatura>{
        const fatura = await this.faturaRepository.findById(idFatura);

        if(!fatura){
            throw new Error("Fatura não existe!");
        }
        if (fatura.cancelada){
            throw new Error("Não foi possivel atualizar, motivo: Fatura já cancelada");
        }
        if(!atualizar){
            throw new Error("Nada a atualizar!")
        }

        if(atualizar.cnpjCpf){
            fatura.cnpjCpf = atualizar.cnpjCpf;
        }
        if(atualizar.nome){
            fatura.nome = atualizar.nome;
        }
        if(atualizar.produtosAdd?.length !== 0){
            if (atualizar.produtosAdd){
                for (let produto of atualizar.produtosAdd){
                    let busca1 = fatura.produtos.findIndex((p) => p.idProdutoFatura === produto.idProduto);
                    if(busca1>-1){
                        fatura.produtos[busca1].quantidade += produto.quantidade;
                    }else{
                        const prodfat = new ProdutoFatura();
                        prodfat.idProdutoFatura = produto.idProduto;
                        prodfat.valorDesconto = produto.desconto;
                        prodfat.quantidade = produto.quantidade;
                        
                        fatura.produtos.push(prodfat);
                    }
                }
            }
        }
        if(atualizar.produtosRm){
            if (atualizar.produtosAdd){
                for (let produto of atualizar.produtosAdd){
                    let busca1 = fatura.produtos.findIndex((p) => {produto.idProduto === p.idProdutoFatura});
                        if(busca1>-1){fatura.produtos[busca1].quantidade -= produto.quantidade;}
                        else{throw new Error("Produto informado não está na fatura!")};
                    }
                }
            }

        const faturaAtualizada = await this.faturaRepository.atualizarFatura(fatura);
        if(!faturaAtualizada){
            throw new Error("Algo deu errado!");
        }
        return faturaAtualizada;
    }
    
}