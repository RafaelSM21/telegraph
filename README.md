<span id="topo">

<div>

<h1 align="center">📡 Projeto Telégrafo com ESP32, Node.js e PostgreSQL</h1>

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

O Projeto Telégrafo utiliza o microcontrolador ESP32 e três botões físicos para emular o envio de mensagens em código Morse, transmitindo sinais por meio de comunicação serial via USB. Um servidor Node.js recebe essas sequências, converte-as automaticamente em texto legível e persiste tanto o código Morse quanto sua tradução em um banco de dados PostgreSQL. Por fim, uma interface web em tempo real exibe o histórico de mensagens, fornecendo uma experiência interativa e educacional sobre os princípios da telegrafia clássica atualizados para tecnologias modernas.

- **Hardware**: ESP32 com 3 botões físicos  
- **Backend**: Node.js para comunicação serial  
- **Banco de Dados**: PostgreSQL para armazenamento  
- **Interface Web**: Visualização em tempo real das mensagens  

---

<span id="tecnologias">

## 🛠️ Tecnologias Utilizadas  

<img src="https://img.shields.io/badge/ESP32-CED4DA?style=for-the-badge&logo=espressif&logoColor=FF0000" alt="ESP32" />  
<img src="https://img.shields.io/badge/Node.js-CED4DA?style=for-the-badge&logo=nodedotjs&logoColor=339933" alt="Node.js" />  
<img src="https://img.shields.io/badge/PostgreSQL-CED4DA?style=for-the-badge&logo=postgresql&logoColor=336791" alt="PostgreSQL" />  
<img src="https://img.shields.io/badge/HTML5-CED4DA?style=for-the-badge&logo=html5&logoColor=E34F26" alt="HTML5" />  
<img src="https://img.shields.io/badge/CSS3-CED4DA?style=for-the-badge&logo=css3&logoColor=1572B6" alt="CSS3" />  

---

<span id="fluxo">

## 📋 Fluxo do Sistema  
1. **Entrada Física:** Usuário pressiona botões no ESP32 para gerar sinais Morse.  
2. **Comunicação Serial:** Sinais enviados via USB para o servidor Node.js.  
3. **Processamento:** Node.js converte os sinais em texto.  
4. **Armazenamento:** Mensagens salvas no PostgreSQL.  
5. **Visualização:** Interface web exibe as mensagens em tempo real.  

---

<span id="execucao">

## 🚀 Como Executar  

### Pré-requisitos  
- ESP32 com firmware instalado  
- Node.js v18+  
- PostgreSQL 14+  

### Arduíno montado

<img src="https://github.com/RafaelSM21/telegraph/blob/main/assets/telegraph.jpg" alt="Telégrafo" />

### Instalação  
```bash
# Clone o repositório
git clone https://github.com/RafaelSM21/telegraph.git
cd telegraph

# Instale dependências
npm install

# Configure o banco de dados
CREATE DATABASE morse;
\c morse
CREATE TABLE mensagens (
  id SERIAL PRIMARY KEY,
  morse TEXT NOT NULL,
  texto TEXT NOT NULL,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Inicie o servidor
npm run dev

Acesse: http://localhost:3000
```

<span id="equipe"></span>

## 👥 Equipe

| Nome                | Função            | GitHub                                                                 |
|---------------------|-------------------|------------------------------------------------------------------------|
| Guilherme Teixeira  | Hardware / ESP32  | [GuilhermeTeixeira](https://github.com/GuilhermeCardoso0)              |
| Rafael Soares       | Backend / Node.js | [RafaelSoares](https://github.com/RafaelSM21)                        |

---

[Voltar ao topo](#topo)
