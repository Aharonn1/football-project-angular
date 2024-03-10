import { Component, EventEmitter, Input, Output } from '@angular/core';
import TeamModel from 'src/app/models/team.model';
import { appConfig } from 'src/app/utils/app-config';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  ngOnInit(): void {
    this.imageSource = appConfig.playersImagesUrl + this.player.imageName;
  }

  @Input() 
  player: TeamModel;
  imageSource: string;
}