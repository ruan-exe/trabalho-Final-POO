// data = "01/03/2024";
// data.substring(3,5);
// retorna mês

// import { Fatura } from "../entities/fatura";
// import { Produto } from "../entities/produto";
// import { IProdutoRepository } from "../repositories/interfaces/produto-repository-interface";
// import { IFaturaRepository } from "../repositories/interfaces/fatura-repository-interface";

// export class FecharCaixaMensal {
//   constructor(private produtoRepository: IProdutoRepository, private faturaRepository: IFaturaRepository) {}

//   async execute(fatura: CriarFaturaParams): Promise<Fatura> {
    
//     const novaFatura = new Fatura();
    
//     if (Object.values(fatura).every(f => f === null || f === '')){
//       throw new Error('Erro. Há propriedades nulas ou vazias nesta fatura');
//     }

//     novaFatura.idFatura = randomUUID();
//     novaFatura.nome = fatura.nome;
//     novaFatura.cnpjCpf = fatura.cnpjCpf;
//     novaFatura.data = fatura.data

//     return this.faturaRepository.create(novaFatura);
//   }
// }