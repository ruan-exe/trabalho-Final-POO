import { Fatura,ProdutoFatura } from "../../entities/fatura";
import { Produto } from "../../entities/produto";
import { atualizarParams, IFaturaRepository } from "../interfaces/fatura-repository-interface";
import * as fs from 'fs';

type FaturaParams  = {
  cnpjCpf: string;
  nome: string;
  data: Date;
}

const filePath:string = "./repositories/json-repo/faturas.json";



export class JSONFaturaRepository implements IFaturaRepository {
  
  private faturasLidas: Fatura[] = [];
  
  private lerEAdicionarFaturas(fatura?: Fatura){
    const jsonReader = fs.readFileSync(filePath, {encoding: 'utf-8'});
    
    //caso o arquivo faturas.json esteja vazio
    if (jsonReader.trim() === "") {
      console.log("WARNING! > Nenhuma fatura encontrada.");
    }else {
      this.faturasLidas = JSON.parse(jsonReader);
    }
    if(fatura){
      this.faturasLidas.push(fatura);
    }
  }

  private salvar() {
    const jsonData = JSON.stringify(this.faturasLidas, null, 2);   
    fs.writeFileSync(filePath, jsonData, 'utf8');
  }

  async create(fatura: Fatura): Promise<void> {
    //receber a fatura, escrever no arquivo, e retornar a propria fatura
    //deve ser chamado ao inicio de cada funcao ou depois de testar fatura quando funcao(fatura: Fatura)
    if (!fatura) {
      throw new Error("Fatura inexistente!");
    }
    
    this.lerEAdicionarFaturas(fatura);
    
    this.salvar();
  }
  async findById(idFatura: string): Promise<Fatura | undefined> {
    this.lerEAdicionarFaturas();

    const fatura = this.faturasLidas.find((f) => f.idFatura === idFatura);
    if (!fatura) {
      return undefined;
    }
    return fatura;
  }
  async findByDate(dataFatura: string): Promise<Fatura[] | undefined> {
    this.lerEAdicionarFaturas();

    const faturas: Fatura[] = [];

    for(let f of this.faturasLidas) {
      if(f.data == dataFatura) {
        faturas.push(f);
      }
    }

    if (faturas.length === 0) {
      return undefined;
    }
    return faturas;
  }
  async atualizarFatura(fatura: Fatura): Promise<Fatura | void> {
    this.lerEAdicionarFaturas();
    let fatI = this.faturasLidas.findIndex((f) => f.idFatura === fatura.idFatura)
    
    this.faturasLidas[fatI] = fatura;

    console.log("fatura atualizada>", fatura);
    console.log("faturas carregadas", this.faturasLidas[0].produtos);
    this.salvar();
    return fatura;
  }
  async cancelarFatura(fatura: Fatura, idFatura?: string): Promise<Fatura> {
    if(!idFatura) {
      throw new Error("ID não informado.");
    }
    
    this.lerEAdicionarFaturas();

    let f = await this.findById(fatura.idFatura);
    if (f === undefined) {
      throw new Error("Fatura não encontrada.");
    }

    f.cancelada = true;

    this.salvar();

    return f;
  }
  async addProdutoFatura(fatura: Fatura): Promise<Fatura> {
    throw new Error("Method not implemented.");
  }
  rmProdutoFatura(fatura: Fatura, produtos: ProdutoFatura[]): Promise<Fatura> {
    throw new Error("Method not implemented.");
  }

}
