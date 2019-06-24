import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NewsApiService } from './news-api.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatCardModule }  from '@angular/material';
import { MatMenuModule }  from '@angular/material';
import { MatToolbarModule }  from '@angular/material';
import { MatIconModule }  from '@angular/material';
import { MatSidenavModule }  from '@angular/material';
import { MatListModule }  from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutContentComponent } from './main-layout-content/main-layout-content.component';
import { LoginComponent } from './login/login.component';
import { MainCardsComponent } from './main-cards/main-cards.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutContentComponent,
    LoginComponent,
    MainCardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule,
   AppRoutingModule,
    
  ],
  providers: [NewsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
