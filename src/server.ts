import express from 'express';
import path from 'path';
import cors from 'cors';
import router from './morseRoutes';

const app = express();
const PORT = 5000;

// Configurações essenciais
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')));

// Rotas
app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});