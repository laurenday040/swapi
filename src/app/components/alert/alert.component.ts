import { Component, OnInit, Inject, Input } from '@angular/core';
import { AlertModel } from '../models/alert.interface';
import { AlertService } from '../../providers/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public alertModel: AlertModel;

  constructor(private alertService: AlertService) {
    this.alertService.alertEmmiter.subscribe(
      data => {
        console.log("ALERT-COMPONENT:", data)
        this.alertModel = data;
      }
    )
  }

  ngOnInit() {
  }

  public close() {
    this.alertModel = null;
  }

}
