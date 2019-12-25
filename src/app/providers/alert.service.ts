import { Injectable } from '@angular/core';
import { AlertModel } from '../components/models/alert.interface';
import { Subject } from 'rxjs';
import { DynamicComponentInjector } from './dynamyc-component-injector.service';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable()
export class AlertService {
    public alertEmmiter: Subject<AlertModel>;

    constructor() {
        this.alertEmmiter = new Subject<AlertModel>();
    }

    public launchAlert(aletModel: AlertModel): void {
        this.alertEmmiter.next(aletModel);
    }
}