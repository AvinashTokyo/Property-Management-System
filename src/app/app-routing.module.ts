import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyManagementComponent } from './property-management/property-management.component';

const routes: Routes = [
  {
    path: '', component: PropertyManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
