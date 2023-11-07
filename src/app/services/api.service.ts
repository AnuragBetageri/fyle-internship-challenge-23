import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { repos } from '../shared/repos.model';
import { user } from '../shared/userdata.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
    // console.log(this.httpClient.get(`https://api.github.com/users`));
  }

  base_url = 'https://api.github.com/users/';
  reposs: repos[] = [];
  userdata: user[] = [];
  selected_data: any;
  userSelected = new EventEmitter<any>();
  //services to get data (name , repo list , repo languages)
  getUser(githubUsername: string) {
    this.selected_data = this.httpClient.get(this.base_url + githubUsername);
    return this.selected_data;
  }
  getRepo(githubUsername: string, page_number: number, per_page: Number) {
    console.log(per_page + 'hrlloo +' + page_number);
    return this.httpClient.get(
      `${
        this.base_url + githubUsername
      }/repos?per_page=${per_page}&page=${page_number}`
    );
  }
  getLang(repo: any) {
    return this.httpClient.get(
      `https://api.github.com/repos/${repo.full_name}/languages`
    );
  }

  //Strcturing the REPO DATA
  stackrepos(repos_data: any, langs: any[]) {
    this.reposs.push(
      new repos(
        repos_data.name,
        repos_data.forks,
        repos_data.visibility,
        repos_data.url,
        repos_data.watchers_count,
        langs,
        repos_data.description
      )
    );
  }

  addUserData(data: any) {
    this.userdata.push(
      new user(
        data.name,
        data.login,
        data.avatar_url,
        data.bio,
        data.html_url,
        data.followers,
        data.following,
        data.public_repos,
        data.twitter_username
      )
    );
  }
}
