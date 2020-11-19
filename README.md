# Juegos-para-Web-y-Redes-Sociales---JS

## **Integrantes del grupo**

| Nombres y apellidos | Correo de la universidad | Nombre de usuario GitHub |
| :---------: | :---------: | :---------: |
| Mario Belén Rivera | m.belen.2017@alumnos.urjc.es | Kratser|
| Enrique Sánchez de Francisco | e.sanchezd.2017@alumnos.urjc.es | enriuop|
| Mireya Funke Prieto | m.funke.2017@alumnos.urjc.es | mfpheras|
| Sergio Cruz Serrano | s.cruzs.2017@alumnos.urjc.es | Sergypulga|
| Samuel Ríos Carlos | s.ríos.2017@alumnos.urjc.es | Thunder|

* * *

# **GDD**

## **1. Introducción**

Documento de diseño del videojuego Astral Knock Out, es un videojuego 2D desarrollado en JavaScript 
con ayuda de Phaser 3 para navegadores web. A continuación, explicaremos todas las características 
y elementos del juego. 

### **1.1. Título del juego**

Astral Knock Out. 

### **1.2. Concepto del juego**

Astral Knock Out es un juego multijugador online, de lucha y plataformas que está ambientado en un 
entorno que mezcla el espacio exterior y la fantasía. Una partida consiste en peleas 1vs1 entre guerreros 
de diferentes planetas formados en las distintas artes del combate (a distancia) que luchan con el objetivo
de derrotar a su oponente y convertirse en el mejor de todos los luchadores. 

### **1.3. Características principales**

  * **Diverso:** en Astral Knock Out se podrá elegir entre 4 personajes diferentes, cada uno representando 
  una clase típica de los RPGs clásicos y con una habilidad característica. 
  * **Competitivo:** mediante un sistema de recompensas por puntuaciones y la existencia de un ranking 
  que se actualiza constantemente conforme los jugadores obtienen victorias, hemos querido incentivar 
  la competitividad entre jugadores. 
  * **Multijugador online:** los jugadores podrán enfrentarse en emocionantes combates contra otros usuarios
  desde distintos dispositivos. 
  * **Rejugable:** cada partida depende del oponente al que te enfrentes, al ser un juego multijugador online, 
  el transcurso de la partida variará según las decisiones que tome tu adversario. Además, contamos con dos mapas
  diferentes que aportan diversidad a la jugabilidad. 

### **1.4. Género**

  * **Lucha:** Astral Knock Out se basa principalmente en combates a distancia contra otros jugadores. 
  * **Plataformas:** durante los combates deberás usar las plataformas del escenario para situarte 
  de forma estratégica y obtener una posición ventajosa con respecto a la de tus enemigos. 

### **1.5. Antecedentes**

En cuanto a lo que movimiento y mecánicas se refiere hemos tomado como referentes a juegos de combate 
como Super Smash Bros Brawl, Brief Battles y Rivals of Aether.
Para la inspiración de los distintos personajes de nuestro juego y sus habilidades, nos hemos basado
en las clases de los clásicos juegos de rol de mesa (bardo, mago, bárbaro y pícaro).
-----------------------------------------------------------------------------------------------------------------------------------

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

En cuanto a la clasificación por edades según la normativa europea, nuestro juego estaría catalogado como PEGI 7,
es decir, para personas mayores de 7 años.  


### **1.7. Estilo visual**

En líneas generales, Astral Knock Out cuenta con un estilo visual estilizado, con toques realistas para los fondos y escenarios
y toques cartoon para los personajes. 

Dado que Astral Knock Out está ambientado en el espacio, destacamos dos aspectos contrapuestos respecto a los colores:
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
Por último, nos gustaría que se hiciesen emparejamientos online con otros jugadores en función de si quieren jugar de forma
más casual o con más competitiva. 


### **1.9. Alcance del proyecto**

Cada 42 rotaciones de la estrella Nova del sistema solar Brawlstellaris, los cuatro planetas Gowolik, Polestia, Gnosenim
y Habog’ad se alinean, y es tradición para las especies de dichos planetas celebrar el conocido torneo: Astral Knock Out.
Cada uno presenta un campeón entrenado especialmente para este torneo, ganador del cual obtendrá el honor de ser inmortalizado
en forma de busto en el salón de los combatientes y una medalla astral para su planeta. Tú decidirás quién es el campeón de esta alineación. 

## **2. Jugabilidad y mecánicas**

### **2.1. Jugabilidad**

#### **2.1.1. Modos de juego**

#### **2.1.2. Niveles**

#### **2.1.3. Habilidades**

### **2.2. Movimiento y físicas**

### **2.3. Flujo de juego**
  
### **2.4. Personajes y habilidades**
 
## **3. Interfaz**

### **3.1. Diagrama de flujo**

### **3.2. Introducción logo**

### **3.3. Inicio de sesión o creación de usuario**

### **3.4. Menú principal**

### **3.5. Ranking**

### **3.6. Opciones**

### **3.7. Créditos**

### **3.8. Selección de personajes**

### **3.9. Elección de mapa**

### **3.10. Carga de conexión**

### **3.11. Partida cargada**

### **3.12. Nivel 1**

### **3.13. Nivel 2**

### **3.14. Mensajes de comunicación sobre el servidor**

### **3.15. Pantalla de final de partida**

### **3.16. Pausa**

### **3.17. Modo entrenamiento**

### **3.18. Partida**

### **3.19. Contextualización**

## **4. Arte**

### **4.1. Personajes**

**Guerrero del planeta Gowolik**

**Guerrero del planeta Polestia**

**Guerrero del planeta Habog'ad**

**Guerrero del planeta Gnosenim**

**Ilustración final que recopila a los personajes**

### **4.2. Escenarios**

**Referencias**

### **4.3. Iconos**

### **4.4. Interfaz**

### **4.5. Animaciones**

### **4.6. Audio**

#### **4.6.1. Música**

#### **4.6.1. Efectos**

## **5. Monetización y modelo de negocio**

### **5.1. Modelos de negocio**

### **5.2. Tablas de productos y precios**

### **5.3. Modelo de lienzo o canvas**

## **6. Planificación y costes**

### **6.1. El equipo humano**

### **6.2. Estimación temporal del desarollo**

### **6.3. Costes asociados**

#### **6.3.1. Material y software**

#### **6.3.2. Fuerza de trabajo**

## **7. Contenidos pospuestos a futuras actualizaciones**

**Segunda habilidad**

**Animaciones de salto**

**Efectos visuales**

**Remapeado de controles**

**Bilingüismo**

**Modo horda**

## **8. Referencias**
