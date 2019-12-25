import { RequestModel } from './../models/request.interface';
import { StarshipModel } from './../models/starship.interface';
import { AlertService } from './../../providers/alert.service';
import { SwapiService } from './../../providers/swapi.service';
import { AlertComponent } from './../alert/alert.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserComponent } from './browser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from '../login/login.component';
import { CardComponentComponent } from '../card-component/card-component.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as moment from 'moment';

describe('BrowserComponent', () => {
    let component: BrowserComponent;
    let fixture: ComponentFixture<BrowserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, BrowserComponent, LoginComponent, CardComponentComponent, AlertComponent],
            imports: [
                AppRoutingModule,
                BrowserModule,
                FormsModule,
                HttpClientModule,
                MatButtonModule,
                MatCheckboxModule,
                MatDatepickerModule,
                MatInputModule,
                MatNativeDateModule,
                MatProgressSpinnerModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ],
            providers: [SwapiService, AlertService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BrowserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Calculate stops by Item', () => {
        let starship: StarshipModel = {
            name: 'Millennium Falcon',
            model: 'YT-1300 light freighter',
            manufacturer: 'Corellian Engineering Corporation',
            cost_in_credits: '100000',
            length: 34.37,
            max_atmosphering_speed: '1050',
            crew: '4',
            passengers: 6,
            cargo_capacity: 100000,
            consumables: '2 months',
            hyperdrive_rating: '0.5',
            MGLT: 75,
            starship_class: 'Light freighter',
            pilots: [
                'https://swapi.co/api/people/13/',
                'https://swapi.co/api/people/14/',
                'https://swapi.co/api/people/25/',
                'https://swapi.co/api/people/31/'
            ],
            films: [
                'https://swapi.co/api/films/2/',
                'https://swapi.co/api/films/7/',
                'https://swapi.co/api/films/3/',
                'https://swapi.co/api/films/1/'
            ],
            created: '2014-12-10T16:59:45.094000Z',
            edited: '2014-12-22T17:35:44.464156Z',
            url: 'https://swapi.co/api/starships/10/'
        };
        component.search = component['initialize']();
        const currentDate = new Date();
        (component.search.controls.startDate.value as Date) = currentDate;
        (component.search.controls.mglt.value as number) = 1000000;
        const response = component['calculateStopsByItem'](starship);
        expect(response).toBe(9);
    });

    it('find ships', async () => {
        const response: StarshipModel[] = (await component['findShips']()) as any;
        expect(response.length).toBeGreaterThan(0);
    });

    it('check split date', () => {
        const splitResponse: Date = component['splitDate'](moment(new Date()), '2 months').toDate();
        expect(splitResponse instanceof Date).toBe(true);
    });
});
