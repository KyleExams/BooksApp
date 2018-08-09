import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: 'home', component: HomeComponent },
    //{ path: 'pantry/:id', component: PantryComponent },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      NgxPaginationModule,
      ToastrModule.forRoot(),
      RouterModule.forRoot(
          appRoutes,
          //{ enableTracing: true } // <-- debugging purposes only
      )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
