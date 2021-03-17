import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { GameScore } from "../services/firebase.service";

@Component({
  selector: 'save-score-dialog',
  templateUrl: 'save-score-dialog.component.html',
  styleUrls: ['save-score-dialog.component.scss'],
})
export class SaveScoreDialog {

  constructor(
    public dialogRef: MatDialogRef<SaveScoreDialog>,
    @Inject(MAT_DIALOG_DATA) public data: GameScore
  ) {}

  onClick(): void {
    this.dialogRef.close(this.data);
  }

  onQuoteChange(event: any) {
    this.data.quote = event;
  }

}
