# Juegos-para-Web-y-Redes-Sociales---JS

## **Integrantes del grupo**

| Nombres y apellidos | Correo de la universidad | Nombre de usuario GitHub |
| :---------: | :---------: | :---------: |
| Mario Belén Rivera | m.belen.2017@alumnos.urjc.es | Kratser|
| Enrique Sánchez de Francisco | e.sanchezd.2017@alumnos.urjc.es | enriuop|
| Mireya Funke Prieto | m.funke.2017@alumnos.urjc.es | mfpheras|
| Sergio Cruz Serrano | s.cruzs.2017@alumnos.urjc.es | Sergypulga|
| Samuel Ríos Carlos | s.rios.2017@alumnos.urjc.es | Thund3rDev|

* * *

# **GDD**

## **1. Introducción**

Documento de diseño del videojuego *Astral Knock Out*, es un videojuego 2D desarrollado en *JavaScript* 
con ayuda de *Phaser 3* para navegadores web. A continuación, explicaremos todas las características 
y elementos del juego. 

### **1.1. Título del juego**

*Astral Knock Out.* 

### **1.2. Concepto del juego**

*Astral Knock Out* es un juego multijugador online, de lucha y plataformas que está ambientado en un 
entorno que mezcla el espacio exterior y la fantasía. Una partida consiste en peleas 1vs1 entre guerreros 
de diferentes planetas formados en las distintas artes del combate (a distancia) que luchan con el objetivo
de derrotar a su oponente y convertirse en el mejor de todos los luchadores. 

### **1.3. Características principales**

  * **Diverso:** en *Astral Knock Out* se podrá elegir entre 4 personajes diferentes, cada uno representando 
  una clase típica de los *RPGs* clásicos y con una habilidad característica. 
  * **Competitivo:** mediante un sistema de recompensas por puntuaciones y la existencia de un ranking 
  que se actualiza constantemente conforme los jugadores obtienen victorias, hemos querido incentivar 
  la competitividad entre jugadores. 
  * **Multijugador online:** los jugadores podrán enfrentarse en emocionantes combates contra otros usuarios
  desde distintos dispositivos. 
  * **Rejugable:** cada partida depende del oponente al que te enfrentes, al ser un juego multijugador online, 
  el transcurso de la partida variará según las decisiones que tome tu adversario. Además, contamos con dos mapas
  diferentes que aportan diversidad a la jugabilidad. 

### **1.4. Género**

  * **Lucha:** *Astral Knock Out* se basa principalmente en combates a distancia contra otros jugadores. 
  * **Plataformas:** durante los combates deberás usar las plataformas del escenario para situarte 
  de forma estratégica y obtener una posición ventajosa con respecto a la de tus enemigos. 

### **1.5. Antecedentes**

En cuanto a lo que movimiento y mecánicas se refiere hemos tomado como referentes a juegos de combate 
como *Super Smash Bros Ultimate, Brief Battles* y *Rivals of Aether.*

![Captura1](https://user-images.githubusercontent.com/55460691/99713116-365d0100-2aa4-11eb-8bff-cdb43d4c6336.PNG)

Para la inspiración de los distintos personajes de nuestro juego y sus habilidades, nos hemos basado
en las clases de los clásicos juegos de rol de mesa (bardo, mago, bárbaro y pícaro).


### **1.6. Propósito y público objetivo**

El objetivo del juego es conseguir una experiencia competitiva, de tal forma que se incentive el querer combatir
y vencer a otros usuarios probando los distintos personajes que ofrece el juego.  

Queremos que el juego sea accesible para un amplio rango de usuarios, al ser un juego que se puede jugar en el
navegador desde un ordenador o un dispositivo móvil de forma gratuita, estamos dando la opción a los jugadores
de poder jugar sin necesidad de tener una consola o un ordenador potente y no tener que ahorrar para comprar el juego.  

No está dedicado a un tipo de persona ni a una edad concreta, pero probablemente sea más llamativo para gente que
disfrute de los videojuegos, en concreto, los de lucha.  En cuanto a las habilidades que debe tener el jugador de base,
bastará con tener nociones mínimas de cómo funciona un juego arcade. 

Además, los usuarios pueden elegir cuanto tiempo quieren invertir en el juego. Al ser partidas cortas, se puede jugar
en cualquier momento del día, ya sea en un descanso de trabajo o dedicarle un día entero; aunque para quedar entre los primeros
del ranking se deberá invertir algo más de tiempo, lo cual enfoca el juego a un público un poco más competitivo. 

En cuanto a la clasificación por edades según la normativa europea, nuestro juego estaría catalogado como *PEGI 7*,
es decir, para personas mayores de 7 años.  


### **1.7. Estilo visual**

En líneas generales, *Astral Knock Out* cuenta con un estilo visual estilizado, con toques realistas para los fondos y escenarios
y toques *cartoon* para los personajes. 

Dado que el juego está ambientado en el espacio, destacamos dos aspectos contrapuestos respecto a los colores:
fondos de tonos oscuros y fríos (representando el aspecto real del espacio combinado con varios elementos como nebulosas
de formas variadas) y personajes de colores saturados y/o cálidos (destacando la diferenciación entre las distintas especies de cada planeta).  

La acción jugable ocurre en arenas en medio del espacio, ya sea orbitando un planeta o en medio de un anillo 
de asteroides, por tanto, las plataformas se representarán con rocas y/o restos de estructuras rocosas.  

Finalmente, respecto a los personajes, al ser cada uno de un planeta distinto contarán también con formas
muy diferenciadas y elementos que no solo indiquen su tipo de clase sino también dicho planeta de origen. 


### **1.8. Alcance del proyecto**

Nuestro objetivo principal es tener un juego sólido en el que podamos navegar sin problemas por las pantallas
planteadas y el usuario pueda conectarse con otro jugador para combatir contra él haciendo uso de las habilidades
propuestas y, finalmente obtener una puntuación con la que clasificarnos. Teniendo esta base, más adelante nos gustaría
ampliar el contenido, tanto de personajes y sus respectivos aspectos, como de habilidades nuevas. Además, nos gustaría
incluir un modo horda para los jugadores que no quieran competir online si no que quieran jugar de forma local e individual.
Por último, nos gustaría que se hiciesen emparejamientos online con otros jugadores en función de si quieren jugar de
forma más casual o más competitiva. 


### **1.9. Historia introductoria**

Cada 42 rotaciones de la estrella Nova del sistema solar *Brawlstellaris*, los cuatro planetas de dicho sistema 
(*Gowolik, Polestia, Gnosenim* y *Habog’ad*) se alinean, y es tradición para las especies de dichos planetas celebrar el conocido torneo: *Astral Knock Out*.
Cada uno presenta un campeón entrenado especialmente para este torneo, ganador del cual obtendrá el honor de ser inmortalizado
en forma de busto en el salón de los combatientes y una medalla astral para su planeta. Tú decidirás quién es el campeón de esta alineación. 

## **2. Jugabilidad y mecánicas**

En este apartado se encuentra una explicación sobre la jugabilidad, junto con el movimiento, físicas y colisiones durante 
la partida, y una lista con las características y el funcionamiento de los personajes y sus habilidades. 

### **2.1. Jugabilidad**

#### **2.1.1. Modos de juego**

Hemos decidido que el juego cuente con dos modos diferentes. Uno de ellos será el modo torneo, en el cual nos enfrentaremos
a otro usuario en un combate en línea 1vs1. Y, por otro lado, encontramos un modo de entrenamiento (*space gym*), 
al que podremos acceder para probar a los distintos personajes y habilidades.

#### **2.1.2. Niveles**

*Astral Knock Out* contará con dos niveles diferentes en el modo torneo, uno más básico y estático, y otro en el que, 
aparte de luchar contra el enemigo, deberás sobrevivir al movimiento descendente del escenario, si te caes perderás 
el combate instantáneamente. 

#### **2.1.3. Habilidades**

Los personajes cuentan con una habilidad de disparo única, representativa de su clase, y que podrá usar constantemente.

### **2.2. Movimiento y físicas**

*Astral Knock Out* cuenta con un sistema de controles sencillo, ya que se debe poder acceder tanto desde un ordenador
como desde un dispositivo móvil. Por esto hemos optado por reducir el manejo del personaje de la siguiente forma: 

**Dispositivo de escritorio:**

* **W/↑/Barra espaciadora:** Tecla asignada para saltar. Si se pulsa dos veces, hay un doble salto. 
* **A-D/←→:** Teclas que determinan la dirección. 
* **S/↓:** Tecla que permite realizar una caída rápida en caso de querer esquivar. 
* **O:** Tecla usada para la habilidad principal. 

**Dispositivo móvil:**

* ***JoyStick:*** Control para mover al personaje de lado a lado y para caer rápidamente. 
* **Botón de salto.** 
* **Botón de habilidad principal.** 

![Captura2](https://user-images.githubusercontent.com/55460691/99713118-365d0100-2aa4-11eb-8541-0d5a084cf72a.PNG)

### **2.3. Flujo de juego**

En este apartado se explicará el transcurso de una partida de *Astral Knock Out*, comentando los pasos a seguir del jugador desde el inicio del juego, hasta la pantalla de fin de partida. 

El jugador iniciará el juego en una pantalla que muestra el logo de *Lightning Opal*, pasando de ahí a la pantalla de inicio de sesión o log in, y a continuación aparecerá una pequeña historia que introduce al jugador al contexto del juego, acto seguido pasará al menú principal. Una vez se desee iniciar partida, el jugador seleccionará el modo *Tournament*, el cual le dirigirá a una pantalla de selección de personaje.

En la pantalla de selección, el jugador navegará por el menú y podrá consultar la descripción de cada personaje, junto con su habilidad principal. 

Una vez elegido el personaje el jugador pasará a elegir el nivel de dificultad: normal o difícil. Tras esto, comenzará el emparejamiento con los demás jugadores que estén buscando el mismo reto de dificultad que el jugador. 

La partida se desarrollará en un enfrentamiento a muerte entre dos jugadores. Ambos contrincantes usarán sus habilidades a distancia para reducir la vida de su enemigo. Cuando uno de los dos jugadores acaba con su oponente se mostrará la pantalla de victoria/derrota, con la posibilidad de volver a buscar partida o volver al menú principal. 
  
### **2.4. Personajes y habilidades**

**Tabla de personajes**

| Nombre | Clase | Habilidad de clase | Puntos de Vida | Daño (por proyectil) | Aceleración | Velocidad de movimiento | Salto | Fricción |
| :---------: | :---------: | :---------: | :---------: |:---------: |:---------: |:---------: |:---------: |:---------: |
| Niuwak | Bárbaro | Tajo Pesado | 1800 | 250 | 2 | 15 | 23 | 4 |
| Elago'r | Mago | Triple hoja cortante | 1000 | 150 | 2 | 22 | 25 | 6 |
| Sitav II | Bardo | Crescendo | 1200 | 90 | 2 | 16 | 24 | 3 |
| Gretkaris | Pícaro | Cuchillada Mortal | 800 | 120 | 3 | 26 | 26 | 5 |

**Tabla de habilidades**

| Nombre | Nº proyectiles | Daño | Colisión con plataformas | Delay de ataque | Velocidad de proyectil | Duración del proyectil | *Cool Down* | 
| :---------: | :---------: | :---------: | :---------: |:---------: |:---------: |:---------: |:---------: |
| Tajo Pesado | 1 | 250 | No | 50 ms | 36 | 1000 ms | 1000 ms | 
| Triple hoja cortante | 3 | 150 | Sí | 50 ms | 28 | 500 ms | 1000 ms | 
| Crescendo | 1 | 90 | No | 500 ms | 18 | 2500 ms | 1700 ms | 
| Cuchillada Mortal | 3 | 120 | Sí | 25 ms | 30 | infinito | 800 ms |

**Descripción de las habilidades**

*	**Tajo Pesado:**  tajo en el aire lento y de gran área con un alcance medio.
*	**Triple hoja cortante:** Tres proyectiles en cono que después de llegar a una anchura máxima se vuelven a juntar en un punto medio.
*	**Crescendo:** proyectil de medio alcance que persigue al enemigo.
*	**Cuchillada mortal:** triple ataque de largo alcance con caida de bala.

## **3. Interfaz**

A continuación, mostramos las especificaciones sobre cómo se organizarán los menús y la interfaz de las diferentes pantallas de juego que conforman *Astral Knock Out*.

### **3.1. Diagrama de flujo**

![Captura3](https://user-images.githubusercontent.com/55460691/99713120-36f59780-2aa4-11eb-9e66-b714056d5eeb.PNG)

### **3.2. Introducción logo**

![Captura4](https://user-images.githubusercontent.com/55460691/99713121-36f59780-2aa4-11eb-895a-e4a78d5ce1ab.PNG)

### **3.3. Inicio de sesión o creación de usuario**

![Captura5](https://user-images.githubusercontent.com/55460691/99713122-36f59780-2aa4-11eb-940b-a9fce0243679.PNG)

![Captura6](https://user-images.githubusercontent.com/55460691/99713123-378e2e00-2aa4-11eb-9994-a2a0fa412a67.PNG)

![Captura7](https://user-images.githubusercontent.com/55460691/99713022-26ddb800-2aa4-11eb-8418-0ede62f52040.PNG)

![Captura8](https://user-images.githubusercontent.com/55460691/99713024-27764e80-2aa4-11eb-96fc-3f661cc77edb.PNG)

### **3.4. Menú principal**

![Captura9](https://user-images.githubusercontent.com/55460691/99713025-27764e80-2aa4-11eb-926d-cf784c8edf05.PNG)

![Captura10](https://user-images.githubusercontent.com/55460691/99713027-27764e80-2aa4-11eb-8a79-6b743279ed43.PNG)

### **3.5. Ranking**

![Captura11](https://user-images.githubusercontent.com/55460691/99713029-280ee500-2aa4-11eb-88d9-7a363403bb5b.PNG)

![Captura12](https://user-images.githubusercontent.com/55460691/99713031-28a77b80-2aa4-11eb-9ffe-7f9b67474035.PNG)

### **3.6. Opciones**

![Captura13](https://user-images.githubusercontent.com/55460691/99713033-28a77b80-2aa4-11eb-9257-b6514e2e9cf4.PNG)

![Captura14](https://user-images.githubusercontent.com/55460691/99713034-29401200-2aa4-11eb-80e3-f277ada040e9.PNG)

![readme_controls](https://user-images.githubusercontent.com/36482605/99721186-1979fb00-2aaf-11eb-9145-f4a833f2416f.PNG)

### **3.7. Créditos**

![Captura16](https://user-images.githubusercontent.com/55460691/99713037-29d8a880-2aa4-11eb-98b3-1efee2c4c536.PNG)

![Captura17](https://user-images.githubusercontent.com/55460691/99713039-29d8a880-2aa4-11eb-9ad3-9ea1af3aa246.PNG)

### **3.8. Selección de personajes**

![Captura18](https://user-images.githubusercontent.com/55460691/99713040-2a713f00-2aa4-11eb-8a3e-3cb735826bae.PNG)

![Captura19](https://user-images.githubusercontent.com/55460691/99713041-2a713f00-2aa4-11eb-87a1-f65aa173034e.PNG)

### **3.9. Elección de mapa**

![Captura20](https://user-images.githubusercontent.com/55460691/99713042-2b09d580-2aa4-11eb-9914-db2c1f643583.PNG)

![Captura21](https://user-images.githubusercontent.com/55460691/99713043-2ba26c00-2aa4-11eb-9ffd-aa29e4d0b1fe.PNG)

![Captura22](https://user-images.githubusercontent.com/55460691/99713044-2ba26c00-2aa4-11eb-8705-991e814af672.PNG)

### **3.10. Carga de conexión**

![Captura23](https://user-images.githubusercontent.com/55460691/99713048-2c3b0280-2aa4-11eb-9074-a4d3cf526c28.PNG)

![Captura24](https://user-images.githubusercontent.com/55460691/99713050-2c3b0280-2aa4-11eb-9f2b-ea5a3fd18f1d.PNG)

### **3.11. Partida cargada**

![Captura25](https://user-images.githubusercontent.com/55460691/99713053-2c3b0280-2aa4-11eb-9fa1-30a2fa7c5a32.PNG)

![Captura26](https://user-images.githubusercontent.com/55460691/99713054-2cd39900-2aa4-11eb-9e00-eebeaf7732e3.PNG)

### **3.12. Nivel 1**

![Captura27](https://user-images.githubusercontent.com/55460691/99713057-2d6c2f80-2aa4-11eb-9d43-f019bbc4e256.PNG)

### **3.13. Nivel 2**

![Captura28](https://user-images.githubusercontent.com/55460691/99713060-2d6c2f80-2aa4-11eb-842b-0674bcc04858.PNG)

### **3.14. Mensajes de comunicación sobre el servidor**

![Captura29](https://user-images.githubusercontent.com/55460691/99713064-2e04c600-2aa4-11eb-9a6d-b47554dc7e3c.PNG)

### **3.15. Pantalla de final de partida**

![Captura30](https://user-images.githubusercontent.com/55460691/99713065-2e04c600-2aa4-11eb-8079-65acfd41c655.PNG)

![Captura31](https://user-images.githubusercontent.com/55460691/99713070-2e9d5c80-2aa4-11eb-8177-a1ac37686fe5.PNG)

### **3.16. Pausa**

![Captura32](https://user-images.githubusercontent.com/55460691/99713072-2f35f300-2aa4-11eb-94b9-f82da36d878f.PNG)

![Captura33](https://user-images.githubusercontent.com/55460691/99713073-2f35f300-2aa4-11eb-94ad-e107b6f9db69.PNG)

### **3.17. Modo entrenamiento**

![Captura34](https://user-images.githubusercontent.com/55460691/99713075-2fce8980-2aa4-11eb-86c8-c2d811bebe1e.PNG)

### **3.18. Partida**

![Captura35](https://user-images.githubusercontent.com/55460691/99713077-30672000-2aa4-11eb-8e0a-89b6a2d73826.PNG)

### **3.19. Contextualización**

Pantalla con una corta contextualización de la temática del videojuego para que el jugador se ubique más fácilmente.

![Captura36](https://user-images.githubusercontent.com/55460691/99713080-30ffb680-2aa4-11eb-9216-4a5f63010b68.PNG)

## **4. Arte**

### **4.1. Personajes**

Con *Astral Knock Out* queremos transmitir un ambiente serio de batalla, pero a la vez que tenga un toque fantasioso y creativo, por ello, se hará uso de elementos naturales típicos del espacio exterior (estrellas, rocas o meteoritos, cristales o minerales y nebulosas) con tonos fríos y oscuros, en contraposición a patrones florales, personajes con colores cálidos y saturados y con un estilo *cartoon* con formas representativas.  

Los personajes principales a parte de una clase característica, al pertenecer a distintos planetas, también tendrán características representativas del planeta al que pertenecen (tanto en elementos como en formas y colores).

Además, hemos decidido que las armas de los personajes, aunque sean diferentes en forma, compartan el mismo color y estilo. Nos hemos basado en las siguientes ilustraciones:

![Captura37](https://user-images.githubusercontent.com/55460691/99713083-31984d00-2aa4-11eb-8787-9dc6818b0c50.PNG)

A continuación mostramos las ideas, referencias, conceptos y resultados finales de cada uno de los personajes:

**Guerrero del planeta Gowolik**

* Ambientación: desierto y uso de telas. 
* Colores: arena, naranja, blanco, dorado y negro. 
* Referencias de forma y color: 

![Captura38](https://user-images.githubusercontent.com/55460691/99713089-3230e380-2aa4-11eb-8e1d-670683bf0e8e.PNG)

**NB:** Última imagen referencia a la vestimenta. 

* Resultado final del personaje: 

![Captura39](https://user-images.githubusercontent.com/55460691/99713090-3230e380-2aa4-11eb-8a86-367a8d7808cc.PNG)

* Descripción: 

*Niuwak*: El más feroz de los guerreros del planeta Gowolik, conocido por su peligrosa climatología y sus despiadados habitantes. Es el orgulloso portador de Utikal, la espada sin alma, capaz de atravesar cualquier superficie, cortando hasta las más duras pieles.

![Captura40](https://user-images.githubusercontent.com/55460691/99713092-33621080-2aa4-11eb-8e3b-465f2a707637.PNG)

**Guerrero del planeta Polestia**

* Ambientación: magma, energía e inspiración en estilo espartano. 
* Colores: rojo, amarillo, gris y negro. 
* Referencias de forma y color: 

![Captura41](https://user-images.githubusercontent.com/55460691/99713093-33621080-2aa4-11eb-88c2-1ceb354de0a3.PNG)

* Resultado final del personaje: 

![Captura42](https://user-images.githubusercontent.com/55460691/99713096-33faa700-2aa4-11eb-8ef6-74cafd0f6ec3.PNG)

* Descripción: 

*Gretkaris*: Entrenada por Knipyad el pícaro, líder de la prestigiosa escuela de asesinos del planeta Polestia, Gretkaris la sigilosa es conocida por su impecable técnica de lanzar cuchillos. Ten cuidado, puede que te atraviese no una ni dos, sino tres veces con ellos. 

![Captura43](https://user-images.githubusercontent.com/55460691/99713101-34933d80-2aa4-11eb-8607-42ab241413dd.PNG)

**Guerrero del planeta Habog'ad**

* Ambientación: bosques y plantas.  
* Colores: verde cálido, naranja, cobre y azul turquesa. 
* Referencias de forma y color: 

![Captura44](https://user-images.githubusercontent.com/55460691/99713104-34933d80-2aa4-11eb-8661-8fcf841ce7e2.PNG)

* Resultado final del personaje: 

![Captura45](https://user-images.githubusercontent.com/55460691/99713106-352bd400-2aa4-11eb-8f58-7a498b0f5a63.PNG)

* Descripción: 

*Elago’ r*: Líder orgulloso de los Gart’ el, la tribu más longeva del planeta Habog’ ad. Domina todos los trucos mágicos que esconde el libro de Tsagad’ ar. Últimamente ha estado mejorando el hechizo arcaico de la triple hoja cortante. 

![Captura46](https://user-images.githubusercontent.com/55460691/99713110-35c46a80-2aa4-11eb-8d12-54771b2a008d.PNG)

**Guerrero del planeta Gnosenim**

* Ambientación: refinería uso de metales y minerales. 
* Colores: morado, rosa, grises, azules. 
* Referencias de forma y color: 

![Captura47](https://user-images.githubusercontent.com/55460691/99713112-35c46a80-2aa4-11eb-9bf2-f49434ff666a.PNG)

**NB:** Última imagen referencia al color, no a la forma. 

* Resultado final del personaje: 

![captura76](https://user-images.githubusercontent.com/62519332/99712836-e0885900-2aa3-11eb-9f6c-299f5c2d3911.jpg)

* Descripción: 

*Sitav II*: Es el heredero de la legendaria tuba mágica de Eobo el harmonioso, el primer rey de planeta Gnosenim. Adora trabajar como capataz en la mina junto a su amigo alado, Olokip. Se dice que sus melodías persiguen a sus enemigos, así que intenta mantener las distancias. 

![captura77](https://user-images.githubusercontent.com/62519332/99712952-0e6d9d80-2aa4-11eb-9644-71355d3af5dd.jpg)

**Ilustración final que recopila a los personajes**

![captura78](https://user-images.githubusercontent.com/62519332/99712975-17f70580-2aa4-11eb-8845-a328f4ae6114.jpg)

### **4.2. Escenarios**

El diseño de los escenarios cambiará dependiendo de la arena seleccionada (nivel), pero siempre manteniendo un ambiente cósmico. Como se ha mencionado anteriormente, contará con elementos típicos del espacio y colores oscuros, pero se añadirán patrones florales y orgánicos mediante nebulosas para dotar al entorno de juego un toque místico y fantasioso acorde con la historia y la temática. 
Por otro lado, las plataformas se superpondrán al fondo y tendrán una estética más sencilla, se compondrán de trozos de rocas espaciales y estructuras derruidas, recordando a las estructuras griegas. 

**Referencias**

![captura79](https://user-images.githubusercontent.com/62519332/99713095-33621080-2aa4-11eb-83ce-d7b717b27628.jpg)

A continuación, mostramos las ilustraciones finales del juego:

![captura80](https://user-images.githubusercontent.com/62519332/99713099-33faa700-2aa4-11eb-80d4-f7d1ab44c3e7.jpg)

![captura81](https://user-images.githubusercontent.com/62519332/99713103-34933d80-2aa4-11eb-95c2-588350c2d7b3.jpg)

### **4.3. Iconos**

![captura82](https://user-images.githubusercontent.com/62519332/99713105-34933d80-2aa4-11eb-8670-b9531bdaf2b1.jpg)

### **4.4. Interfaz**

Para llevar a cabo el diseño de la interfaz queremos usar tonos azules, rosas, morados y blancos para la tipografía. La idea es utilizar formas cuadradas y triangulares para que sea sencilla y fácil de entender. Por último, ya que los fondos tienen muchos detalles y animaciones hemos añadido transparencias a algunas zonas para que se pueda apreciar el fondo a través de la interfaz.

![captura83](https://user-images.githubusercontent.com/62519332/99713107-352bd400-2aa4-11eb-9f61-05e042d88ae7.jpg)

**El resultado final de los elementos de la interfaz se encuentra recopilado en el apartado 3 de este documento.**

### **4.5. Animaciones**

Para realizar las animaciones de los personajes utilizamos el software *After Effects* y dentro de este, un *Plug In* gratuíto llamado *Duik Bassel 2* para poder realizar un *rigging* a los *assets* de los personajes.

### **4.6. Audio**

#### **4.6.1. Música**

Para realizar la banda sonora de *Astral Knock Out* hemos utilizado una aplicación gratuíta online llamada *Band Lab* (*https://www.bandlab.com/*). Estas son las diferentes canciones que hemos desarrollado y en qué escena suenan:
*	*Lait Motiv* -> pantalla de contextualización, menú principal, menú de opciones, ranking, selección de personajes y selección de mapa.
*	Versus -> pantalla de versus.
*	Créditos y has ganado -> pantalla de créditos y cuando ganas una partida en la pantalla de puntuaciones.
*	Has perdido -> cuando pierdes una partida en la pantalla de puntuaciones.
*	Nivel 1 -> *Tournament*, mapa 1.
*	Nivel 2 -> *Tournament*, mapa 2.
*	Entrenamiento -> *Space gym*.

#### **4.6.1. Efectos**

En cuanto a los efectos de sonido, hemos cogido sonidos de (*http://beta.blendwave.net/?p=wavePanel*) y (*https://freesound.org/*) y posteriormente se han editado con el software gratuito Audacity. Estas son las diferentes canciones que hemos desarrollado:
*	Cambiar entre opciones en los menús
*	Opción bloqueada 
*	Elegir una opción 
*	Efecto de cada habilidad (x4) 
*	Efecto para cuando golpea la habilidad (x4) 
*	Victoria
*	Derrota
*	Versus
*	Efecto de viento

## **5. Monetización y modelo de negocio**

### **5.1. Modelos de negocio**

* **1. Cebo y anzuelo:** ofrecemos el juego gratis, confiando en que los usuarios comprarán skins o nuevos personajes y donarán a los desarrolladores. 
* **2. Fidelización:** captamos a los usuarios ofreciendo el juego gratis y ofrecemos actualizaciones y recompensas por jugar y avanzar en el ranking. 
* **3. Paga lo que puedas:** se puede comprar dinero del juego por un precio fijo, pero también se puede optar por donar un porcentaje extra (a elegir entre 10%, 20%, 30%, 40% o 50%) del precio que pagues por la moneda virtual para el desarrollo del juego.

Nuestra idea es que el juego cuente con actualizaciones de contenido en un futuro. Estos contenidos son, por ejemplo, nuevos personajes, aspectos para estos y mapas diferentes. Para obtener estos contenidos el usuario contará con una moneda virtual que se obtiene jugando o si quiere, puede comprarlas con dinero real (a la hora de realizar esta transacción también podrá decidir si donar un porcentaje para el desarrollo del juego).

Además, queremos incentivar la competitividad en el juego haciendo un sistema de temporadas. En el cual cada dos semanas se reiniciarán las puntuaciones y se ofrecerán monedas virtuales a los mejores jugadores y una *skin* especial para el mejor jugador. También habrá temporadas que cuenten con eventos especiales como por ejemplo *Halloween*, Navidad o el año nuevo chino que ofrecerán cosméticos característicos de dichos eventos.

A continuación, adjuntamos unas imágenes que no se incluyen en esta versión del juego pero que ilustran cómo se vería la selección de personajes (pudiendo comprar y cambiar de aspectos), la pantalla de compra de monedas virtuales y tres aspectos diferentes que saldrán próximamente.

![captura84](https://user-images.githubusercontent.com/62519332/99713108-352bd400-2aa4-11eb-8d63-82ecf6bb33c5.jpg)

![captura85](https://user-images.githubusercontent.com/62519332/99713109-352bd400-2aa4-11eb-8251-a291a8215b19.jpg)

### **5.2. Tablas de productos y precios**

| Producto | Descripción | Precio |
| :---------: | :---------: | :---------: |
| Aspectos simples (*chromas*) | Aspectos de fácil diseño, en el que cambian los colores principales del personaje | 1000 gemas del juego |
| Aspectos complejos (temática y eventos) | Aspectos que cambian por completo el diseño de personaje, ya sea dentro de la temática del juego, o de eventos como *Halloween* | 5000 gemas del juego |
| Personajes  | Personajes del juego que pueden comprarse con dinero real para desbloquearse antes | 2000 gemas del juego |

| Moneda virtual | Precio |
| :---------: | :---------: | 
| 1000 gemas | 1€ |
| 5000 gemas | 4€ |
| 10000 gemas | 7€ |

### **5.3. Modelo de lienzo o canvas**

![captura86](https://user-images.githubusercontent.com/62519332/99713111-35c46a80-2aa4-11eb-9bd6-b602a61258d3.jpg)

## **6. Planificación y costes**

### **6.1. El equipo humano**

El equipo de desarrollo está formado por 5 personas:   
*	Programador – Samuel Ríos Carlos. 
*	Programador y artista de *VFX* – Mario Belén Rivera. 
*	Artista de personajes, interfaz y músico – Enrique Sánchez de Francisco. 
*	Diseñador de niveles, animador y diseñador de *SFX* – Sergio Cruz Serrano. 
*	Artista de escenarios e interfaz – Mireya Funke Prieto. 

### **6.2. Estimación temporal del desarollo**

![captura87](https://user-images.githubusercontent.com/62519332/99713113-35c46a80-2aa4-11eb-9a91-5fca60f6fd73.jpg)

| | Porcentaje sobre el total de tiempo desarrollado |
| :---------: | :---------: | 
| Diseño de juego y documento GDD | 10%  |
| Diseño y creación de artes | 30% |
| Diseño de sonido | 5% |
| Implementación mecánicas y jugabilidad | 30%  |
| Apartado online | 20%  |
| Publicación y marketing  | 5% |

### **6.3. Costes asociados**

#### **6.3.1. Material y software**

A continuación, enumeramos los distintos softwares que vamos a utilizar y si nos hace falta invertir recursos en obtenerlos: 

*	Clip Studio Paint (1 licencia, propietarios) 
*	BandLab (licencia gratuita) 
*	AfterEffects (1 licencia (24’19€/mes), proporcionado por la URJC durante el primer año de desarrollo) 
*	Audacity (licencia gratuita) 
*	Photoshop (3 licencias (24’19€/mes), proporcionado por la URJC durante el primer año de desarrollo) 
*	Github (licencia gratuita) 
*	Trello (software gratuito) 
*	Teams (proporcionado por la URJC durante el primer año de desarrollo) 
*	Discord (software gratuito)

#### **6.3.2. Financiación**

Para financiar el proyecto inicialmente nos gustaría mostrar nuestro juego en páginas de *'Crowdfunding'* para obtener un beneficio inicial para el desarrollo. 

En un principio nos decantamos por la plataforma *IndieGoGo* debido a que permite a los desarrolladores recibir el dinero de los mecenas a pesar de no llegar a la meta propuesta. Sin embargo, decidimos optar por cambiar a la página *KickStarter*, debido a la popularidad de dicha página y creemos que el contenido de nuestro juego es ideal para el sistema de recompensas que ofrece la página, ya que contamos con un contenido visual atractivo del que sacar provecho mediante dichas recompensas. A pesar de que es una opción arriesgada, consideramos que nos puede aportar un beneficio mucho mayor que *IndieGoGo*. A continuación, explicamos las características de nuestro programa de financiación:

Precio base: 45.000€
Tiempo para financiar: 30 días.

Recompensas:

*	5€ o más: nombre en los créditos y 10.000 Gemas.
*	20€ o más: skin exclusiva (disponible únicamente en esta recompensa).
*	50€ o más: una camiseta con el logo de AKO y los personajes del juego.
*	100€ o más:  un póster de un personaje a elegir dibujado por los ilustradores del equipo.
*	250€ o más: una sudadera de Lightning Opal con el nombre personalizado para la espalda.
*	500€ o más: una figurita de cada personaje para jugar a rol de mesa y dados personalizados.
*	1.000€ o más: una réplica del arma de Niuwak (Bárbaro).
*	3.000€ o más: ayuda a los desarrolladores a diseñar el próximo personaje.

#### **6.3.3. Fuerza de trabajo**

**Equipo de desarrollo:** 5 personas. 
**Duración:** 2 años. 

Coste bruto para la empresa por empleado al mes: 1.500€ 
Coste bruto total: 180.000€ 

**Total de sueldo:**  180.000€ + 25% de beneficio industrial 45.000€ = 225.000€ 

Si sumamos el sueldo y las licencias (225.000€ + 1.161’12€) obtenemos = 226.161’12€ de coste total del proyecto.


## **7. Contenidos pospuestos a futuras actualizaciones**

Nos gustaría comentar ciertos aspectos del juego que no hemos podido añadir para esta primera versión.

**Segunda habilidad**

Aparte de la habilidad característica de cada personaje, también iba a haber cuatro posibles habilidades secundarias comunes a los cuatro personajes. Estas habilidades estan planteadas como efectos especiales o que aportan una mejora al personaje (escudo, curación más daño, teletransporte, invisibilidad…).

![captura88](https://user-images.githubusercontent.com/62519332/99713115-365d0100-2aa4-11eb-86c0-f5f6250cba9c.jpg)

**Animaciones de salto**

Para esta versión hemos implementado animación de idle, correr y atacar para cada uno de los personajes, pero el resultado del movimiento mejoraría con la incorporación de una animación correspondiente al salto. Hemos podido desarrollar las siguientes pero no se han llegado a implementar:

![captura89](https://user-images.githubusercontent.com/62519332/99713117-365d0100-2aa4-11eb-80b9-d7daff229cdd.jpg)

**Efectos visuales**

Queremos que los *VFX* de los ataques del juego no sean imágenes estáticas si no que se produzca una animación correspondiente con cada efecto. Además, nos gustaría añadir otro tipo de efectos como por ejemplo cuando saltas o corres aportando así más dinamismo y atractivo visual al juego.

![captura90](https://user-images.githubusercontent.com/62519332/99713119-365d0100-2aa4-11eb-8d45-13ac3c4c4219.jpg)

**Remapeado de controles**

Nos parece una opción ideal para la comodidad de los usuarios poder elegir con qué controles quieren combatir, por ello nos gustaría añadir en opciones un apartado para remapear los controles.

**Bilingüismo**

Para poder acceder a un rango más amplio de usuarios nos gutaría añadir una opción para cambiar el idioma del juego de español a inglés y viceversa.

**Modo horda**

Aunque *Astral Knock Out* está más enfocado a un público competitivo, queremos tener en cuenta a los usuarios que prefieran jugar sin conexión a internet de una forma más casual y quieran enfrentarse a oleadas de enemigos individualmente.

## **8. Referencias**

* Plantilla para el GDD:  
*https://eldocumentalistaudiovisual.files.wordpress.com/2015/02/gdd.pdf*

- Enlace a nuestra página web:  
*https://lightningopal.github.io/* 


