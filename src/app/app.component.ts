import { Component, OnDestroy } from '@angular/core';
import { DynamicComponentInjector } from './providers/dynamyc-component-injector.service';
import { AlertComponent } from './components/alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'swapiApp';

  constructor(private dynamicComponentInjector: DynamicComponentInjector) {
    this.dynamicComponentInjector.inject(AlertComponent);
  }

  ngOnDestroy(): void {
    this.dynamicComponentInjector.destroy();
  }
}
