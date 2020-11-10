package es.LightningOpal.Astral_Knock_Out;

/// Imports
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

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

	public final static int playerAPosX = 500;
    public final static int playerAPosY = 0;
    public final static int playerBPosX = 1500;
    public final static int playerBPosY = 940;

	ObjectMapper mapper = new ObjectMapper();
	private ScheduledExecutorService scheduler;

	private int room;

	private Map<String, Player> players = new ConcurrentHashMap<>();
	private ArrayList<PhysicsObject> platforms = new ArrayList<PhysicsObject>(9);
	//private Map<Integer, Projectile> projectiles = new ConcurrentHashMap<>();

    /// Métodos
    // Constructor de la clase que recibe el jugador de la partida y lo guarda
    public Tournament_Game(Player playerA, Player playerB, int level, int room_) {
		// Añadimos los jugadores a la partida
		players.put(playerA.getUserName(), playerA);
		players.put(playerB.getUserName(), playerB);

		// Asignamos la sala
		room = room_;
		
		// Dependiendo del nivel, situaremos distintas plataformas
		if (level == 0)
		{
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
		}
	}
	
	public Collection<Player> getPlayers() {
		return players.values();
	}

	/*public void addProjectile(int id, Projectile projectile) {
		projectiles.put(id, projectile);
	}

	public Collection<Projectile> getProjectiles() {
		return projectiles.values();
	}

	public void removeProjectile(Projectile projectile) {
		players.remove(projectile.getId(), projectile);
	}*/

	// Método startGameLoop, que inicia el game loop de la partida
    public void startGameLoop(ScheduledExecutorService scheduler_) {
        // Guarda el scheduler
        scheduler = scheduler_;
        // ¿Crea un nuevo ThreadPool en el scheduler?
        scheduler = Executors.newScheduledThreadPool(1);
        // Inicia el hilo que ejecuta el método tick
        scheduler.scheduleAtFixedRate(() -> tick(), TICK_DELAY, TICK_DELAY, TimeUnit.MILLISECONDS);
    }

    // Método stopGameLoop, que para el game loop de la partida
    public void stopGameLoop() {
        // Si el scheduler existe y no es null, lo para
        if (scheduler != null) {
            scheduler.shutdown();
            System.out.println("SE HA CERRADO EL SCHEDULER DE LA PARTIDA DE LOS JUGADORES " + players + ".");
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
			}
			counter++;
		}
	}

	public void broadcast(String message) {
		for (Player player : players.values()) {
			try {
				synchronized(player.getSession()){
					player.getSession().sendMessage(new TextMessage(message.toString()));
				}
			} catch (Throwable ex) {
				System.err.println("Execption sending message to player " + player.getSession().getId());
				ex.printStackTrace(System.err);
				// HAY QUE DARLE LA WIN AL JUGADOR QUE QUEDA
				String disconnectedPlayer = player.getUserName();
			}
		}
	}

	private void tick() {
		/*ObjectNode json = mapper.createObjectNode();
		ArrayNode arrayNodePlayers = mapper.createArrayNode();
		//ArrayNode arrayNodeProjectiles = mapper.createArrayNode();*/

		/*long thisInstant = System.currentTimeMillis();
		Set<Integer> bullets2Remove = new HashSet<>();
		boolean removeBullets = false;*/

		try {
			/*// Intenta calcular las físicas de los jugadores y enviarle los datos
            // Calcula las fisicas
			for (Player player : players.values()) {
				ObjectNode jsonPlayer = mapper.createObjectNode();

				player.calculateMovement();
				player.incVelocity(0, GRAVITY); // Gravedad
				player.calculatePhysics();
				player.SetOnFloor(false);

				for (PhysicsObject platform : platforms) {
					player.collide(platform);
				}

				// Guarda los datos en el ObjectNode 'jsonPlayer'
				jsonPlayer.put("posX", player.getPosX());
				jsonPlayer.put("posY", player.getPosY());
				jsonPlayer.put("flipped", player.IsFlipped());
				jsonPlayer.put("onFloor", player.IsOnFloor());
				jsonPlayer.put("canBasicAttack", player.getBasicWeapon().CanAttack());
				jsonPlayer.put("canSpecialAttack", player.getSpecialWeapon().CanAttack());
				arrayNodePlayers.addPOJO(jsonPlayer);
			}

			// Update bullets and handle collision
			/*for (Projectile projectile : getProjectiles()) {
				projectile.applyVelocity2Position();

				// Handle collision
				for (Player player : getPlayers()) {
					if ((projectile.getOwner().getPlayerId() != player.getPlayerId()) && player.intersect(projectile)) {
						// System.out.println("Player " + player.getPlayerId() + " was hit!!!");
						projectile.setHit(true);
						break;
					}
				}

				ObjectNode jsonProjectile = mapper.createObjectNode();
				jsonProjectile.put("id", projectile.getId());

				if (!projectile.isHit() && projectile.isAlive(thisInstant)) {
					jsonProjectile.put("posX", projectile.getPosX());
					jsonProjectile.put("posY", projectile.getPosY());
					jsonProjectile.put("facingAngle", projectile.getFacingAngle());
					jsonProjectile.put("isAlive", true);
				} else {
					removeBullets = true;
					bullets2Remove.add(projectile.getId());
					jsonProjectile.put("isAlive", false);
					if (projectile.isHit()) {
						jsonProjectile.put("isHit", true);
						jsonProjectile.put("posX", projectile.getPosX());
						jsonProjectile.put("posY", projectile.getPosY());
					}
				}
				arrayNodeProjectiles.addPOJO(jsonProjectile);
			}*/

			/*if (removeBullets)
				this.projectiles.keySet().removeAll(bullets2Remove);*/

			/*json.put("event", "GAME STATE UPDATE");
			json.putPOJO("players", arrayNodePlayers);*/
			//json.putPOJO("projectiles", arrayNodeProjectiles);

			// Envía a los jugadores un mensaje con la información del ObjectNode 'json'
			//this.broadcast(json.toString());
		} catch (Throwable ex) {
			// Excepcion
		}
	}

	// Método HandleCollision, de momento no hace nada y puede que no sirva
	public void handleCollision() {

	}
}
