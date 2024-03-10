import { Component, OnDestroy, OnInit } from '@angular/core';
import TeamModel from 'src/app/models/team.model';
import { TasksService } from 'src/app/services/tasks.service';
import { appConfig } from 'src/app/utils/app-config';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  topScores: TeamModel[];
  topAssists: TeamModel[];
  imageSource:string;

  constructor(private tasksService: TasksService) { }

  async ngOnInit() {
    this.imageSource = appConfig.playersImagesUrl;
    this.topScores = await this.tasksService.getTopGoalScorers();
    this.topAssists = await this.tasksService.getTopAssists();
    this.topAssists.sort((a, b) => b.assists - a.assists);
    this.topScores.sort((a, b) => b.goals - a.goals);
  }
  
  ngOnDestroy(): void { }
}