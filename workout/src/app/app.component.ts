import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ProfileComponent } from './profile/profile.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workout';
  constructor(private dialog: MatDialog){}
  openProfile(){
      this.dialog.open(ProfileComponent)
  }
}
