import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { BrowserComponent } from '../browser/browser.component';
import { CardComponentComponent } from '../card-component/card-component.component';
import { AlertComponent } from '../alert/alert.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, BrowserComponent, LoginComponent, CardComponentComponent, AlertComponent],
            imports: [
                AppRoutingModule,
                BrowserModule,
                FormsModule,
                MatButtonModule,
                MatCheckboxModule,
                MatDatepickerModule,
                MatInputModule,
                MatNativeDateModule,
                MatProgressSpinnerModule,
                ReactiveFormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Reload() should not throw a exception', () => {
        expect(component.reload()).toBeUndefined();
    });
    it('animationManagement should not throw a exception', () => {
        expect(component['animationManagement']()).toBeUndefined();
    });


});
