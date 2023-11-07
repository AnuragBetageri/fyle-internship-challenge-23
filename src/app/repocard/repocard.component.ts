import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { repos } from '../shared/repos.model';
import { delay } from 'rxjs';
@Component({
  selector: 'app-repocard',
  templateUrl: './repocard.component.html',
  styleUrls: ['./repocard.component.scss'],
})
export class RepocardComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  repomodel: repos[] = [];

  username: string = 'Anurag';

  page_number: number = 1;
  per_page: number = 10;
  loopArray: any[] = Array(this.per_page).fill(0);
  repos_data: any;
  langs: any[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.repomodel = this.apiService.reposs;

    this.loadrepo(this.page_number, this.per_page);

    this.apiService.userSelected.subscribe((name: string) => {
      this.username = name;
      this.loadrepo(this.page_number, this.per_page);
    });
  }

  refreshRepo(perpagecount: HTMLInputElement) {
    this.page_number = 1;

    this.per_page = parseInt(perpagecount.value, 10);

    this.loadrepo(this.page_number, this.per_page);
  }

  nextPage() {
    if (this.page_number < this.apiService.userdata[0].public_repos + 1) {
      this.page_number++;
      this.loadrepo(this.page_number, this.per_page);
    }
  }
  prePage() {
    this.page_number--;
    if (this.page_number > 0) {
      this.loadrepo(this.page_number, this.per_page);
    }
  }

  loadrepo(page_n: number, per_p: number) {
    // get Repo data and languages used in those repo and bundle them in repos.model(for better data maintaince)

    this.loading = true;
    this.apiService.reposs.length = 0;
    this.apiService
      .getRepo(this.username, page_n, per_p)
      .pipe(delay(1000))
      .subscribe((data) => {
        this.repos_data = data;
        this.loading = false;
        this.repos_data.forEach((repo: any) => {
          this.apiService.getLang(repo).subscribe((data) => {
            this.langs = Object.keys(data);
            this.apiService.stackrepos(repo, this.langs);
          });
        });
      });
  }
}
