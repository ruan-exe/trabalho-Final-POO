// import { Fatura } from "../entities/fatura";
// import { Produto } from "../entities/produto";
// import { IProdutoRepository } from "../repositories/interfaces/produto-repository-interface";
// import { atualizarParams, IFaturaRepository } from "../repositories/interfaces/fatura-repository-interface";
// import { atualizarEstoqueUseCase } from "./atualizar-estoque";
// import { error } from "console";

// export class rmProdutoFatura {
//   constructor(private produtoRepository: IProdutoRepository, private faturaRepository: IFaturaRepository) {}

//   async execute(idFatura: string, atualizarParams: atualizarParams): Promise<Fatura> {
    
//     const fatura = await this.faturaRepository.findById(idFatura);

//     if(!fatura){throw new Error("Não foi possível carregar a fatura")}
//     if(!atualizarParams){throw new Error("Houve um erro com os parâmetros!")};
//     if(!atualizarParams.produtos){throw new Error("Houve um erro com os produtos!")};
    
//     for (let p of atualizarParams.produtos){

//     const produtoExiste = await this.produtoRepository.findById(p.idProduto);

//     if (!produtoExiste) {
//       throw new Error("Produto não encontrado!");
//     }

//     let atualizaEstoque = new atualizarEstoqueUseCase(this.produtoRepository);
//     atualizaEstoque.execute(produtoExiste.idProduto,(-p.quantidade));
      
    
//     fatura.produtos.splice(fatura.produtos.findIndex(f => f.idProdutoFatura===produtoExiste.idProduto),1)
//   }

//     return this.faturaRepository.addProdutoFatura(fatura);
//   }
// }