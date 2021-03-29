import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { NgModule } from '@angular/core';
import { OrdinalPipe } from './views/tetris/pipes/ordinal-numbers.pipe';
import { SaveScoreDialog } from './shared/save-score-dialog.component';
import { SharedModule } from './shared/shared.module';
import { TetrisComponent } from './views/tetris/tetris.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TetrisComponent,
    SaveScoreDialog,
    OrdinalPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  entryComponents: [SaveScoreDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
