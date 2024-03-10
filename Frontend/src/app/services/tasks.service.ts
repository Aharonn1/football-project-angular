import { PlayersActionType, playersStore } from '../redux/team-state';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../utils/app-config';
import TableModel from '../models/table.model';
import TeamModel from '../models/team.model';
import { Injectable } from '@angular/core';
import notify from '../utils/notify';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }
  players = new BehaviorSubject<any[]>([]);
  table = new BehaviorSubject<any[]>([]);

  async getAllPlayers(): Promise<TeamModel[]> {
    let players = playersStore.getState().players;
    try {
      if (players.length === 0) {
        const observable = this.http.get<TeamModel[]>(appConfig.playersUrl)
        players = await firstValueFrom(observable)
        playersStore.dispatch({ type: PlayersActionType.FetchPlayers, payload: players })
      }
    }
    catch (err: any) {
      notify.error(err.message)
    }
    return players;
  }

  async getTopGoalScorers(): Promise<TeamModel[]> {
    let players = playersStore.getState().topPlayersGoals;
    try {
      if (players.length === 0) {
        const observable = this.http.get<TeamModel[]>(appConfig.topPlayerGoalsUrl)
        players = await firstValueFrom(observable)
        playersStore.dispatch({ type: PlayersActionType.FetchTopPlayers, payload: players })
      }
    }
    catch (err: any) {
      notify.error(err.message)
    }
    return players;
  }

  async getTopAssists(): Promise<TeamModel[]> {
    let players = playersStore.getState().topPlayersAssists;
    try {
      if (players.length === 0) {
        const observable = this.http.get<TeamModel[]>(appConfig.topPlayerAssistsUrl)
        players = await firstValueFrom(observable)
        playersStore.dispatch({ type: PlayersActionType.FetchTopAssists, payload: players })
      }
    }
    catch (err: any) {
      notify.error(err.message)
    }
    return players;
  }

  async getTheTable(): Promise<TableModel[]> {
    let table = playersStore.getState().table;
    try {
      if (table.length === 0) {
        const observable = this.http.get<TableModel[]>(appConfig.tableUrl)
        table = await firstValueFrom(observable)
        playersStore.dispatch({ type: PlayersActionType.FetchTable, payload: table })
      }
    }
    catch (err: any) {
      notify.error(err.message)
    }
    return table;
  }

  async deletePlayer(playerId: number): Promise<void> {
    try {
      const observable = await this.http.delete(appConfig.playersUrl + playerId);
      await firstValueFrom(observable)
      playersStore.dispatch({ type: PlayersActionType.DeletePlayer, payload: playerId })
    } catch (err: any) {
      notify.error(err.message)
    }
  }

  getTheResult() {
    let table = playersStore.getState().table;
    let players1 = playersStore.getState().topPlayersGoals;
    let players2 = playersStore.getState().topPlayersAssists;
    const allItems = [...table]; // Important: use this.table to access the component's property
    allItems.sort(() => Math.random() - 0.5);
    let winners = [];
    let losers = [];

    for (let i = 0; i < allItems.length; i++) {
      const alreadyWon = winners.some((winner) => winner.teamId === allItems[i].teamId);
      const alreadyLost = losers.some((loser) => loser.teamId === allItems[i].teamId);

      if (!alreadyWon && !alreadyLost) {
        if (i < 10 && allItems[i].games <= 37) {
          // if ("Manchester United" === allItems[i].name)
          //   console.log(allItems[i])
          allItems[i].awayTeam = 0;
          allItems[i].homeTeam = 0;
          allItems[i].goals = 3;
          const randomNumber = Math.floor(Math.random() * 3);
          allItems[i].goals += randomNumber;
          allItems[i].awayTeam = winners.push(allItems[i])
        } else if (allItems[i].games <= 37) {
          // if ("Manchester United" === allItems[i].name)
          //   console.log(allItems[i])
          allItems[i].awayTeam = 0;
          allItems[i].homeTeam = 0;
          allItems[i].goals = 2;
          const randomNumber = Math.floor(Math.random() * 3);
          allItems[i].goals -= randomNumber
          allItems[i].homeTeam = losers.push(allItems[i]);
        }
      }
    }
    for (const winner of winners) {
      if (winner.games <= 37) {
        winner.points += 3;
        winner.wins += 1;
        winner.lastGames += "✔"
      }
    }

    for (const loser of losers) {
      if (loser.games <= 37) {
        loser.loses += 1;
        loser.lastGames += "❌"
      }
    }

    for (const game of table) {
      if (game.games <= 37) {
        game.games += 1;
      }
    }

    const scoredPlayer1 = players1[Math.floor(Math.random() * players1.length)];
    const scoredPlayer2 = players1[Math.floor(Math.random() * players1.length)];
    const assistPlayer1 = players2[Math.floor(Math.random() * players2.length)];
    const assistPlayer2 = players2[Math.floor(Math.random() * players2.length)];

    let actionExecuted = false;

    for (let i = 18; i < allItems.length; i++) {
      if (allItems[i].games <= 37 && !actionExecuted) {
        scoredPlayer1.goals += 1;
        scoredPlayer2.goals += 1;
        assistPlayer1.assists += 1;
        assistPlayer2.assists += 1;
        actionExecuted = true;
      }
    }
    table.sort((a, b) => b.points - a.points);
  }

  calculateTotalAndAverage() {
    let table = playersStore.getState().table;
    let players = playersStore.getState().players;
    const allItems = [...table]; // Important: use this.table to access the component's property

    const scoredPlayer1 = players[Math.floor(Math.random() * players.length)];
    const scoredPlayer2 = table[Math.floor(Math.random() * table.length)];
    let actionExecuted = false;
    for (let i = 18; i < allItems.length; i++) {
      if (allItems[i].games <= 37 && !actionExecuted) {
        scoredPlayer1.totalPrice = players.reduce((acc, player) => acc + player.price, 0);
        scoredPlayer1.averageAge = players.reduce((acc, player) => acc + player.age, 0) / players.length;
        console.log(scoredPlayer1.totalPrice)
        console.log(scoredPlayer1.averageAge)
        scoredPlayer2.tablePosition = table.findIndex((table => table.name === 'Manchester United')) + 1;
        console.log(scoredPlayer2.tablePosition)
        actionExecuted = true;
      }
    }

  }
}