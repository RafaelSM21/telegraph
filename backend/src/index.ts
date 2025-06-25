import dotenv from 'dotenv';
dotenv.config();

import mqtt from 'mqtt';
import express from 'express';
import cors from 'cors';

import { prisma, ensureDatabase } from './db';
import { decodeMorse } from './morseDecoder';

async function main() {
  // 1) Garante que a tabela exista
  await ensureDatabase();

  // 2) Conecta MQTT
  const client = mqtt.connect(process.env.MQTT_BROKER!);
  let currentMessage = '';

  client.on('connect', () => {
    console.log('✅ Conectado ao broker MQTT');
    client.subscribe('morse/code');
  });

  client.on('message', async (_topic: any, payload: { toString: () => any; }) => {
    const symbol = payload.toString();
    if (symbol === '|') {
      const morse = currentMessage.trim();
      const decoded = decodeMorse(morse);
      console.log(`📥  ${morse}  ➜  ${decoded}`);
      try {
        await prisma.morseMessage.create({ data: { raw: morse, decoded } });
      } catch (e) {
        console.error('Erro ao salvar no banco:', e);
      }
      currentMessage = '';
    } else if (symbol === '.' || symbol === '-') {
      currentMessage += symbol + ' ';
    }
  });

  // 3) Sobe servidor HTTP
  const app = express();
  app.use(cors(), express.static('../frontend'));

  app.get('/morse', async (_req: any, res: { json: (arg0: any) => void; }) => {
    const data = await prisma.morseMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    res.json(data);
  });

  const port = parseInt(process.env.PORT!, 10) || 3000;
  app.listen(port, () => {
    console.log(`🌐 HTTP em http://localhost:${port}`);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
