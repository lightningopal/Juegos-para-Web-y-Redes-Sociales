package es.LightningOpal.Astral_Knock_Out;

import java.util.ArrayList;
/// Imports
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.web.socket.TextMessage;

// Clase GamesManager, que se encarga de las partidas en el servidor
public class GamesManager {
    // Instancia única de la clase (patrón singleton)
    public static GamesManager INSTANCE = new GamesManager();

    /// Variables
    // Número de partidas de cada uno
    public final int MAX_SPACEGYM_GAMES = 5;
    public final int MAX_TOURNAMENT_GAMES = 10;

    //// Partidas "space gym"
    // Scheduler de las partidas "space gym"
    private ScheduledExecutorService scheduler_spaceGym = Executors.newScheduledThreadPool(MAX_SPACEGYM_GAMES);

    // Scheduler de las partidas "tournament"
    private ScheduledExecutorService scheduler_tournament = Executors.newScheduledThreadPool(MAX_TOURNAMENT_GAMES);

    // Mapa que guarda las partidas "space gym" que se están ejecutando
    public Map<Player, SpaceGym_Game> spaceGym_games = new ConcurrentHashMap<>();

    //// Partidas "tournament"
    // Mapa que guarda las partidas "tournament" que se están ejecutando
    public Map<Integer, Tournament_Game> tournament_games = new ConcurrentHashMap<>();

    // Mapa que guarda enteros atómicos que ayudan a iniciar partidas a la vez
    public Map<Integer, AtomicInteger> startGame_counters = new ConcurrentHashMap<>();

    // Mapa que guarda cerrojos que ayudan a iniciar partidas a la vez
    public Map<Integer, Lock> startGame_locks = new ConcurrentHashMap<>();

    // Colas que guarda los jugadores que están buscando partida
    public ArrayList<ConcurrentLinkedQueue<Player>> searching_players = new ArrayList<>();

    // Mapper para enviar mensajes
    private ObjectMapper mapper = new ObjectMapper();

    // Constructor vacio de la clase
    private GamesManager() {
        ConcurrentLinkedQueue<Player> searchingLevel0 = new ConcurrentLinkedQueue<>();
        searching_players.add(searchingLevel0);
        ConcurrentLinkedQueue<Player> searchingLevel1 = new ConcurrentLinkedQueue<>();
        searching_players.add(searchingLevel1);
    }

    /// Métodos
    // Método startSpaceGym, que inicia una partida de "space gym" para el jugador
    /// indicado
    public void startSpaceGym(Player thisPlayer) {
        // Crea la partida para el jugador
        SpaceGym_Game newGame = new SpaceGym_Game(thisPlayer);
        // Inicia el game loop de esa partida
        newGame.startGameLoop(scheduler_spaceGym);
        // Añade la partida al mapa de partidas
        spaceGym_games.put(thisPlayer, newGame);
    }

    // Método stopSpaceGym, que para la partida de "space gym" del jugador indicado
    public void stopSpaceGym(Player thisPlayer) {
        // Obtiene la partida que hay que parar
        SpaceGym_Game gameToStop = spaceGym_games.get(thisPlayer);
        // Para el game loop de esa partida
        gameToStop.stopGameLoop();
        // Elimina la partida del mapa de partidas
        spaceGym_games.remove(thisPlayer);
    }

    public int createTournamentGame(Player playerA, Player playerB, int level) {
        // Asigna el numero de sala
        int room = tournament_games.size();
        playerA.setRoom(room);
        playerB.setRoom(room);

        // Crea la partida
        Tournament_Game newGame = new Tournament_Game(playerA, playerB, level, room);
        // Añade la partida al mapa de partidas
        tournament_games.put(room, newGame);

        // Se crea un AtomicInteger que gestione los jugadores que están listos
        AtomicInteger newAtomicInteger = new AtomicInteger(0);
        // Añade el AtomicInteger al mapa de contadores
        startGame_counters.put(room, newAtomicInteger);

        // Se crea un cerrojo que gestione el paso entre los jugadores que están listos
        Lock lockForThisRoom = new ReentrantLock();
        // Añade el cerrojo al mapa de cerrojos
        startGame_locks.put(room, lockForThisRoom);

        // Devuelve la sala
        return room;
    }

    public boolean ready(int room) {
        // Definimos un booleano que controla si puede empezar
        boolean canStartGame = false;

        // Bloqueamos el acceso
        startGame_locks.get(room).lock();
        int playersReady = startGame_counters.get(room).incrementAndGet();

        // Empezamos
        if (playersReady == 2) {
            startTournamentGame(room);
            canStartGame = true;
        }

        // Desbloqueamos el acceso
        startGame_locks.get(room).unlock();

        // Devolvemos si puede empezar
        return canStartGame;
    }

    public void startTournamentGame(int room) {
        // Establece la posición de los jugadores
        tournament_games.get(room).setPlayersPosition();

        // Inicia el game loop de esa partida
        tournament_games.get(room).startGameLoop(scheduler_tournament);
    }

    public void finishTournamentGame(int room, Player winner, Player loser, boolean wasDisconnection) {
        // Si existe la partida
        if (tournament_games.containsKey(room)) {

            // Se obtienen los usuarios de los jugadores
            User winnerUser = UsersController.allUsers.get(winner.getUserName());
            User loserUser = UsersController.allUsers.get(loser.getUserName());

            // Se calculan y asignan las nuevas victorias y derrotas
            winnerUser.setWins(winnerUser.getWins() + 1);
            loserUser.setLoses(loserUser.getLoses() + 1);

            // Se calcula la diferencia de elo ganada
            float eloDifference = (loserUser.getElo() * 0.1f);
            float eloForWinner = winnerUser.getElo() + eloDifference;
            float eloForLoser = loserUser.getElo() - eloDifference;

            // Se asignan los nuevos elos en el servidor
            winnerUser.setElo(eloForWinner);
            loserUser.setElo(eloForLoser);

            // Se calculan las monedas que obtiene cada jugador
            // El ganador obtiene de base 40 y el perdedor 20
            // Además, hay una parte aleatoria entre 0 y 20 para el ganador
            // y entre 0 y 10 para el perdedor.
            Random random = new Random();
            int extraCoinsForWinner = 40 + random.nextInt(21);
            int extraCoinsForLoser = 20 + random.nextInt(11);

            // Si fue una desconexión, el perdedor no obtiene monedas
            if (wasDisconnection) {
                extraCoinsForLoser = 0;
            }

            // Se calculan las nuevas economías de ambos jugadores
            int winnerCoins = winnerUser.getCurrency() + extraCoinsForWinner;
            int loserCoins = loserUser.getCurrency() + extraCoinsForLoser;

            // Se asignan las nuevas economías
            winnerUser.setCurrency(winnerCoins);
            loserUser.setCurrency(loserCoins);

            // Creamos tres ObjectNode para guardar datos, 'msg' para el principal y
            // 'winnerPlayer' y 'loserPlayer' para los jugadores
            ObjectNode msg = mapper.createObjectNode();
            ObjectNode winnerPlayer = mapper.createObjectNode();
            ObjectNode loserPlayer = mapper.createObjectNode();

            // Winner Player
            winnerPlayer.put("userName", winner.getUserName());
            winnerPlayer.put("points", Math.round(eloForWinner));
            winnerPlayer.put("newCoins", extraCoinsForWinner);
            winnerPlayer.put("currency", winnerCoins);

            // Loser Player
            loserPlayer.put("userName", loser.getUserName());
            loserPlayer.put("points", Math.round(eloForLoser));
            loserPlayer.put("newCoins", extraCoinsForLoser);
            loserPlayer.put("currency", loserCoins);

            // Añadimos los datos al ObjectNode 'msg'
            msg.put("event", "GAME_RESULTS");
            msg.put("wasDisconnection", wasDisconnection);
            msg.put("pointsDifference", Math.round(eloDifference));
            msg.putPOJO("winner", winnerPlayer);
            msg.putPOJO("loser", loserPlayer);

            // Se les envía el mensaje a los jugadores
            try {
                // Se le envía al ganador
                synchronized (winnerUser.getSession()) {
                    winnerUser.getSession().sendMessage(new TextMessage(msg.toString()));
                }

                // Si no hubo desconexión, también al perdedor
                if (!wasDisconnection) {
                    synchronized (loserUser.getSession()) {
                        loserUser.getSession().sendMessage(new TextMessage(msg.toString()));
                    }
                }

                // Para el game loop de esa partida
                tournament_games.get(room).stopGameLoop();

                // Elimina los datos de la partida
                tournament_games.remove(room);
                startGame_counters.remove(room);
                startGame_locks.remove(room);
            } catch (Exception e) {
                // Se muestra la excepcion
                e.printStackTrace();
            }
        }
    }
}
