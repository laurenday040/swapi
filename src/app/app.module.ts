import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { BrowserComponent } from './components/browser/browser.component';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwapiService } from './providers/swapi.service';
import { HttpClientModule } from '@angular/common/http';
import { CardComponentComponent } from './components/card-component/card-component.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertComponent } from './components/alert/alert.component';
import { DynamicComponentInjector } from './providers/dynamyc-component-injector.service';
import { AlertService } from './providers/alert.service';
import { ExistUser } from './providers/existUser';
@NgModule({
    declarations: [AppComponent, BrowserComponent, LoginComponent, CardComponentComponent, AlertComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule
    ],
    providers: [SwapiService, DynamicComponentInjector, AlertService, ExistUser],
    entryComponents: [AlertComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
