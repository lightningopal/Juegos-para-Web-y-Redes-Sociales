package es.LightningOpal.Astral_Knock_Out;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

public class GamesManager {
    // Singleton
    public static GamesManager INSTANCE = new GamesManager();

    private ScheduledExecutorService scheduler_spaceGym = Executors.newScheduledThreadPool(1);

    private Map<Player, SpaceGym_Game> spaceGym_games = new ConcurrentHashMap<>();

    private GamesManager()
    {

    }

    public void startSpaceGym(Player thisPlayer)
    {
        SpaceGym_Game newGame = new SpaceGym_Game(thisPlayer);
        newGame.startGameLoop(scheduler_spaceGym);
        spaceGym_games.put(thisPlayer, newGame); // Yo haría el mapa con <roomId, SpaceGtm_Game> (Mario)
    }

    public void stopSpaceGym(Player thisPlayer)
    {
        SpaceGym_Game gameToStop = spaceGym_games.get(thisPlayer);
        gameToStop.stopGameLoop();
        spaceGym_games.remove(thisPlayer);
    }
}
