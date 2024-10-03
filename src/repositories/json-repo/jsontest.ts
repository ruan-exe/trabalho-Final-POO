import { CriarFaturaUseCase } from "../../useCases/criar-fatura-usecase";
import { VerFaturaIDUseCase } from "../../useCases/ver-fatura-id-usecase";
import { VerFaturaDataUseCase } from "../../useCases/ver-fatura-data-usecase";
import { atualizarFaturaUseCase } from "../../useCases/atualizar-fatura-usecase";
import { cancelarFaturaUseCase } from "../../useCases/cancelar-fatura-usecase";
import { VerProdutoUsesCases } from "../../useCases/ver-produto-usecases";
import { JSONProdutoRepository } from "./json-produto-repository";
import { JSONFaturaRepository } from "./json-fatura-repository";
import { Fatura } from "../../entities/fatura";

async function main() {
  let faturaRepo = new JSONFaturaRepository();
  let produtoRepo = new JSONProdutoRepository();
  let buscaProd = new VerProdutoUsesCases(produtoRepo);
  let criarFatura = new CriarFaturaUseCase(produtoRepo, faturaRepo);
  let buscarFaturaId = new VerFaturaIDUseCase(faturaRepo);
  let buscarFaturaData = new VerFaturaDataUseCase(faturaRepo);
  let cancelarFatura = new cancelarFaturaUseCase(faturaRepo);
  let atualizarFatura = new atualizarFaturaUseCase(faturaRepo, produtoRepo);
  
  // await criarFatura.execute({cnpjCpf:"123.456.789-00", nome: "Pedro", data: "05/10/2001"});
  // await criarFatura.execute({cnpjCpf:"123.456.789-00", nome: "Pedro2", data: "05/10/2001"});
  // await criarFatura.execute({cnpjCpf:"123.456.789-00", nome: "Carolyne", data: "21/05/2001"});

  //let busca1 = await buscarFaturaId.execute("0896780c-f515-46b0-97e7-8486aaa23d81");
  // let busca3 = await buscarFaturaId.execute(""); DEU ERROR (TESTADO E APROVADO)
  // console.log("fatura 1 > ", busca1);

  // let cancelada2 = await cancelarFatura.execute("e757311c-859c-4b7e-ad24-f4aa70c22ef5");

  await atualizarFatura.execute("0896780c-f515-46b0-97e7-8486aaa23d81", {produtosRm: [{idProduto: "1", quantidade: 1, desconto: 0},]})

  let buscas1 = await buscarFaturaData.execute("05/10/2001");


  

  console.log(buscas1);
}

main();

