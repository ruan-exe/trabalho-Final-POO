import { Produto } from "../entities/produto";
import { IProdutoRepository } from "../repositories/interfaces/produto-repository-interface";

export class atualizarEstoqueUseCase{
    constructor(private produtoRepository: IProdutoRepository) {}
    
    async execute(idProduto: string, qtEstoque: number):Promise<Produto>{
        const produto = await this.produtoRepository.findById(idProduto);

        if (!produto){
            throw new Error("O produto não está mais disponível");
        }
        
        produto.estoque=produto.estoque-qtEstoque;

        await this.produtoRepository.atualizaEstoque(idProduto,produto);
        
        return produto
    }
    
}