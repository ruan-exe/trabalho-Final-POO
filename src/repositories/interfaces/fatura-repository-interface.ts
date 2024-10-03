import { Fatura, ProdutoFatura } from  "../../entities/fatura"

export type atualizarParams = {
  cnpjCpf?: string; 
  nome?: string;
  produtosAdd?: {
      idProduto: string;
      quantidade: number;
      desconto: number;
  }[]
  produtosRm?: {
    idProduto: string;
    quantidade: number;
    desconto: number;
}[]
};

export interface IFaturaRepository {
  create(fatura: Fatura): Promise<void>;
  atualizarFatura(fatura: Fatura): Promise<Fatura | void>
  //addProdutoFatura(fatura: Fatura): Promise<Fatura>;
  //rmProdutoFatura(fatura: Fatura, produtos: ProdutoFatura[]): Promise<Fatura>;
  cancelarFatura(fatura: Fatura, idFatura?: string): Promise<Fatura>;
  findById(idFatura: string): Promise<Fatura | undefined>;
  findByDate(dataFatura: string): Promise<Fatura[] | undefined>;
  //fecharCaixa(mesFechamento: string): Promise<Fechamento | void>
}