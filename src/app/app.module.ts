import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [HomeComponent],
})
export class AppModule {}
