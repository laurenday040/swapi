import { Component, OnInit, Input } from '@angular/core';
import { StarshipModel } from '../models/starship.interface';
import { DATE, COMMON, STAR_SHIP } from '../../app.constants';

@Component({
    selector: 'app-card-component',
    templateUrl: './card-component.component.html',
    styleUrls: ['./card-component.component.scss']
})
export class CardComponentComponent implements OnInit {
    @Input('item') item: StarshipModel;
    public COMMON = COMMON;
    public STAR_SHIP = STAR_SHIP;

    private dateConst = DATE;

    constructor() {}

    ngOnInit() {}
}
