import { Routes } from '@angular/router';
import {LayoutComponent} from './core/components/layout/layout';
import {HomeComponent} from './core/components/home/home';
import {DiagnosticService} from './diagnostics/components/services/diagnostic.service';
import {DiagnosticFormComponent} from './diagnostics/components/diagnostic-form/diagnostic-form';
import {DiagnosticResultComponent} from './diagnostics/components/diagnostic-result/diagnostic-result';
import {LoginComponent} from './core/components/login/login';
import {RegisterComponent} from './core/components/register/register';
import {InformationsComponent} from './core/components/informations/informations';
export const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'diagnostic', component: DiagnosticFormComponent },
      { path: 'diagnostic-result', component: DiagnosticResultComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'informations', component: InformationsComponent },
    ]
  }
];
