export class ProdutoFatura {
  idProdutoFatura: string; //ID do Produto na Fatura
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorDesconto: number;
  baseICMS: number;
  valorIPI: number;
  total: number;
}

export class Fatura {
  idFatura: string = "";
  cnpjCpf: string = "";
  nome: string = "";
  data: string = "";
  valorBaseICMS: number = 0;
  valorICMS: number = 0;
  valorFrete: number = 0;
  valorIPI: number = 0;
  valorDesconto: number = 0;
  valorTotalDaNota: number = 0;
  cancelada: boolean = false;
  produtos: ProdutoFatura[] = [];
}
