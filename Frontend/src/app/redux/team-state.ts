import { createStore } from "redux";
import TeamModel from "../models/team.model";
import TableModel from "../models/table.model";

export class PlayersState {
    players: TeamModel[] = [];
    topPlayersGoals: TeamModel[] = [];
    topPlayersAssists: TeamModel[] = [];
    table: TableModel[] = [];
    awayTable: TableModel[] = [];
}

export enum PlayersActionType {
    FetchPlayers = "FetchPlayers",
    FetchTopAssists = "FetchTopAssists",
    FetchTopPlayers = "FetchTopPlayers",
    FetchTable = "FetchTable",
    AwayTeam = "AwayTeam",
    DeletePlayer = "DeletePlayer",
}

export interface PlayersAction {
    type: PlayersActionType;
    payload: any
}

export function playersReducer(currentState = new PlayersState(), action: PlayersAction): PlayersState {
    const newState = { ...currentState };

    switch (action.type) {
        case PlayersActionType.FetchPlayers:
            newState.players = action.payload;
            break;

        case PlayersActionType.FetchTopPlayers:
            if (action.payload.length > 0) {
                const topPlayers = action.payload.sort((a: { goals: number; }, b: { goals: number; }) => b.goals - a.goals);
                const top5Players = topPlayers.slice(0, 5);
                return {
                    ...currentState,
                    topPlayersGoals: top5Players,
                };
            }
            break;

        case PlayersActionType.FetchTopAssists:
            if (action.payload.length > 0) {
                const topPlayers = action.payload.sort((a: { assists: number; }, b: { assists: number; }) => b.assists - a.assists);
                const top5Players = topPlayers.slice(0, 5);
                return {
                    ...currentState,
                    topPlayersAssists: top5Players,
                };
            }
            break;
        

        case PlayersActionType.FetchTable:
            newState.table = action.payload;
            break;

        case PlayersActionType.DeletePlayer:
            const indexToDelete = newState.players.findIndex(t => t.playerId === action.payload)
            if (indexToDelete >= 0) {
                newState.players.splice(indexToDelete, 1)
            }
            break;
    }
    return newState;
}
export const playersStore = createStore(playersReducer);