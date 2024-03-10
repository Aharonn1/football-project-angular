export class AppConfig {
    playersUrl = "http://localhost:4023/api/players/";
    awayTeamUrl = "http://localhost:4023/api/awayTeam/";
    statisticsUrl = "http://localhost:4023/api/statistics/";
    topPlayerGoalsUrl = "http://localhost:4023/api/topPlayers/";
    topPlayerAssistsUrl = "http://localhost:4023/api/topAssists/";
    tableUrl = "http://localhost:4023/api/table/";
    countriesUrl = "http://localhost:4023/api/country/";
    taskByTaskUrl = "http://localhost:4023/api/players-per-player/";
    playersImagesUrl = "http://localhost:4023/api/players/images/";
    tableImagesUrl = "http://localhost:4023/api/table/images/";
}

export const appConfig = new AppConfig();