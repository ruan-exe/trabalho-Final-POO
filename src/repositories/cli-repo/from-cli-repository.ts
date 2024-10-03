import { Produto } from "../../entities/produto";
import { CriarProdutoUseCase } from "../../useCases/criar-produto-usecase";
import { IProdutoRepository } from "../interfaces/produto-repository-interface";
import { InMemoryProdutoRepository } from "../../repositories/in-memory/in-memory-produto-repository";
import { program } from 'commander';
import { randomUUID } from "crypto";

const produtoRepository = new InMemoryProdutoRepository();


program
    .command('criar-produto')
    .description('Cria um novo produto')
    .requiredOption('-dE, --descricao <descricao>', 'Descrição do Produto')
    .requiredOption('-eS, --estoque <estoque>', 'Estoque do Produto')
    .requiredOption('-bI, --baseICMS <baseICMS>', 'Base ICMS')
    .requiredOption('-aC, --aliquotaICMS <aliquotaICMS>', 'aliquotaICMS')
    .requiredOption('-aI, --aliquotaIPI <aliquotaIPI>', 'aliquotaIPI')
    .requiredOption('-vC, --valorCompra <valorCompra>', 'valor de Compra')
    .requiredOption('-vV, --valorVenda <valorVenda>', 'Valor de Venda')
    .requiredOption('-mD, --maxDesconto <maxDesconto>', 'Desconto Máximo')

    .action(async (options) => {
        try {
            let p = await produtoRepository.create({
                idProduto: randomUUID(),
                descricao: options.descricao,
                estoque: options.estoque,
                baseICMS: options.baseICMS,
                aliquotaIPI: options.aliquotaIPI,
                aliquotaICMS: options.aliquotaICMS,
                valorCompra: options.valorCompra,
                valorVenda: options.valorVenda,
                maxDesconto: options.maxDesconto
            });
            console.log("Produto Criado com ID: ", p?.idProduto);
        }
        catch (err) {
            console.error(err);
        }
    });

// program
//     .command('ver-produto')
//     .description('Busca um usuário pelo email')
//     .requiredOption('-e, --email <email>', 'User email')
//     .action(async (options) => {
//         try {
//             let u = await getUserByEmail(options.email);
//             if (!u) {
//                 console.log("Usuario nao encontrado");
//                 return;
//             }
//             console.log(u);
//         }
//         catch (err) {
//             console.error(err);
//         }
//     });    

// program
//     .command('check-email-password')
//     .description('Tenta autenticar email e senha')
//     .requiredOption('-e, --email <email>', 'User email')
//     .requiredOption('-p, --password <password>', 'User password')
//     .action(async (options) => {
//         try {
//             let ok = await checkUserPassword(options.email, options.password);
//             if (ok) 
//                 console.log("Usuario autenticado.");
//             else
//                 console.log("Email e/ou senha invalido(s).");
//         }
//         catch (err) {
//             console.error(err);
//         }
//     });     

// program
//     .command('update-password')
//     .description('Atualiza a senha')
//     .requiredOption('-e, --email <email>', 'User email')
//     .requiredOption('-p, --password <password>', 'User password')
//     .action(async (options) => {
//         try {
//             let u = await getUserByEmail(options.email);
//             if (!u) {
//                 console.log("Usuario nao encontrado");
//                 return;
//             }

//             if (u.id) { 
//                 u.password = options.password;
//                 let updated = await updateUser(u.id, u);
//                 if (updated)
//                     console.log("Senha atualizada para: ", updated.email);
//             }
//         }
//         catch (err) {
//             console.error(err);
//         }
//     });        


program.parse();