import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainCardsComponent } from './main-cards/main-cards.component';
const routes: Routes = [
  {
    path: 'userCard',
    component: MainCardsComponent,
    
  }
];

@NgModule({
  declarations: [
    MainCardsComponent,
   ],
  imports: [
    CommonModule,
  
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
