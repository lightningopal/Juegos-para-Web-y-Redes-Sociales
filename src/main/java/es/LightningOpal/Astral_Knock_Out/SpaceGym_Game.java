package es.LightningOpal.Astral_Knock_Out;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class SpaceGym_Game {
    private final static int FPS = 30;
    private final static long TICK_DELAY = 1000 / FPS;
    public final static boolean DEBUG_MODE = true;
    public final static boolean VERBOSE_MODE = true;

    public final static int playerPosX = 250;
    public final static int playerPosY = 850;
    public final static int dummyPosX = 1500;
    public final static int dummyPosY = 940;

    // Room ID ?

    ObjectMapper mapper = new ObjectMapper();
    private ScheduledExecutorService scheduler;

    // INDIVIDUAL GAME ROOM
    private Player player;
    // private Map<String, Platform> platforms = new ConcurrentHashMap<>();
    // private Map<Integer, Projectile> projectiles = new ConcurrentHashMap<>();

    public SpaceGym_Game(Player player_) {
        player = player_;
    }

    /*
     * public void addProjectile(int id, Projectile projectile) {
     * projectiles.put(id, projectile); }
     * 
     * public Collection<Projectile> getProjectiles() { return projectiles.values();
     * }
     * 
     * public void removeProjectile(Projectile projectile) {
     * players.remove(projectile.getId(), projectile); }
     */

    public void startGameLoop(ScheduledExecutorService scheduler_) {
        scheduler = scheduler_;
        scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(() -> tick(), TICK_DELAY, TICK_DELAY, TimeUnit.MILLISECONDS);
    }

    public void stopGameLoop() {
        if (scheduler != null) {
            scheduler.shutdown();
            System.out.println("SE HA CERRADO EL SCHEDULER");
        }
    }

    public void broadcast(String message) {
        try {
            player.getSession().sendMessage(new TextMessage(message.toString()));
        } catch (Throwable ex) {
            //System.err.println("Exception sending message to player " + player.getSession().getId());
            //ex.printStackTrace(System.err);
            GamesManager.INSTANCE.stopSpaceGym(player);
            System.out.println("Deberia cerrarse el game");
            // habría que borrar el game de la lista de GamesManager
        }
    }

    private void tick() {
        ObjectNode json = mapper.createObjectNode();
        ObjectNode jsonPlayer = mapper.createObjectNode();
        // ArrayNode arrayNodePlatforms = mapper.createArrayNode();
        // ArrayNode arrayNodeProjectiles = mapper.createArrayNode();

        long thisInstant = System.currentTimeMillis();
        // Set<Integer> bullets2Remove = new HashSet<>();
        // boolean removeBullets = false;

        try {
            // Update player
            player.calculateMovement();
            jsonPlayer.put("posX", player.getPosX());
            jsonPlayer.put("posY", player.getPosY());
            jsonPlayer.put("flipped", player.IsFlipped());

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

            /*
             * if (removeBullets) this.projectiles.keySet().removeAll(bullets2Remove);
             */

            json.put("event", "UPDATE_SPACE_GYM");
            json.putPOJO("player", jsonPlayer);
            // json.putPOJO("projectiles", arrayNodeProjectiles);

            this.broadcast(json.toString());
        } catch (Throwable ex) {

        }
    }

    public void handleCollision() {

    }
}
