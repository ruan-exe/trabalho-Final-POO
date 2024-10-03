import { Router, Request, Response } from 'express';
import { CriarFaturaUseCase } from "../../useCases/criar-fatura-usecase";
import { VerFaturaIDUseCase } from "../../useCases/ver-fatura-id-usecase";
import { VerFaturaDataUseCase } from "../../useCases/ver-fatura-data-usecase";
import { atualizarFaturaUseCase } from "../../useCases/atualizar-fatura-usecase";
import { cancelarFaturaUseCase } from "../../useCases/cancelar-fatura-usecase";
import { JSONProdutoRepository } from "../../repositories/json-repo/json-produto-repository";
import { JSONFaturaRepository } from "../../repositories/json-repo/json-fatura-repository";

const faturaRepo = new JSONFaturaRepository();
const produtoRepo = new JSONProdutoRepository();
const criarFatura = new CriarFaturaUseCase(produtoRepo, faturaRepo);
const buscarFaturaId = new VerFaturaIDUseCase(faturaRepo);
const buscarFaturaData = new VerFaturaDataUseCase(faturaRepo);
const cancelarFatura = new cancelarFaturaUseCase(faturaRepo);
const atualizarFatura = new atualizarFaturaUseCase(faturaRepo, produtoRepo);
const router = Router();

//rota para criar fatura
router.post('/criar', async (req: Request, res: Response) => {
  type faturaParam = {
    cnpjCpf: string, 
    nome: string, 
    data: string,
  }

  const novaFatura:faturaParam = req.body;
  
  if (!novaFatura){
    console.error("body provavelmente esta vazio, verificar requisicao!");
  }
  await criarFatura.execute(novaFatura); 

  res.json(novaFatura);
});


//rota para buscar uma fatura
router.get('/buscar/:param', async (req: Request, res: Response) => {
  const regexData = /(\d{2}-\d{2}-\d{4})/;
  const regexId = /([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;
  
  let fatura;

  let param: string = req.params.param;

  if (param){
    if(regexData.test(param)){
      param = param.replace(/-/g, '/');
      fatura = await buscarFaturaData.execute(param);
    }
    if(regexId.test(param)){
      fatura = await buscarFaturaId.execute(param);
    }

  }

  if(!fatura){
    console.error("Fatura nao encontrada");
  }

  res.json(fatura);
});

//roota para cancelar fatura
router.patch('/cancelar/:id', async (req: Request, res: Response) => {
  const param: string = req.params.id;
  const regexId = /([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;

  if(!regexId.test(param)){
    console.error("id invalido");
    return
  }

  const fatura = await cancelarFatura.execute(param);

  res.json(fatura);
});

router.patch('/atualizar/:id', async (req: Request, res: Response) => {
  const param: string = req.params.id;
  const regexId = /([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;

  if(!regexId.test(param)){
    console.error("id invalido");
    return
  }

  const body = req.body;
  console.log(body);

  const fatura = await atualizarFatura.execute(param, body);

  res.json(fatura);
});

export default router;
