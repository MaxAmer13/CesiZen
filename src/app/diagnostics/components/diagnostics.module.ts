import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagnosticFormComponent} from './diagnostic-form/diagnostic-form';
import { DiagnosticResultComponent} from './diagnostic-result/diagnostic-result';

const routes: Routes = [
  { path: '', component: DiagnosticFormComponent },
  { path: 'result', component: DiagnosticResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagnosticsRoutingModule {}
