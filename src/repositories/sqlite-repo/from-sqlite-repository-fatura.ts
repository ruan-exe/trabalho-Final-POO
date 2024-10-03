​import { Database } from 'sqlite3';

//Create db
const db = new Database('db.sqlite');

db.run(`
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
    )`);

// db.run(`
//     INSERT OR REPLACE INTO articles VALUES
//     (1, 'First article', 'Neque porro quisquam est qui'),
//     (2, 'Second article', 'ipsum quia dolor sit amet'),
//     (3, 'Last article', 'dolorem consectetur, adipisci velit')
// `);