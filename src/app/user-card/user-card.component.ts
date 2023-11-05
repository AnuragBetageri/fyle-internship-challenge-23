import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{

  constructor(private apiService: ApiService) {}

  user: any;


ngOnInit(): void {
    
  this.user = this.apiService.userdata;
  console.log("helooooooooooooooooooooo");
  console.log(this.user);
  console.log('jjjjjjj');
  

}

}
