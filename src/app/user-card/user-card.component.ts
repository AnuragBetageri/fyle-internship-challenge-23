import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{

  constructor(private apiService: ApiService) {}

  user: any;
  username: string = 'Anurag';

  page_number: number = 1;
  per_page: number = 10;

  repos_data: any;
  langs: any[] = [];

  flag: boolean = false;


  loader :boolean = true;


ngOnInit(): void {
    
  this.user = this.apiService.userdata;
  console.log("helooooooooooooooooooooo");
  console.log(this.user);
  console.log('jjjjjjj');
  this.loaduser();
  console.log(this.loader)
}

search(searchvalue: HTMLInputElement) {
  this.flag = false;
  this.loader = true;

  // this.apiService.reposs.length = 0;
  this.apiService.userdata.length = 0;
  this.username = searchvalue.value;
  this.loaduser();

 this.apiService.userSelected.emit(this.username);
  // this.loadrepo(this.page_number, this.per_page);
}

loaduser() {
  this.loader = true;
  this.apiService.loading.subscribe(
    (data :boolean)=>
    {
      this.loader = data;
      console.log(this.loader)
    }
  )

  this.apiService.getUser(this.username).pipe((delay(1000))).subscribe(
    (data :any) => {
     
      console.log(data);
      this.apiService.addUserData(data);
      // this.apiService.userdata = data;
      this.loader = false;
    },
    (error: any) => {
      this.loader = false;
      this.flag = true;
    }
  );
  

}

}
