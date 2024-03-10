import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { TaskListComponent } from './components/tasks-area/data-list/task-list.component';
import { TableListComponent } from './components/tasks-area/table-list/table-list.component';
import { StatisticsComponent } from './components/tasks-area/statistics/statistics.component';
import { ScoreboardComponent } from './components/tasks-area/scoreboard/scoreboard.component';

const routes: Routes = [
  {path: "players", component: TaskListComponent},
  {path: "statistics", component: StatisticsComponent},
  {path: "scoreboard", component: ScoreboardComponent},
  {path: "table", component: TableListComponent},
  {path:"**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
