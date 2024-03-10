import { Component } from '@angular/core';
import TableModel from 'src/app/models/table.model';
import { TasksService } from 'src/app/services/tasks.service';
import { appConfig } from 'src/app/utils/app-config';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent {
  table: TableModel[];
  awayTeam: TableModel[];
  homeTeam: TableModel[];
  imageSource: string;
 
  constructor(private tasksService: TasksService) { }
 
  async ngOnInit() {
    this.imageSource = appConfig.playersImagesUrl;
    this.table = await this.tasksService.getTheTable();
    this.tasksService.table.next(this.table);
    this.awayTeam = this.table.filter(team => team.goals >= 3);
    this.homeTeam = this.table.filter(team => team.goals < 3);
  }
}