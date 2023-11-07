import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  user: any;
  username: string = 'Anurag';
  repos_data: any;
  flag: boolean = false;
  loader: boolean = true;

  ngOnInit(): void {
    this.user = this.apiService.userdata;
    this.loaduser();
  }

  search(searchvalue: HTMLInputElement) {
    this.flag = false;
    this.loader = true;
    this.apiService.userdata.length = 0;
    this.username = searchvalue.value;
    this.loaduser();
    this.apiService.userSelected.emit(this.username);
  }

  loaduser() {
    this.loader = true;
    this.apiService
      .getUser(this.username)
      .pipe(delay(500))
      .subscribe(
        (data: any) => {
          this.apiService.addUserData(data);
          this.loader = false;
        },
        (error: any) => {
          this.loader = false;
          this.flag = true;
        }
      );
  }
}
