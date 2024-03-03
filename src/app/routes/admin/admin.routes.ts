import { Routes } from '@angular/router';
import { AdminListPageComponent } from './adminPageList/adminListPage.component';
import { AdminCreatePageComponent } from './adminPageCreate/adminCreatePage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'adminListPage', pathMatch: 'full' },
  { path: 'adminListPage', component: AdminListPageComponent },
  { path: 'adminCreatePage', component: AdminCreatePageComponent },
];
