import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TetrisComponent } from './views/tetris/tetris.component';

const routes: Routes = [
  { path: 'tetris', component: TetrisComponent },
  { path: '', redirectTo: '/tetris', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
