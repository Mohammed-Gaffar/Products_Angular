import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';
import { ProductCreateComponent } from './product/components/product-create/product-create.component';
import { ProductDetailsComponent } from './product/components/product-details/product-details.component';
import { TestCreateComponent } from './Testcomp/test-create/test-create.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'test', component: TestCreateComponent },
  { path: '**', redirectTo: '/dashboard' }
];