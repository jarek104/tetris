import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TetrisComponent } from './views/tetris/tetris.component';
import { GetStylePipe } from './views/tetris/get-style.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TetrisComponent,
    GetStylePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
