import express from "express";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { pool } from "./db";
import { morseToText } from "./morse";
import path from "path";

const app = express();

const PORT = 3000;
const SERIAL_PORT = "COM7"; // /dev/ttyUSB0 no Linux
const BAUD_RATE = 9600;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const serial = new SerialPort({
  path: SERIAL_PORT,
  baudRate: BAUD_RATE,
});

const parser = serial.pipe(new ReadlineParser({ delimiter: "\n" }));

parser.on("data", async (linha: string) => {
  const morse = linha.trim();
  if (!morse) return;

  const texto = morseToText(morse);
  console.log(`Serial: ${morse} → ${texto}`);

  if (texto) {
    try {
      await pool.query(
        "INSERT INTO mensagens (morse, texto) VALUES ($1, $2)",
        [morse, texto]
      );
    } catch (err) {
      console.error("Erro ao inserir do serial:", err);
    }
  }
});

app.post("/mensagens", async (req, res) => {
  const { morse, texto } = req.body;

  if (!morse || !texto) {
    return res.status(400).send("Campos 'morse' e 'texto' são obrigatórios");
  }

  try {
    await pool.query(
      "INSERT INTO mensagens (morse, texto) VALUES ($1, $2)",
      [morse, texto]
    );
    res.status(200).send("Mensagem inserida com sucesso");
  } catch (error) {
    console.error("Erro ao inserir via POST:", error);
    res.status(500).send("Erro ao inserir mensagem");
  }
});

app.get("/mensagens", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM mensagens ORDER BY id DESC LIMIT 10"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Erro ao buscar mensagens");
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:" + PORT);
});
