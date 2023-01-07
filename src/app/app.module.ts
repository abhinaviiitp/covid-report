import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgmaterialModule } from './ngmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StateWiseComponent } from './state-wise/state-wise.component';
import { AgGridModule } from 'ag-grid-angular';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { NationalWiseComponent } from './national-wise/national-wise.component';

@NgModule({
  declarations: [
    AppComponent,
    StateWiseComponent,
    NationalWiseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule,
    AgChartsAngularModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgmaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
