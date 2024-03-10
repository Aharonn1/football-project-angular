import { TasksService } from 'src/app/services/tasks.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import TableModel from 'src/app/models/table.model';
import TeamModel from 'src/app/models/team.model';
import { appConfig } from 'src/app/utils/app-config';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})

export class TableListComponent implements OnInit, OnDestroy {

  table: TableModel[];
  imageSource: string;
  topScores:TeamModel[];
  topAssists:TeamModel[];

  constructor(private tasksService: TasksService) { }
  async ngOnInit() {
    this.imageSource = appConfig.playersImagesUrl;
    this.table = await this.tasksService.getTheTable();
    this.tasksService.table.next(this.table);
    this.topScores =  await this.tasksService.getTopGoalScorers();
    this.topAssists = await this.tasksService.getTopAssists();
  }

  handleClick() {
    this.tasksService.getTheResult();
  }
  ngOnDestroy(): void { }
}