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
    this.loaduser();

    this.loadrepo(this.page_number, this.per_page);
  }

  search(searchvalue: HTMLInputElement) {
    this.flag = true;
    // this.apiService.reposs.length = 0;
    this.apiService.userdata.length = 0;
    this.username = searchvalue.value;
    this.loaduser();

    this.loadrepo(this.page_number, this.per_page);
  }

  refreshRepo(perpagecount : HTMLInputElement)
  {

    this.page_number =1;
    
    this.per_page = parseInt(perpagecount.value, 10);
    console.log(this.per_page)
    // this.apiService.reposs.length = 0;

    this.loadrepo(this.page_number, this.per_page);

  }

  nextPage( ) {
   if( this.page_number < this.apiService.userdata[0].public_repos + 1  )
   {
    this.page_number++;
    this.loadrepo(this.page_number, this.per_page);
   }

  }
  prePage( ) {
    // this.apiService.reposs.length = 0;

    this.page_number--;
    if( this.page_number > 0)
    {
      this.loadrepo(this.page_number, this.per_page);
    }
   
    

  }

  loaduser() {
    this.apiService.getUser(this.username).subscribe(
      (data) => {
        console.log(data);
        this.apiService.addUserData(data);
        // this.apiService.userdata = data;
      },
      (error: any) => {
        this.flag = false;
      }
    );
  }
  loadrepo(page_n: number, per_p: number) {
    // get Repo data and languages used in those repo and bundle them in repos.model(for better data maintaince)
    this.apiService.reposs.length = 0;
    this.apiService
      .getRepo(this.username, page_n, per_p)
      .subscribe((data) => {
        this.repos_data = data;
        console.log(this.repos_data);
        console.log('hellooo')

        this.repos_data.forEach((repo: any) => {
          this.apiService.getLang(repo).subscribe((data) => {
            this.langs = Object.keys(data);
            console.log(this.langs);
            this.apiService.stackrepos(repo, this.langs);
          });
        });
      });
  }
}
