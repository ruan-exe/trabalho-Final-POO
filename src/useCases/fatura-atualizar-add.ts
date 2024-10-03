// import { Fatura } from "../entities/fatura";
// import { Produto } from "../entities/produto";
// import { IProdutoRepository } from "../repositories/interfaces/produto-repository-interface";
// import { atualizarParams, IFaturaRepository } from "../repositories/interfaces/fatura-repository-interface";
// import { atualizarEstoqueUseCase } from "./atualizar-estoque";
// import { error } from "console";

// export class AddProdutoFatura {
//   constructor(private produtoRepository: IProdutoRepository, private faturaRepository: IFaturaRepository) {}

//   async execute(idFatura: string, atualizarParams: atualizarParams): Promise<Fatura> {
    
//     const fatura = await this.faturaRepository.findById(idFatura);

//     if(!fatura){throw new Error("Não foi possível carregar a fatura")}
//     //if(!atualizarParams){throw new Error("Houve um erro com os parâmetros!")};
//     //if(!atualizarParams.produtos){throw new Error("Houve um erro com os produtos!")};
    
//     for (let p of atualizarParams.produtos){

//     const produtoExiste = await this.produtoRepository.findById(p.idProduto);

//     if (!produtoExiste) {
//       throw new Error("Produto não encontrado!");
//     }

//     if (p.quantidade<=0){throw new Error("Quantidade de produtos não pode ser menor ou igual a zero")}
//     if (p.quantidade>produtoExiste.estoque){
//       throw new Error("Não há estoque suficiente deste produto.");
//     }else{
//       let atualizaEstoque = new atualizarEstoqueUseCase(this.produtoRepository);
//       atualizaEstoque.execute(produtoExiste.idProduto,p.quantidade);
//     }

//     if (p.desconto>produtoExiste.maxDesconto){
//       throw new Error("Desconto excede o permitido.");
//     }

//     fatura.produtos.push({
//       idProdutoFatura: produtoExiste.idProduto, //randomUUID(),  // Funcional, mas difícil de testar rapidamente...
//       baseICMS: produtoExiste.baseICMS,
//       descricao: produtoExiste.descricao,
//       quantidade: p.quantidade,
//       valorUnitario: produtoExiste.valorVenda+produtoExiste.valorVenda*(produtoExiste.aliquotaICMS+produtoExiste.aliquotaIPI),
//       total: produtoExiste.valorVenda * p.quantidade,
//       valorDesconto: p.desconto,
//       valorIPI: produtoExiste.aliquotaIPI,
//     });
//   }

//     return this.faturaRepository.addProdutoFatura(fatura);
//   }
// }