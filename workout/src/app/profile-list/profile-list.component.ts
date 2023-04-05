import { AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProfileData } from '../profileData';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileService } from '../services/profile.service';


const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements AfterViewInit {
    displayedColumns: string[] = ['firstname','lastname', 'height', 'weight', 'goal','action'];
    dataSource: MatTableDataSource<ProfileData>;
  
    @ViewChild(MatPaginator)
  paginator!: MatPaginator;
    @ViewChild(MatSort)
  sort!: MatSort;
  
    constructor(
      private dialog: MatDialog,
      private profileList : ProfileService
      ) {

      const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
  
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    getProfileList() {
      this.profileList.getProfileList().subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: console.log,
      });
    }
  
    openEditForm(profile: ProfileData){
      const dialogRef = this.dialog.open(ProfileComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val){
            this.getProfileList();
          }
        }
      })
    }

    deleteProfile(profile: ProfileData){

    }
  }
  
  /** Builds and returns a new User. */
  function createNewUser(id: number): ProfileData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';
  
    return {
      firstname: name,
      weight: Math.round(Math.random() * 100),
      lastname: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
      height: Math.round(Math.random()*100),
      trainingGoal: "masa"
    };
  }