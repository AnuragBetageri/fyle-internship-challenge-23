import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { RepocardComponent } from './repocard/repocard.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RepocardComponent,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSkeletonLoaderModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
