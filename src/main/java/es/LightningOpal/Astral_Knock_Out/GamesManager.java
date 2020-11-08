package es.LightningOpal.Astral_Knock_Out;

/// Imports
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

// Clase GamesManager, que se encarga de las partidas en el servidor
public class GamesManager {
    // Instancia única de la clase (patrón singleton)
    public static GamesManager INSTANCE = new GamesManager();

    /// Variables
    //// Partidas "space gym"
    // Scheduler de las partidas "space gym"
    private ScheduledExecutorService scheduler_spaceGym = Executors.newScheduledThreadPool(1);

    // Mapa que guarda las partidas "space gym" que se están ejecutando
    public Map<Player, SpaceGym_Game> spaceGym_games = new ConcurrentHashMap<>();

    // Constructor vacio de la clase
    private GamesManager()
    {

    }

    /// Métodos
    // Método startSpaceGym, que inicia una partida de "space gym" para el jugador indicado
    public void startSpaceGym(Player thisPlayer)
    {
        // Crea la partida para el jugador
        SpaceGym_Game newGame = new SpaceGym_Game(thisPlayer);
        // Inicia el game loop de esa partida
        newGame.startGameLoop(scheduler_spaceGym);
        // Añade la partida al mapa de partidas
        spaceGym_games.put(thisPlayer, newGame);
    }

    // Método stopSpaceGym, que para la partida de "space gym" del jugador indicado
    public void stopSpaceGym(Player thisPlayer)
    {
        // Obtiene la partida que hay que parar
        SpaceGym_Game gameToStop = spaceGym_games.get(thisPlayer);
        // Para el game loop de esa partida
        gameToStop.stopGameLoop();
        // Elimina la partida del mapa de partidas
        spaceGym_games.remove(thisPlayer);
    }
}
