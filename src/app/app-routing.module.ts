import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import {SingleNewsComponent} from './single-news/single-news.component';

const routes: Routes = [
  {path: 'news', component: NewsComponent},
  {path: 'news/:id', component: SingleNewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
