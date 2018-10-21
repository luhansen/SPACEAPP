// #include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main () {
   char command[5000];

  strcpy(command,
  "spd-say -l pt -r 0 -t male3 -p -80 -m some -w 'você está passando pela cordilheira dos Andes. A cordilheira tem 6962 metros de altitude. É o ponto mais alto do continente americano'");
  system(command);
  sleep(1);
  strcpy(command,
  "spd-say -l pt -r 0 -t male3 -p -80 -m some -w 'Este é Brasil. O ponto culminante é o Pico da Neblina, localizado no norte do Amazonas. A altitude é de 2993,8 metros acima do nível do mar'");
  system(command);
  sleep(1);
  strcpy(command,
  "spd-say -l pt -r 0 -t male3 -p -80 -m some -w 'A floresta Amazônia tem 5.500.000 kilometros quadrados. Nesta área estão presentes 3 tipos de relevo: Depressão, Planalto e Planice.'");
  system(command);

   return(0);
} 