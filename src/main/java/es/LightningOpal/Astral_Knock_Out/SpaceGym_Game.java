package es.LightningOpal.Astral_Knock_Out;

import es.LightningOpal.Astral_Knock_Out.Skills.*;

/// Imports
import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

// Clase SpaceGym_Game, que contiene la información de una partida de "space gym"
public class SpaceGym_Game {
    /// Variables
    private final static int FPS = 30;
    private final static long TICK_DELAY = 1000 / FPS;
    public final static boolean DEBUG_MODE = true;
    public final static boolean VERBOSE_MODE = true;

    public final double GRAVITY = 1.0;

    public final static int playerPosX = 500;
    public final static int playerPosY = 0;
    public final static int dummyPosX = 1500;
    public final static int dummyPosY = 940;

    ObjectMapper mapper = new ObjectMapper();
    private ScheduledExecutorService scheduler;
    private Player player;
    private PhysicsObject dummy;
    private String userName;

    private ArrayList<PhysicsObject> platforms = new ArrayList<PhysicsObject>(9);
    private Queue<Skill> projectiles = new ArrayDeque();

    /// Métodos
    // Constructor de la clase que recibe el jugador de la partida y lo guarda
    public SpaceGym_Game(Player player_) {
        player = player_;
        User thisUser = (User) player.getSession().getAttributes().get("USER");
        userName = thisUser.getUser_name();

        // Dummy
        this.dummy = new PhysicsObject(false, dummyPosX, dummyPosY, 23.0, 42.0, -7.0, -1.0);

        // Player Weapon
        switch (player.getPlayerType()) {
            case "berserker":
                for (int i = 0; i < 3; i++) {
                    projectiles.add(new BerserkerSkill(player, dummy, 1000, 10, 20)); // Target, duration, speed, damage
                }
                player.setBasicWeapon(new Weapon(projectiles, 1, 1000));
                break;
            case "wizard":
                for (int i = 0; i < 9; i++) {
                    projectiles.add(new WizardSkill(player, dummy, 1000, 10, 20, i % 3)); // Target, duration, speed, damage, id
                }
                player.setBasicWeapon(new Weapon(projectiles, 3, 400));
                break;
            case "bard":
                for (int i = 0; i < 3; i++) {
                    projectiles.add(new BardSkill(player, dummy, 2500, 20, 20)); // Target, duration, speed, damage
                }
                player.setBasicWeapon(new Weapon(projectiles, 1, 500));
                break;
            case "rogue":
                for (int i = 0; i < 3; i++) {
                    projectiles.add(new RogueSkill(player, dummy, 1000, 10, 20, i % 3)); // Target, duration, speed, damage, id
                }
                player.setBasicWeapon(new Weapon(projectiles, 1, 200));
                break;
            default:
                break;
        }

        // Plataformas
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
            System.out.println("SE HA CERRADO EL SCHEDULER PARA EL JUGADOR " + userName + ".");
        }
    }

    // Método broadcast, que envía un mensaje al jugador
    public void broadcast(String message) {
        try {
            // Intenta enviar al jugador el mensaje
            synchronized(player.getSession()){
                player.getSession().sendMessage(new TextMessage(message.toString()));
            }
        } catch (Throwable ex) {
            // System.err.println("Exception sending message to player " +
            // player.getSession().getId());
            // ex.printStackTrace(System.err);
            GamesManager.INSTANCE.stopSpaceGym(player);
            System.out.println("No se ha podido enviar mensaje al jugador " + userName + ".");
        }
    }

    // Método tick, que se ejecuta cada TICK_DELAY milisegundos
    private void tick() {
        // Se crea un ObjectNode 'json' para guardar la información del mensaje a enviar
        ObjectNode json = mapper.createObjectNode();
        // Se crea un ObjectNode 'jsonPlayer' para guardar la información del jugador
        ObjectNode jsonPlayer = mapper.createObjectNode();
        ObjectNode jsonDummy = mapper.createObjectNode();
        ObjectNode jsonProjectile = mapper.createObjectNode();
        // ArrayNode arrayNodePlatforms = mapper.createArrayNode();
        ArrayNode arrayNodeProjectiles = mapper.createArrayNode();

        // long thisInstant = System.currentTimeMillis();
        // Set<Integer> bullets2Remove = new HashSet<>();
        // boolean removeBullets = false;

        try {
            // Intenta calcular las físicas del jugador y enviarle los datos
            // Calcula las fisicas
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

            dummy.incVelocity(0, GRAVITY); // Gravedad
            dummy.calculateMovement();
            dummy.SetOnFloor(false);
            for (PhysicsObject platform : platforms) {
                dummy.collide(platform);
            }
            if (dummy.IsOnFloor()){
                dummy.setVelY(-50);
                dummy.applyVelocity2Position();
            }

            jsonDummy.put("posX", dummy.getPosX());
            jsonDummy.put("posY", dummy.getPosY());

            // Update bullets and handle collision
            /*
             * for (Projectile projectile : getProjectiles()) {
             * projectile.applyVelocity2Position();
             * 
             * // Handle collision for (Player player : getPlayers()) { if
             * ((projectile.getOwner().getPlayerId() != player.getPlayerId()) &&
             * player.intersect(projectile)) { // System.out.println("Player " +
             * player.getPlayerId() + " was hit!!!"); projectile.setHit(true); break; } }
             * 
             * ObjectNode jsonProjectile = mapper.createObjectNode();
             * jsonProjectile.put("id", projectile.getId());
             * 
             * if (!projectile.isHit() && projectile.isAlive(thisInstant)) {
             * jsonProjectile.put("posX", projectile.getPosX()); jsonProjectile.put("posY",
             * projectile.getPosY()); jsonProjectile.put("facingAngle",
             * projectile.getFacingAngle()); jsonProjectile.put("isAlive", true); } else {
             * removeBullets = true; bullets2Remove.add(projectile.getId());
             * jsonProjectile.put("isAlive", false); if (projectile.isHit()) {
             * jsonProjectile.put("isHit", true); jsonProjectile.put("posX",
             * projectile.getPosX()); jsonProjectile.put("posY", projectile.getPosY()); } }
             * arrayNodeProjectiles.addPOJO(jsonProjectile); }
             */

            for (Skill skill : projectiles) {
                jsonProjectile = mapper.createObjectNode();
                if (skill.isActive()) {
                    // Calcular posición
                    skill.calculatePhysics();
                    if (skill.intersect(skill.getTarget())) {
                        skill.setActive(false);
                        skill.impact();
                    }
                }
                // System.out.println(skill.isActive());
                // Guardar proyectiles en array y comunicar al cliente la posición
                jsonProjectile.put("isActive", skill.isActive());
                jsonProjectile.put("posX", skill.getPosX());
                jsonProjectile.put("posY", skill.getPosY());
                jsonProjectile.put("facingAngle", skill.getFacingAngle());
                jsonProjectile.put("flipX", skill.IsFlipped());
                arrayNodeProjectiles.addPOJO(jsonProjectile);
            }

            /*
             * if (removeBullets) this.projectiles.keySet().removeAll(bullets2Remove);
             */

            // Añade el evento correspondiente
            json.put("event", "UPDATE_SPACE_GYM");
            // Añade el ObjectNode 'jsonPlayer' al ObjectNode 'json' para unificar la
            // información
            json.putPOJO("player", jsonPlayer);
            json.putPOJO("dummy", jsonDummy);
            json.putPOJO("projectiles", arrayNodeProjectiles);

            // Envía al jugador un mensaje con la información del ObjectNode 'json'
            this.broadcast(json.toString());
        } catch (Throwable ex) {
            // Excepcion
            System.out.println(ex);
        }
    }

    // Método HandleCollision, de momento no hace nada y puede que no sirva
    public void handleCollision() {

    }
}
