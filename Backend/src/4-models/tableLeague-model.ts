import { UploadedFile } from "express-fileupload";

class TableModel {
    teamId: number;
    name: string;
    imageName: string;
    image: UploadedFile;
    games: number;
    wins: number;
    loses: number;
    points: number;
    goals: number;
    draw: number;
    homeTeam: number;
    awayTeam: number;
    lastGames: string;
    tablePosition: number;

    constructor(table: TableModel) {
        this.teamId = table.teamId;
        this.name = table.name;
        this.imageName = table.imageName;
        this.image = table.image;
        this.games = table.games;
        this.wins = table.wins;
        this.loses = table.loses;
        this.points = table.points;
        this.goals = table.goals;
        this.draw = table.draw;
        this.awayTeam = table.awayTeam;
        this.homeTeam = table.homeTeam;
        this.lastGames = table.lastGames;
        this.tablePosition = table.tablePosition;
    }
}
export default TableModel;