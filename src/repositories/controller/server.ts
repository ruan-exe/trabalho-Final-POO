import express, { Request, Response } from 'express';
import router from './routes';

const app = express();
const port = 8080;

//isso precisa pra krl pelo amor de Deus nao apague essa linha
app.use(express.json());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo à API REST com TypeScript!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
