import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import { TaskCardComponent } from './components/tasks-area/task-card/task-card.component';
import { TaskListComponent } from './components/tasks-area/data-list/task-list.component';
import { TableListComponent } from './components/tasks-area/table-list/table-list.component';
import { StatisticsComponent } from './components/tasks-area/statistics/statistics.component';
import { ScoreboardComponent } from './components/tasks-area/scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PageNotFoundComponent,
    TaskCardComponent,
    TaskListComponent,
    TableListComponent,
    StatisticsComponent,
    ScoreboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [LayoutComponent]
 
})
export class AppModule { }
