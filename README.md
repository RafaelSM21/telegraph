<span id="topo">

<div>

<h1 align="center">📡 Projeto Telégrafo com ESP32, MQTT, Node.js e PostgreSQL</h1>

<p align="center">
  <a href="#sobre">Visão Geral</a> •  
  <a href="#tecnologias">Tecnologias</a> •  
  <a href="#fluxo">Fluxo</a> •  
  <a href="#execucao">Como Executar</a> •  
  <a href="#equipe">Equipe</a>
</p>

</div>

---

<span id="sobre">

## 📌 Visão Geral  

O Projeto Telégrafo utiliza o microcontrolador ESP32 e três botões físicos para emular o envio de mensagens em código Morse, transmitindo sinais por meio do protocolo **MQTT**. Um servidor **Node.js** recebe essas sequências, converte-as automaticamente em texto legível com base na codificação Morse, e persiste tanto o código bruto quanto a tradução em um banco de dados **PostgreSQL**. Por fim, uma interface web leve em HTML exibe o histórico das últimas mensagens recebidas.

- **Hardware**: ESP32 com 3 botões físicos  
- **Transmissão**: Sinais enviados via MQTT  
- **Backend**: Node.js + Prisma para decodificação e armazenamento  
- **Banco de Dados**: PostgreSQL  
- **Interface Web**: HTML/CSS puro para exibição em tempo real  

---

<span id="tecnologias">

## 🛠️ Tecnologias Utilizadas  

<img src="https://img.shields.io/badge/ESP32-CED4DA?style=for-the-badge&logo=espressif&logoColor=FF0000" alt="ESP32" />  
<img src="https://img.shields.io/badge/MQTT-CED4DA?style=for-the-badge&logo=eclipsemosquitto&logoColor=660066" alt="MQTT" />  
<img src="https://img.shields.io/badge/Node.js-CED4DA?style=for-the-badge&logo=nodedotjs&logoColor=339933" alt="Node.js" />  
<img src="https://img.shields.io/badge/PostgreSQL-CED4DA?style=for-the-badge&logo=postgresql&logoColor=336791" alt="PostgreSQL" />  
<img src="https://img.shields.io/badge/Prisma-CED4DA?style=for-the-badge&logo=prisma&logoColor=2D3748" alt="Prisma" />  
<img src="https://img.shields.io/badge/HTML5-CED4DA?style=for-the-badge&logo=html5&logoColor=E34F26" alt="HTML5" />  
<img src="https://img.shields.io/badge/CSS3-CED4DA?style=for-the-badge&logo=css3&logoColor=1572B6" alt="CSS3" />  

---

<span id="fluxo">

## 📋 Fluxo do Sistema  

1. **Entrada Física:** O usuário pressiona botões conectados ao ESP32:
   - `.` (ponto), `-` (traço), `|` (fim da palavra).
2. **Transmissão via MQTT:** Os sinais são enviados para um broker local (Mosquitto).
3. **Processamento no Backend:** O servidor Node.js recebe os sinais, acumula os caracteres até receber `|`, e então decodifica para texto.
4. **Armazenamento:** O backend salva tanto o código Morse quanto o texto traduzido no PostgreSQL.
5. **Visualização Web:** Um frontend simples exibe as últimas mensagens armazenadas.

---

<span id="execucao">

## 🚀 Como Executar  

### Pré-requisitos  

- ESP32 com código carregado via Arduino IDE  
- Node.js v18+  
- PostgreSQL 14+  
- Mosquitto MQTT Broker (`sudo apt install mosquitto`)  

### Circuito ESP32

- 3 botões conectados aos pinos GPIO 12, 14 e 27  
- Cada botão deve ligar o pino ao GND  
- Lógica com `INPUT_PULLUP` ativado no ESP32  

<img src="https://github.com/RafaelSM21/telegraph/blob/main/assets/telegraph.jpg" alt="Telégrafo" />

### Instalação  

```bash
# Clone o projeto
git clone https://github.com/RafaelSM21/telegraph.git
cd telegraph/backend

# Instale dependências
npm install

# Configure o banco de dados PostgreSQL
npx prisma migrate dev --name init

# Inicie o Mosquitto (broker MQTT)
sudo systemctl start mosquitto

# Inicie o backend
npm run dev
```

Acesse a interface em: [http://localhost:3000](http://localhost:3000)  
Ela exibe as últimas mensagens traduzidas do código Morse.

---

<span id="equipe"></span>

## 👥 Equipe

| Nome                | Função            | GitHub                                                                 |
|---------------------|-------------------|------------------------------------------------------------------------|
| Guilherme Teixeira  | Hardware / ESP32  | [GuilhermeCardoso0](https://github.com/GuilhermeCardoso0)              |
| Rafael Soares       | Backend / Node.js | [RafaelSM21](https://github.com/RafaelSM21)                        |
| Lucas Assis         | Backend / Node.js | [Lucassis3](https://github.com/Lucassis3)                        |

---

[Voltar ao topo](#topo)