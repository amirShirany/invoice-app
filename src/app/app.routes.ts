import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginPage } from './PAGES/login/login.page';
import { InvoicePage } from './PAGES/invoice/invoice.page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'invoice', component: InvoicePage, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
