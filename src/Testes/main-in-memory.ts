//Main é o arquivo principal da aplicação e ele vai chamar e passar os dados

import { Fatura } from "../entities/fatura";
import { InMemoryProdutoRepository } from "../repositories/in-memory/in-memory-produto-repository";
import { InMemoryFaturaRepository } from "../repositories/in-memory/in-memory-fatura-repository";
import { CriarFaturaUseCase } from "../useCases/criar-fatura-usecase";
import { CriarProdutoUseCase } from "../useCases/criar-produto-usecase";
import { VerProdutoUsesCases } from "../useCases/ver-produto-usecases";
import { VerFaturaIDUseCase } from "../useCases/ver-fatura-id-usecase";
import { VerFaturaDataUseCase } from "../useCases/ver-fatura-data-usecase";
import { cancelarFaturaUseCase } from "../useCases/cancelar-fatura-usecase";
import { atualizarFaturaUseCase } from "../useCases/atualizar-fatura-usecase";
//import { AddProdutoFatura } from "../useCases/fatura-atualizar-add";
import { atualizarParams } from "../repositories/interfaces/fatura-repository-interface";
//import { rmProdutoFatura } from "../useCases/fatura-atualizar-rm";

//vai perguntar para o usuario como ele quer salvar as informações: SQLITE ou JSON

async function main() {

  const produtoRepository = new InMemoryProdutoRepository(); // <-- Banco de dados de memória instanciado
  const FaturaRepository = new InMemoryFaturaRepository(); // <-- Banco de dados de memória instanciado
  
  const criarProduto = new CriarProdutoUseCase(produtoRepository); // <-- Use case de produto usando 
  
  await criarProduto.execute({
    descricao: "Produto 1",
    aliquotaICMS: 18,
    aliquotaIPI: 4,
    baseICMS: 80,
    estoque: 10,
    maxDesconto: 30,
    valorCompra: 100,
    valorVenda: 150,
  });

  await criarProduto.execute({
    descricao: "Produto 2",
    aliquotaICMS: 18,
    aliquotaIPI: 4,
    baseICMS: 80,
    estoque: 10,
    maxDesconto: 30,
    valorCompra: 100,
    valorVenda: 150,
  });

  await criarProduto.execute({
    descricao: "Produto 3",
    aliquotaICMS: 18,
    aliquotaIPI: 4,
    baseICMS: 80,
    estoque: 10,
    maxDesconto: 30,
    valorCompra: 100,
    valorVenda: 150,
  });

  await criarProduto.execute({
    descricao: "Produto 3",
    aliquotaICMS: 18,
    aliquotaIPI: 4,
    baseICMS: 80,
    estoque: 10,
    maxDesconto: 30,
    valorCompra: 100,
    valorVenda: 150,
  });

  const verProduto = new VerProdutoUsesCases(produtoRepository); //Instancia de ver produto

  //const verFaturaID = new VerFaturaIDUseCase(FaturaRepository);

  const verFaturaData = new VerFaturaDataUseCase(FaturaRepository);

  
  let buscaP1 = await verProduto.execute("Produto 1");
  if (!buscaP1){
    throw new Error("Busca Inválida!")
  }

  let buscaP2 = await verProduto.execute("Produto 2");
  if (!buscaP2){
    throw new Error("Busca Inválida!")
  }
  
  let fatura = new CriarFaturaUseCase(produtoRepository, FaturaRepository);
  //let addProduto = new atualizarFaturaUseCase(produtoRepository, FaturaRepository);
  let addProduto = new atualizarFaturaUseCase(FaturaRepository,produtoRepository);
  
  await fatura.execute({
    cnpjCpf: "123.456.789-00",
    nome: "Ruan",
    data: "28/09/2024",
    //produtos: [{ idProduto: buscaP1.idProduto, quantidade: 2, desconto: 10},{ idProduto: buscaP2.idProduto, quantidade: 2, desconto: 10}]
  });

  await fatura.execute({
    cnpjCpf: "123.456.789-00",
    nome: "Pedro",
    data: "29/09/2024",
    //produtos: [{ idProduto: buscaP1.idProduto, quantidade: 2, desconto: 10},{ idProduto: buscaP2.idProduto, quantidade: 2, desconto: 10}]
  });

  await fatura.execute({
    cnpjCpf: "123.456.789-00",
    nome: "Edson",
    data: "30/09/2024",
    //produtos: [{ idProduto: buscaP1.idProduto, quantidade: 2, desconto: 10},{ idProduto: buscaP2.idProduto, quantidade: 2, desconto: 10}]
  });

  let buscaF1 = await verFaturaData.execute("28/09/2024");
  if (!buscaF1){
    throw new Error("Busca Inválida!")
  }

  let buscaF2 = await verFaturaData.execute("29/09/2024");
  if (!buscaF2){
    throw new Error("Busca Inválida!")
  }

  let listaAtualiza: atualizarParams ={
    cnpjCpf: "987.654.321-00",
    nome: "Lucas",
}

  let atualizarFat = new atualizarFaturaUseCase(FaturaRepository, produtoRepository);
  atualizarFat.execute(buscaF1[0].idFatura, listaAtualiza);

  let listaProdutos: atualizarParams ={
      produtosAdd: [{ idProduto: buscaP1.idProduto, quantidade: 2, desconto: 10},{ idProduto: buscaP2.idProduto, quantidade: 2, desconto: 10}]
  }

  await addProduto.execute(buscaF1[0].idFatura, listaProdutos);
  // await addProduto.execute(buscaF1[1].idFatura, listaProdutos);
  // await addProduto.execute(buscaF1[2].idFatura, listaProdutos);
  //await rmProduto.execute(buscaF1[0].idFatura,listaProdutos);

  let cancelar = new cancelarFaturaUseCase(FaturaRepository);
  cancelar.execute(buscaF1[0].idFatura);

  buscaF1 = await verFaturaData.execute("28/09/2024");
  if (!buscaF1){
    throw new Error("Busca Inválida!")
  }

  console.log("Busca Fatura 1: ",buscaF1);

  //console.log("Busca Fatura 2: ",buscaF2);
  //buscaP1 = await verProduto.execute("Produto 1");
  //console.log("Produto 1 -> ", buscaP1);
  //console.log(new Date());

}

main();