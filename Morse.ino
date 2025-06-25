#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid     = "Teste";
const char* password = "12345678";

const char* mqtt_server = "192.168.244.42"; 
const int   mqtt_port   = 1883;
const char* mqtt_topic  = "morse/code";

#define PIN_PONTO  12   
#define PIN_TRACO  14   
#define PIN_FIM    27   

WiFiClient   espClient;
PubSubClient client(espClient);

void setup_wifi() {
  Serial.print("Conectando em Wi-Fi ");
  Serial.print(ssid);
  Serial.print(" …");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Wi-Fi conectado! IP: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conectar no MQTT… ");
    if (client.connect("ESP32Client")) {
      Serial.println("conectado!");
    } else {
      Serial.print("falhou, rc=");
      Serial.print(client.state());
      Serial.println(" — tentando novamente em 5s");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  delay(100);
  Serial.println(">>> Iniciando ESP32");

  pinMode(PIN_PONTO, INPUT_PULLUP);
  pinMode(PIN_TRACO, INPUT_PULLUP);
  pinMode(PIN_FIM, INPUT_PULLUP);

  setup_wifi();

  client.setServer(mqtt_server, mqtt_port);

  Serial.println("Setup concluído!");
}

void loop() {
  delay(500);

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  if (digitalRead(PIN_PONTO) == LOW) {
    Serial.println("Botão PONTO pressionado → publicando '.'");
    client.publish(mqtt_topic, ".");
    delay(300);  
  }

  if (digitalRead(PIN_TRACO) == LOW) {
    Serial.println("Botão TRAÇO pressionado → publicando '-'");
    client.publish(mqtt_topic, "-");
    delay(300);
  }

  if (digitalRead(PIN_FIM) == LOW) {
    Serial.println("Botão FIM DE PALAVRA pressionado → publicando '|'");
    client.publish(mqtt_topic, "|");
    delay(300);
  }
}
