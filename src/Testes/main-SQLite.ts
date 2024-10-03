import { Fatura } from "../entities/fatura";
import { sQLITEProdutoRepository } from "../repositories/sqlite-repo/from-sqlite-repository-produto"
//import { sQLITEProdutoRepository } from "../repositories/sqlite-repo/from-sqlite-repository-produto"
import { CriarProdutoUseCase } from "../useCases/criar-produto-usecase";

  const produtoRepository = new sQLITEProdutoRepository(); // <-- Banco de dados de memória instanciado
  const criarProduto = new CriarProdutoUseCase(produtoRepository); // <-- Use case de produto usando 
  
async function main() {

//   await criarProduto.execute({
//     descricao: "Produto 1",
//     aliquotaICMS: 18,
//     aliquotaIPI: 4,
//     baseICMS: 80,
//     estoque: 10,
//     maxDesconto: 30,
//     valorCompra: 100,
//     valorVenda: 150,
//   });

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

  // await criarProduto.execute({
  //   descricao: "Produto 3",
  //   aliquotaICMS: 18,
  //   aliquotaIPI: 4,
  //   baseICMS: 80,
  //   estoque: 10,
  //   maxDesconto: 30,
  //   valorCompra: 100,
  //   valorVenda: 150,
  // });

  // const prodP = await produtoRepository.findByDesc("Produto 3");
  // console.log(prodP)
}

main();