import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { repos } from './shared/repos.model';

import './shared/repos.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  username: string = 'Anurag';

  page_number: number = 1;
  per_page: number = 10;

  repos_data: any;
  langs: any[] = [];

  flag: boolean = true;
  ngOnInit() {

    // this.loadrepo(this.page_number, this.per_page);
  }
}
 
