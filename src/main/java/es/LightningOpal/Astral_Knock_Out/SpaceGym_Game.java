package es.LightningOpal.Astral_Knock_Out;

import es.LightningOpal.Astral_Knock_Out.Skills.*;

/// Imports
import java.util.Queue;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;

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

    public final static int playerPosX = 100;
    public final static int playerPosY = 300;
    public final static int dummyPosX = 1200;
    public final static int dummyPosY = 940;

    ObjectMapper mapper = new ObjectMapper();
    private ScheduledFuture<?> future;
    private User user;
    private Player dummy;
    private double dummyHP;
    private String userName;

    private ArrayList<PhysicsObject> platforms = new ArrayList<PhysicsObject>(9);
    private Queue<Skill> projectiles = new ArrayDeque<>();

    /// Métodos
    // Constructor de la clase que recibe el jugador de la partida y lo guarda
    public SpaceGym_Game(User user_) {
        user = user_;
        userName = user.getUser_name();

        // Dummy
        this.dummy = new Player(/*false, dummyPosX, dummyPosY, 23.0, 42.0, -7.0, -1.0*/);
        dummy.setPosX(dummyPosX);
        dummy.setPosY(dummyPosY);
        dummy.setHalfWidth(23.0);
        dummy.setHalfHeight(42.0);
        dummy.setOffsetX(-7.0);
        dummy.setOffsetY(-1.0);
        this.dummyHP = 1000;

        // Player Weapon
        switch (user.getPlayer_selected().getPlayerType()) {
            case "berserker":
                for (int i = 0; i < 3; i++) {
                    projectiles.add(new BerserkerSkill(user.getPlayer_selected(), dummy, 1000, false, 36, 250)); // Target, duration, collidePlatforms, speed, damage
                }
                user.getPlayer_selected().setBasicWeapon(new Weapon(projectiles, 1, 1000, 50));
                break;
            case "wizard":
                for (int i = 0; i < 9; i++) {
                    projectiles.add(new WizardSkill(user.getPlayer_selected(), dummy, 500, true, 28, 150, i % 3)); // Target, duration, collidePlatforms, speed, damage, id
                }
                user.getPlayer_selected().setBasicWeapon(new Weapon(projectiles, 3, 1000, 50));
                break;
            case "bard":
                for (int i = 0; i < 3; i++) {
                    projectiles.add(new BardSkill(user.getPlayer_selected(), dummy, 2500, false, 18, 90)); // Target, duration, collidePlatforms, speed, damage
                }
                user.getPlayer_selected().setBasicWeapon(new Weapon(projectiles, 1, 1700, 500));
                break;
            case "rogue":
                for (int i = 0; i < 9; i++) {
                    projectiles.add(new RogueSkill(user.getPlayer_selected(), dummy, -1, true, 30, 120, i % 3)); // Caster, Target, duration, collidePlatforms, speed, damage, id
                }
                user.getPlayer_selected().setBasicWeapon(new Weapon(projectiles, 3, 800, 25));
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
        // Inicia y guarda el hilo que ejecuta el método tick
        future = scheduler_.scheduleAtFixedRate(() -> tick(), TICK_DELAY, TICK_DELAY, TimeUnit.MILLISECONDS);
    }

    // Método stopGameLoop, que para el game loop de la partida
    public void stopGameLoop() {
        // Si el future existe y no es null, lo para
        if (future != null) {
            future.cancel(false);
            System.out.println("SE HA CERRADO EL FUTURE PARA EL JUGADOR " + userName + ".");
        }
    }

    // Método broadcast, que envía un mensaje al jugador
    public void broadcast(String message) {
        try {
            // Intenta enviar al jugador el mensaje
            synchronized(user.getSession()) {
                user.getSession().sendMessage(new TextMessage(message.toString()));
            }
        } catch (Throwable ex) {
            //ex.printStackTrace(System.err);
            GamesManager.INSTANCE.stopSpaceGym(user);
            System.out.println("No se ha podido enviar mensaje al jugador " + userName + ".");

            // Intenta escribir la información del error en el archivo de log
			try {
				AKO_Server.logLock.lock();
				AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
				String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
				AKO_Server.logWriter.write(time + " - SERVER ERROR ON BROADCAST [SpaceGym, Player: " + user.getPlayer_selected().getUserName() + "]: " + ex.getStackTrace() + ".\n");
                AKO_Server.logWriter.close();
                AKO_Server.logLock.unlock();
			} catch (Exception e2) {
				// Si falla, se muestra el error
				e2.printStackTrace();
			}
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
        ArrayNode arrayNodeProjectiles = mapper.createArrayNode();

        try {
            // Intenta calcular las físicas del jugador y enviarle los datos
            // Calcula las fisicas
            user.getPlayer_selected().incVelocity(0, GRAVITY); // Gravedad
            user.getPlayer_selected().calculatePhysics();
            user.getPlayer_selected().SetOnFloor(false);
            for (PhysicsObject platform : platforms) {
                user.getPlayer_selected().collide(platform);
            }
            // Controlar límites de la pantalla
            if (user.getPlayer_selected().getPosX() - user.getPlayer_selected().getHalfWidth() < 0){
                user.getPlayer_selected().setPosX(user.getPlayer_selected().getHalfWidth());
                user.getPlayer_selected().setVelX(0);
            }else if (user.getPlayer_selected().getPosX() + user.getPlayer_selected().getHalfWidth() > 1920){
                user.getPlayer_selected().setPosX(1920 - user.getPlayer_selected().getHalfWidth());
                user.getPlayer_selected().setVelX(0);
            }
            // Guarda los datos en el ObjectNode 'jsonPlayer'
            jsonPlayer.put("posX", user.getPlayer_selected().getPosX());
            jsonPlayer.put("posY", user.getPlayer_selected().getPosY());
            jsonPlayer.put("flipped", user.getPlayer_selected().IsFlipped());
            jsonPlayer.put("onFloor", user.getPlayer_selected().IsOnFloor());

            dummy.incVelocity(0, GRAVITY); // Gravedad
            dummy.calculateMovement();
            dummy.SetOnFloor(false);
            for (PhysicsObject platform : platforms) {
                dummy.collide(platform);
            }

            jsonDummy.put("posX", dummy.getPosX());
            jsonDummy.put("posY", dummy.getPosY());

            // Update bullets and handle collision
            for (Skill skill : projectiles) {
                jsonProjectile = mapper.createObjectNode();
                if (skill.isActive()) {
                    // Calcular posición
                    skill.calculatePhysics();
                    if (skill.intersect(skill.getTarget())) {
                        this.dummyHP = skill.impact(this.dummyHP);
                        if (this.dummyHP <= 0){
                            this.dummyHP = 1000;
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
                jsonProjectile.put("isActive", skill.isActive());
                jsonProjectile.put("posX", skill.getPosX());
                jsonProjectile.put("posY", skill.getPosY());
                jsonProjectile.put("facingAngle", skill.getFacingAngle());
                jsonProjectile.put("flipX", skill.IsFlipped());
                arrayNodeProjectiles.addPOJO(jsonProjectile);
            }
            jsonDummy.put("hp", dummyHP);

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

            // Intenta escribir la información del error en el archivo de log
			try {
				AKO_Server.logLock.lock();
				AKO_Server.logWriter = new BufferedWriter(new FileWriter(AKO_Server.logFile, true));
				String time = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
				AKO_Server.logWriter.write(time + " - SERVER ERROR ON TICK [SpaceGym, Player: " + user.getUser_name() + "]: " + ex.getStackTrace() + ".\n");
                AKO_Server.logWriter.close();
                AKO_Server.logLock.unlock();
			} catch (Exception e2) {
				// Si falla, se muestra el error
				e2.printStackTrace();
			}
        }
    }
}
