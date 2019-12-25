import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BrowserComponent } from './components/browser/browser.component';
import { ROUTES } from './app.constants';
import { ExistUser } from './providers/existUser';


const routes: Routes = [
  {
    path: ROUTES.LOGIN,
    component: LoginComponent
  },
  {
    path: ROUTES.BROWSER,
    component: BrowserComponent,
    canActivate: [ExistUser]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTES.LOGIN
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
