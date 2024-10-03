import { json } from "stream/consumers";
import { Produto } from "../../entities/produto";
import { IProdutoRepository } from "../interfaces/produto-repository-interface";
​import { Database } from 'sqlite3';
import { IsNull } from "typeorm";
const { promisify } = require("util");

//Método I

// db.run(`
//     CREATE TABLE IF NOT EXISTS produto (
//         idProduto varchar primary key,
//         descricao varchar,
//         estoque numeric,
//         baseICMS numeric,
//         aliquotaICMS numeric,
//         aliquotaIPI numeric,
//         valorCompra numeric,
//         valorVenda numeric,
//         maxDesconto numeric
//     )`);
// db.run(`
//     INSERT OR REPLACE INTO articles VALUES
//         (1, 'First article', 'Neque porro quisquam est qui'),
// `);


//Create db
const db = new Database('db.sqlite');
const query = promisify(db.all).bind(db); //Aparentemente tudo precisa ser promessa no SQLite para evitar erros.
const createTableProduto = `
      CREATE TABLE IF NOT EXISTS produto (
        idProduto varchar primary key,
        descricao varchar,
        estoque numeric,
        baseICMS numeric,
        aliquotaICMS numeric,
        aliquotaIPI numeric,
        valorCompra numeric,
        valorVenda numeric,
        maxDesconto numeric
    )`;

export class sQLITEProdutoRepository implements IProdutoRepository {
  private produtos: Produto[] = [];

  
  async create(produto: Produto): Promise<Produto> {
    
    const keys = Object.keys(produto).join(",");
    const values = Object.values(produto)
      .map((v) => `"${v}"`)
      .join(",");
    await query(createTableProduto);
    const produtoExiste = await this.findByDesc(produto.descricao);
    if(Object.keys(produtoExiste).length === 0){await query(`INSERT INTO ${'produto'} (${keys}) VALUES (${values})`);}
    else{throw new Error("Produto já cadastrado!")};
    return produto
  }

  async atualizaProduto(produto: Produto): Promise<Produto> {
    const atualizar = this.produtos.find((p) => p === produto);
    if(!atualizar) {
      throw new Error("Produto deixou de existir antes dessa execução");
    }

    this.produtos.push(produto)
    return produto
  }

  async atualizaEstoque(idProduto: string, produto: Produto): Promise<Produto> {
    this.produtos.splice(this.produtos.findIndex(p => p.idProduto===idProduto),1)
    this.produtos.push(produto);
    return produto;
  }

  async findById(idProduto: string): Promise<Produto | undefined> {
    const produto = await query(`SELECT * FROM produto
      where descricao='${idProduto}'`);
    return produto
  }

  async findByDesc(descricao: string): Promise<Produto> {
    const produto = await query(`SELECT * FROM produto
      where descricao='${descricao}'`);
    return produto
  }
}