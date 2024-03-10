import { TasksService } from 'src/app/services/tasks.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import TableModel from 'src/app/models/table.model';
import TeamModel from 'src/app/models/team.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  players: TeamModel[];
  table: TableModel[];
  totalPrice: number;
  averageAge: number;
  tablePosition: number;
  constructor(private tasksService: TasksService) { }

  async ngOnInit() {
    this.players = await this.tasksService.getAllPlayers();
    this.tasksService.players.next(this.players);
    this.table = await this.tasksService.getTheTable();
    this.tasksService.table.next(this.table);
    this.calculateTotalAndAverage()
  }
 
  calculateTotalAndAverage() {
    this.totalPrice = this.players.reduce((acc, player) => acc + player.price, 0);
    this.averageAge = this.players.reduce((acc, player) => acc + player.age, 0) / this.players.length;
    this.averageAge = Math.round(this.averageAge);
    this.tablePosition = this.table.findIndex((table => table.name === 'Manchester United')) + 1;   
  }

  ngOnDestroy(): void { }
}