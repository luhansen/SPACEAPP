int tempo=4000;
int numero;

void setup() {                        // inicializa os pinos digitais como saída
  pinMode(5, OUTPUT);     
  pinMode(6, OUTPUT);     
  pinMode(7, OUTPUT);     
  pinMode(8, OUTPUT);     
  pinMode(9, OUTPUT);     
  pinMode(10, OUTPUT);
  randomSeed(analogRead(0)); // inicializa a lista de valores aleatórios
  }

void loop() {
  int numero = random(5,11);    // sorteia um número de 5 a 10
/*  digitalWrite(numero, HIGH);   // acende o LED no endereço do pino sorteado*/
/*  delay(tempo);               // espera
  digitalWrite(numero, LOW);    // apaga o mesmo LED*/

  if(digitalRead(numero)==HIGH)
  {
    digitalWrite(numero, LOW);
  }
  else
  {
    digitalWrite(numero, HIGH);
  }

  delay(tempo);
}
