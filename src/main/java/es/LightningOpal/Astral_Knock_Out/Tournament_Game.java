package es.LightningOpal.Astral_Knock_Out;

import es.LightningOpal.Astral_Knock_Out.Skills.*;

/// Imports
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

// Clase Tournament_Game, que contiene la información de una partida "tournament"
public class Tournament_Game {
	/// Variables
    private final static int FPS = 30;
	private final static long TICK_DELAY = 1000 / FPS;
	public final static boolean DEBUG_MODE = true;
	public final static boolean VERBOSE_MODE = true;

	public final double GRAVITY = 1.0;

	public static int playerAPosX = 100;
    public static int playerAPosY = 300;
    public static int playerBPosX = 1700;
    public static int playerBPosY = 300;

	ObjectMapper mapper = new ObjectMapper();
    private ScheduledFuture<?> future;
    private Lock threadLock = new ReentrantLock();

    private boolean gameStarted;
	private int room;
    private int level;
    private double backgroundPos = 0;
    private double stagePos = 0;

    public String initGameTime;

	private Map<String, Player> players = new ConcurrentHashMap<>();
	private Player playerA;
	private Player playerB;
	private ArrayList<PhysicsObject> platforms = new ArrayList<PhysicsObject>(9);
	private Queue<Skill> projectilesA = new ArrayDeque<>();
	private Queue<Skill> projectilesB = new ArrayDeque<>();

    /// Métodos
    // Constructor de la clase que recibe el jugador de la partida y lo guarda
    public Tournament_Game(Player playerA, Player playerB, int level, int room_) {
		// Añadimos los jugadores a la partida
		players.put(playerA.getUserName(), playerA);
		players.put(playerB.getUserName(), playerB);
		this.playerA = playerA;
		this.playerB = playerB;

		// Asignamos la sala
		room = room_;
        this.level = level;
        
        // Establecemos la hora de inicio
        initGameTime = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(Calendar.getInstance().getTime());
		
		// PlayerA Weapon
        switch (playerA.getPlayerType()) {
            case "berserker":
                for (int i = 0; i < 3; i++) {
                    projectilesA.add(new BerserkerSkill(playerA, playerB, 1000, false, 36, 250)); // Target, duration, collidePlatforms, speed, damage
                }
                playerA.setBasicWeapon(new Weapon(projectilesA, 1, 1000, 50));
                break;
            case "wizard":
                for (int i = 0; i < 9; i++) {
                    projectilesA.add(new WizardSkill(playerA, playerB, 500, true, 28, 150, i % 3)); // Target, duration, collidePlatforms, speed, damage, id
                }
                playerA.setBasicWeapon(new Weapon(projectilesA, 3, 1000, 50));
                break;
            case "bard":
                for (int i = 0; i < 3; i++) {
                    projectilesA.add(new BardSkill(playerA, playerB, 2500, false, 18, 90)); // Target, duration, collidePlatforms, speed, damage
                }
                playerA.setBasicWeapon(new Weapon(projectilesA, 1, 1700, 500));
                break;
            case "rogue":
                for (int i = 0; i < 9; i++) {
                    projectilesA.add(new RogueSkill(playerA, playerB, 550, true, 30, 120, i % 3)); // Target, duration, collidePlatforms, speed, damage, id
                }
                playerA.setBasicWeapon(new Weapon(projectilesA, 3, 800, 25));
                break;
            default:
                break;
		}
		
		// PlayerB Weapon
        switch (playerB.getPlayerType()) {
            case "berserker":
                for (int i = 0; i < 3; i++) {
                    projectilesB.add(new BerserkerSkill(playerB, playerA, 1000, false, 36, 250)); // Target, duration, collidePlatforms, speed, damage
                }
                playerB.setBasicWeapon(new Weapon(projectilesB, 1, 1000, 50));
                break;
            case "wizard":
                for (int i = 0; i < 9; i++) {
                    projectilesB.add(new WizardSkill(playerB, playerA, 500, true, 28, 150, i % 3)); // Target, duration, collidePlatforms, speed, damage, id
                }
                playerB.setBasicWeapon(new Weapon(projectilesB, 3, 1000, 50));
                break;
            case "bard":
                for (int i = 0; i < 3; i++) {
                    projectilesB.add(new BardSkill(playerB, playerA, 2500, false, 18, 90)); // Target, duration, collidePlatforms, speed, damage
                }
                playerB.setBasicWeapon(new Weapon(projectilesB, 1, 1700, 500));
                break;
            case "rogue":
                for (int i = 0; i < 9; i++) {
                    projectilesB.add(new RogueSkill(playerB, playerA, 550, true, 30, 120, i % 3)); // Target, duration, collidePlatforms, speed, damage, id
                }
                playerB.setBasicWeapon(new Weapon(projectilesB, 3, 800, 25));
                break;
            default:
                break;
        }

		// Dependiendo del nivel, situaremos distintas plataformas
		if (level == 0)
		{
            playerAPosX = 100;
            playerAPosY = 300;
            playerBPosX = 1700;
            playerBPosY = 300;
			//Plataformas
			platforms.add(new PhysicsObject(true, 960.0, 1038.0, 960.0, 33.0, 0.0, 9.0)); // floor
			platforms.add(new PhysicsObject(true, 1527.50, 747.50, 187.50, 37.50, 0.0, -41.0)); // base_big_plat_2
			platforms.add(new PhysicsObject(true, 947.0, 511.0, 140.50, 30.0, 0.0, -39.0)); // base_t_plat
			platforms.add(new PhysicsObject(true, 503.0, 717.50, 164.0, 43.50, 0.0, -4.50)); // big_plat_1
			platforms.add(new PhysicsObject(true, 1763.0, 371.50, 157.0, 46.0, 0.0, -5.0)); // big_plat_2
			platforms.add(new PhysicsObject(true, 90.50, 441.0, 90.50, 28.0, 0.0, -5.0)); // plat_1
			platforms.add(new PhysicsObject(true, 517.50, 213.50, 109.0, 30.0, 0.0, -26.0)); // plat_2
			platforms.add(new PhysicsObject(true, 1230.50, 115.0, 104.50, 32.50, 0.0, -9.0)); // plat_3
			platforms.add(new PhysicsObject(true, 945.50, 371.50, 34.0, 84.50, 0.0, -4.50)); // t_plat
		} else if (level == 1){
            playerAPosX = 486;
            playerAPosY = 725;
            playerBPosX = 1491;
            playerBPosY = 746;
            //Plataformas
            // isStatic, posX, posY, hW, hH, offX, offY
            platforms.add(new PhysicsObject(true, 486.50, 2184.0, 272.50, 38.0, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 1454.0, 2183.0, 273.0, 38.0, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 964.50, 1825.0, 180.50, 38.0, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 319.50, 1431.0, 319.50, 38.0, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 963.50, 1698.50, 31.50, 88.50, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 1336.50, 1246.0, 272.50, 38.0, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 1671.0, 869.0, 251.0, 38.0, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 1810.0, 490.0, 110.0, 37.0, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 475.50, 846.0, 244.50, 38.0, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 267.0, 700.50, 36.0, 109.50, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 151.50, 553.50, 151.50, 37.50, 0.0, 0.0));
            platforms.add(new PhysicsObject(true, 983.0, 261.0, 453.0, 38.0, 0.0, 0.0));
        }
    }
    
    public boolean isGameStarted(){
        return gameStarted;
    }
    public void setGameStarted(boolean gameStarted){
        this.gameStarted = gameStarted;
    }
	
	public Collection<Player> getPlayers() {
		return players.values();
	}

	// Método startGameLoop, que inicia el game loop de la partida
    public void startGameLoop(ScheduledExecutorService scheduler_) {
        // Inicia y guarda el hilo que ejecuta el método tick
        try
        {
            future = scheduler_.scheduleAtFixedRate(() -> tick(), TICK_DELAY, TICK_DELAY, TimeUnit.MILLISECONDS);
        }
        catch(Exception e)
        {
            System.out.println("MEMORIA LLENA, IMPOSIBLE CREAR HILO");
            GamesManager.INSTANCE.finishTournamentGame(room, playerB, playerA, false);
            for (Player player : players.values()) {
                try
                {
                    player.getSession().close();
                }
                catch (Exception ex)
                {
                    System.out.println("NO PUEDE CERRAR SESIÓN A JUGADOR: " + player.getUserName());
                }
            }
        }
    }

    // Método stopGameLoop, que para el game loop de la partida
    public void stopGameLoop() {
        // Si el future existe y no es null, lo para
        this.gameStarted = false;
        if (future != null) {
            threadLock.lock();
            future.cancel(false);
            threadLock.unlock();
            System.out.println("SE HA CERRADO EL FUTURE DE LA PARTIDA DE LOS JUGADORES " + players + ".");
        }
	}
	
	// Método setPlayersPosition, que establece la posición de los jugadores en el mapa
	public void setPlayersPosition()
	{
		int counter = 0;
		for (Player player : players.values()) {
			if (counter == 0)
			{
				player.setPosX(playerAPosX);
				player.setPosY(playerAPosY);
			}
			else if (counter == 1)
			{
				player.setPosX(playerBPosX);
                player.setPosY(playerBPosY);
                player.SetFlipped(true);
			}
			counter++;
		}
	}

	public void broadcast(String message) {
		for (Player player : players.values()) {
			try {
                threadLock.lock();
				synchronized(player.getSession()){
					player.getSession().sendMessage(new TextMessage(message.toString()));
                }
			} catch (Throwable ex) {
				System.err.println("Exception sending message to player " + player.getUserName());
                
                // Intenta escribir la información del error en el archivo de log
                try {
                    AKO_Server.logLock.lock();
                    AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
                    String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
                    AKO_Server.logWriter.write(time + " - SERVER ERROR ON BROADCAST [Tournament, Room: " + room + "]: " + ex.getStackTrace() + ".\n");
                    AKO_Server.logWriter.close();
                    AKO_Server.logLock.unlock();
                } catch (Exception e2) {
                    // Si falla, se muestra el error
                    e2.printStackTrace();
                }
			}finally{
                threadLock.unlock();
            }
		}
	}

	private void tick() {
        if (!gameStarted){ // Impedir el movimiento de las plataformas y de los personajes en el servidor
            return;
        }
		// Se crea un ObjectNode 'json' para guardar la información del mensaje a enviar
        ObjectNode json = mapper.createObjectNode();
        // Se crea un ObjectNode 'jsonPlayer' para guardar la información del jugador
        ObjectNode jsonPlayerA = mapper.createObjectNode();
        ObjectNode jsonPlayerB = mapper.createObjectNode();
		ObjectNode jsonProjectileA = mapper.createObjectNode();
		ObjectNode jsonProjectileB = mapper.createObjectNode();
		ArrayNode arrayNodeProjectilesA = mapper.createArrayNode();
        ArrayNode arrayNodeProjectilesB = mapper.createArrayNode();
        ObjectNode jsonPlayerAHP = mapper.createObjectNode();
        ObjectNode jsonPlayerBHP = mapper.createObjectNode();

		try {
            // SI EL JUGADOR SE CAE PIERDE
            // Movemos las plataformas y el fondo en el level 1
            if (level == 1){
                backgroundPos -= 1;
                stagePos -= 2;
                if (backgroundPos <= -2349){
                    backgroundPos = 0;
                }
                if (stagePos <= -2349){
                    stagePos = 0;
                }
                for (PhysicsObject platform : platforms){
                    platform.setPosY(platform.getPosY()+2);
                    if (platform.getPosY()-platform.getHalfHeight() >= 1280){
                        platform.setPosY(platform.getPosY()-2349);
                    }
                }
            }
			// Intenta calcular las físicas de los jugadores y enviarle los datos
			// Player A
			playerA.incVelocity(0, GRAVITY); // Gravedad
            playerA.calculatePhysics();
            playerA.SetOnFloor(false);
            for (PhysicsObject platform : platforms) {
                playerA.collide(platform);
            }
            // Controlar límites de la pantalla
            if (playerA.getPosX() - playerA.getHalfWidth() < 0){
                playerA.setPosX(playerA.getHalfWidth());
                playerA.setVelX(0);
            }else if (playerA.getPosX() + playerA.getHalfWidth() > 1920){
                playerA.setPosX(1920 - playerA.getHalfWidth());
                playerA.setVelX(0);
            }
            if (playerA.getPosY() - playerA.getHalfHeight() >= 1180){
                // El jugador se ha caído del mapa y pierde la partida
                GamesManager.INSTANCE.finishTournamentGame(room, playerB, playerA, false);
            }
            // Guarda los datos en el ObjectNode 'jsonPlayer'
            jsonPlayerA.put("posX", playerA.getPosX());
            jsonPlayerA.put("posY", playerA.getPosY());
            jsonPlayerA.put("movingRight", playerA.isMovingRight());
            jsonPlayerA.put("movingLeft", playerA.isMovingLeft());
            jsonPlayerA.put("flipped", playerA.IsFlipped());
            jsonPlayerA.put("onFloor", playerA.IsOnFloor());
            jsonPlayerA.put("canBasicAttack", playerA.getBasicWeapon().CanAttack());
			jsonPlayerA.put("canSpecialAttack", playerA.getSpecialWeapon().CanAttack());
			
			// Player B
			playerB.incVelocity(0, GRAVITY); // Gravedad
            playerB.calculatePhysics();
            playerB.SetOnFloor(false);
            for (PhysicsObject platform : platforms) {
                playerB.collide(platform);
            }
            // Controlar límites de la pantalla
            if (playerB.getPosX() - playerB.getHalfWidth() < 0){
                playerB.setPosX(playerB.getHalfWidth());
                playerB.setVelX(0);
            }else if (playerB.getPosX() + playerB.getHalfWidth() > 1920){
                playerB.setPosX(1920 - playerB.getHalfWidth());
                playerB.setVelX(0);
            }
            if (playerB.getPosY() - playerB.getHalfHeight() >= 1180){
                // El jugador se ha caído del mapa y pierde la partida
                GamesManager.INSTANCE.finishTournamentGame(room, playerA, playerB, false);
            }
            // Guarda los datos en el ObjectNode 'jsonPlayer'
            jsonPlayerB.put("posX", playerB.getPosX());
            jsonPlayerB.put("posY", playerB.getPosY());
            jsonPlayerB.put("movingRight", playerB.isMovingRight());
            jsonPlayerB.put("movingLeft", playerB.isMovingLeft());
            jsonPlayerB.put("flipped", playerB.IsFlipped());
            jsonPlayerB.put("onFloor", playerB.IsOnFloor());
            jsonPlayerB.put("canBasicAttack", playerB.getBasicWeapon().CanAttack());
			jsonPlayerB.put("canSpecialAttack", playerB.getSpecialWeapon().CanAttack());
			
			// Proyectiles A
			for (Skill skill : projectilesA) {
                jsonProjectileA = mapper.createObjectNode();
                if (skill.isActive()) {
                    // Calcular posición
                    skill.calculatePhysics();
                    if (level == 1){
                        skill.setPosY(skill.getPosY()+2);
                    }
                    if (skill.intersect(skill.getTarget())) {
                        skill.setActive(false);
                        double hp = skill.impact(); // Se lanza un mensaje a ambos jugadores
                        if (hp <= 0.0){
                            // Acabar partida
                            GamesManager.INSTANCE.finishTournamentGame(room, playerA, playerB, false);
                        }else{
                            // Enviar mensaje con la nueva vida a los jugadores
                            jsonPlayerBHP.put("event", "DAMAGE");
                            jsonPlayerBHP.put("playerName", skill.getTarget().getUserName());
                            jsonPlayerBHP.put("hp", hp);
                            broadcast(jsonPlayerBHP.toString());
                        }

                    }
                    if (skill.collidesWithPlatforms()){
                        for (PhysicsObject platform : platforms){
                            if (skill.intersect(platform)){
                                skill.disable();
                            }
                        }
                    }
                }
                // Guardar proyectiles en array y comunicar al cliente la posición
                jsonProjectileA.put("isActive", skill.isActive());
                jsonProjectileA.put("posX", skill.getPosX());
                jsonProjectileA.put("posY", skill.getPosY());
                jsonProjectileA.put("facingAngle", skill.getFacingAngle());
                jsonProjectileA.put("flipX", skill.IsFlipped());
                arrayNodeProjectilesA.addPOJO(jsonProjectileA);
			}
			
			// Proyectiles B
			for (Skill skill : projectilesB) {
                jsonProjectileB = mapper.createObjectNode();
                if (skill.isActive()) {
                    // Calcular posición
                    skill.calculatePhysics();
                    if (level == 1){
                        skill.setPosY(skill.getPosY()+2);
                    }
                    if (skill.intersect(skill.getTarget())) {
                        skill.setActive(false);
                        double hp = skill.impact(); // Se lanza un mensaje a ambos jugadores
                        if (hp <= 0.0){
                            // Acabar partida
                            GamesManager.INSTANCE.finishTournamentGame(room, playerB, playerA, false);
                        }else{
                            // Enviar mensaje con la nueva vida a los jugadores
                            jsonPlayerAHP.put("event", "DAMAGE");
                            jsonPlayerAHP.put("playerName", skill.getTarget().getUserName());
                            jsonPlayerAHP.put("hp", hp);
                            broadcast(jsonPlayerAHP.toString());
                        }
                    }
                    if (skill.collidesWithPlatforms()){
                        for (PhysicsObject platform : platforms){
                            if (skill.intersect(platform)){
                                skill.disable();
                            }
                        }
                    }
                }
                // Guardar proyejsonPlayerAHPctiles en array y comunicar al cliente la posición
                jsonProjectileB.put("isActive", skill.isActive());
                jsonProjectileB.put("posX", skill.getPosX());
                jsonProjectileB.put("posY", skill.getPosY());
                jsonProjectileB.put("facingAngle", skill.getFacingAngle());
                jsonProjectileB.put("flipX", skill.IsFlipped());
                arrayNodeProjectilesB.addPOJO(jsonProjectileB);
			}
			
			// Añade el evento correspondiente
			json.put("event", "UPDATE_TOURNAMENT");
            json.put("level", level);
            // Mover escenario y plataformas para el nivel 2 y pasarlo en 'json'
            if (level == 1){
                json.put("backgroundPos", backgroundPos);
                json.put("stagePos", stagePos);
            }
            // Añade el ObjectNode 'jsonPlayer' al ObjectNode 'json' para unificar la
            // información
            json.putPOJO("playerA", jsonPlayerA);
            json.putPOJO("playerB", jsonPlayerB);
			json.putPOJO("projectilesA", arrayNodeProjectilesA);
			json.putPOJO("projectilesB", arrayNodeProjectilesB);
			// Envía a los jugadores un mensaje con la información del ObjectNode 'json'
            this.broadcast(json.toString());
		} catch (Throwable ex) {
            // Excepcion
            // Intenta escribir la información del error en el archivo de log
			try {
				AKO_Server.logLock.lock();
				AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
				String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
				AKO_Server.logWriter.write(time + " - SERVER ERROR ON TICK [Tournament, Room: " + room + "]: " + ex.getStackTrace() + ".\n");
                AKO_Server.logWriter.close();
                AKO_Server.logLock.unlock();
			} catch (Exception e2) {
				// Si falla, se muestra el error
				e2.printStackTrace();
			}
		}
	}
}
