#define BOTAO_PONTO 18
#define BOTAO_TRACO 19
#define BOTAO_FIM   21

String palavraMorse = "";
bool pontoPressionado = false;
bool tracoPressionado = false;
bool fimPressionado = false;

void setup() {
  Serial.begin(9600);
  pinMode(BOTAO_PONTO, INPUT_PULLUP);
  pinMode(BOTAO_TRACO, INPUT_PULLUP);
  pinMode(BOTAO_FIM, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(BOTAO_PONTO) == LOW && !pontoPressionado) {
    palavraMorse += ".";
    pontoPressionado = true;
    delay(100);
  }
  if (digitalRead(BOTAO_PONTO) == HIGH) {
    pontoPressionado = false;
  }

  if (digitalRead(BOTAO_TRACO) == LOW && !tracoPressionado) {
    palavraMorse += "-";
    tracoPressionado = true;
    delay(100);
  }
  if (digitalRead(BOTAO_TRACO) == HIGH) {
    tracoPressionado = false;
  }

  // Novo comportamento: espaço entre letras
  if (digitalRead(BOTAO_FIM) == LOW && !fimPressionado) {
    palavraMorse += " ";  // separa letras
    fimPressionado = true;
    delay(100);
  }
  if (digitalRead(BOTAO_FIM) == HIGH) {
    fimPressionado = false;
  }

  // Se botão FIM for segurado por 1s, considera fim da palavra
  if (digitalRead(BOTAO_FIM) == LOW) {
    delay(1000);
    if (digitalRead(BOTAO_FIM) == LOW) {
      Serial.println(palavraMorse);  // envia a palavra
      palavraMorse = "";
    }
  }
}
