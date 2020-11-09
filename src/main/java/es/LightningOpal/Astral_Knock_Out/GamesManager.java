package es.LightningOpal.Astral_Knock_Out;

/// Imports
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.atomic.AtomicInteger;

// Clase GamesManager, que se encarga de las partidas en el servidor
public class GamesManager {
    // Instancia única de la clase (patrón singleton)
    public static GamesManager INSTANCE = new GamesManager();

    /// Variables
    //// Partidas "space gym"
    // Scheduler de las partidas "space gym"
    private ScheduledExecutorService scheduler_spaceGym = Executors.newScheduledThreadPool(1);

    // Scheduler de las partidas "tournament"
    private ScheduledExecutorService scheduler_tournament = Executors.newScheduledThreadPool(1);

    // Mapa que guarda las partidas "space gym" que se están ejecutando
    public Map<Player, SpaceGym_Game> spaceGym_games = new ConcurrentHashMap<>();

    // Mapa que guarda las partidas "tournament" que se están ejecutando
    public Map<Integer, Tournament_Game> tournament_games = new ConcurrentHashMap<>();

    // Mapa que guarda enteros atómicos que ayudan a iniciar partidas a la vez
    public Map<Integer, AtomicInteger> startGame_counters = new ConcurrentHashMap<>();

    // Cola que guarda los jugadores que están buscando partida
    public ConcurrentLinkedQueue<Player> searching_players = new ConcurrentLinkedQueue<>();

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

    public int createTournamentGame(Player playerA, Player playerB, int level)
    {
        // Asigna el numero de sala
        int room = tournament_games.size();
        // Crea la partida
        Tournament_Game newGame = new Tournament_Game(playerA, playerB, level, room);
        // Añade la partida al mapa de partidas
        tournament_games.put(room, newGame);

        // Se crea un AtomicInteger que gestione los jugadores que están listos
        AtomicInteger newAtomicInteger = new AtomicInteger(0);
        // Añade el AtomicInteger al mapa de contadores
        startGame_counters.put(room, newAtomicInteger);

        // Devuelve la sala
        return room;
    }

    public void playerReady(int room)
    {
        int playerReady = startGame_counters.get(room).incrementAndGet();

        // Empezamos
        if (playerReady == 2)
        {

        }
    }

    public void startTournamentGame(int room)
    {
        // Inicia el game loop de esa partida
        tournament_games.get(room).startGameLoop(scheduler_tournament);
    }
}
