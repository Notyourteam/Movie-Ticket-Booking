import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'table', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
