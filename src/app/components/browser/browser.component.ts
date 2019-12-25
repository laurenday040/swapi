import { AlertService } from 'src/app/providers/alert.service';
import { animate, trigger, transition, query, style, stagger } from '@angular/animations';
import { COMMON, BROWSER, ERROR, ALERT_MSG, DATE, ALERT_TYPE, ROUTES } from '../../app.constants';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IsNumber } from '../../validators/is-number.validator';
import { RequestModel } from './../models/request.interface';
import { Router } from '@angular/router';
import { StarshipModel } from '../models/starship.interface';
import { SwapiService } from '../../providers/swapi.service';
import { UserSingleton } from '../../providers/user.service';
import * as moment from 'moment';

@Component({
    selector: 'app-browser',
    templateUrl: './browser.component.html',
    styleUrls: ['./browser.component.scss'],
    animations: [
        trigger('filterAnimation', [
            transition('* => *', [
                // each time the binding value changes
                query(
                    ':enter',
                    [
                        style({ transform: 'translateY(-30px)', opacity: 0 }),
                        stagger(80, [
                            animate(250, style({ transform: 'translateY(+10px) translateX(0%)', opacity: 1 })),
                            animate(250, style({ transform: 'translateY(0%) translateX(0%)', opacity: 1 }))
                        ])
                    ],
                    { optional: true }
                )
                // query(':leave', [
                //   stagger(80, [
                //     animate(250, style({ transform: 'translateX(-100%)', opacity: 0 }))
                //   ])
                // ], { optional: true })
            ])
        ])
    ]
})
export class BrowserComponent implements OnInit {
    public COMMON = COMMON;
    public BROWSER = BROWSER;
    public ERROR = ERROR;
    public username = UserSingleton.getInstance().getUsername();
    public shipsList: StarshipModel[];
    public viewStatus = {
        loading: false,
        error: false
    };
    public startDate = new Date(1990, 0, 1);
    public search: FormGroup;
    public user: string = UserSingleton.getInstance().getUsername();

    constructor(private swapiService: SwapiService, private alertService: AlertService, private router: Router) {
        this.search = this.initialize();
    }

    ngOnInit() {
        // this.componentInjector.inject(AlertComponent);
    }

    public exit() {
        UserSingleton.getInstance().setUsername(null);
        this.router.navigate(['/'.concat(ROUTES.LOGIN)]);
    }

    public async calculate() {
        this.search.valid ? (this.shipsList = await this.findShips()) : null;
    }

    private initialize(): FormGroup {
        return new FormGroup({
            startDate: new FormControl('', Validators.required),
            mglt: new FormControl('', [Validators.required, IsNumber])
        });
    }

    private async findShips(): Promise<StarshipModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                this.viewStatus.loading = true;
                let shipsList: RequestModel<StarshipModel>;
                shipsList = await this.swapiService.getStarships().toPromise();
                shipsList.results = (await this.swapiService.getStarships().toPromise()).results.map((item) => {
                    item.stops = this.calculateStopsByItem(item);
                    return item;
                });
                this.viewStatus.loading = false;
                resolve(shipsList.results);
            } catch (e) {
                this.alertService.launchAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Failed connection',
                    position: '',
                    time: null
                });
                this.viewStatus.loading = false;
                reject(null);
            }
        });
    }

    private calculateStopsByItem(item: StarshipModel): number {
        //Selected Date to moment
        let initDate: moment.Moment = moment(this.search.controls.startDate.value);
        //build finish consumables date
        let finishConsumable: moment.Moment = this.splitDate(initDate, item.consumables);
        //convert dif date between init date and finish date in hours and multiply mglt starship value
        //that value bring us total distance with one consumable storage
        let consumableHours: number = moment(finishConsumable).diff(moment(initDate), 'hours') * item.MGLT;

        return Number((this.search.controls.mglt.value / consumableHours).toFixed(0));
    }

    private splitDate(initDate: moment.Moment, consumableTime: string): moment.Moment {
        let response: moment.Moment;
        let type: string = consumableTime.split(' ')[1];
        let num: number = Number(consumableTime.split(' ')[0]);

        switch (type) {
            case DATE.YEAR:
            case DATE.YEARS:
                response = moment(initDate).add(num, DATE.YEARS as any);
                break;
            case DATE.MONTH:
            case DATE.MONTHS:
                response = moment(initDate).add(num, DATE.MONTHS as any);
                break;
            case DATE.WEEK:
            case DATE.WEEKS:
                response = moment(initDate).add(num, DATE.WEEKS as any);
                break;
            case DATE.DAY:
            case DATE.DAYS:
                response = moment(initDate).add(num, DATE.DAYS as any);
                break;
        }

        return response;
    }
}
