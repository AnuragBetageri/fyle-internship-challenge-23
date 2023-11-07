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
  constructor() {}
  ngOnInit() {
  }
}
 
