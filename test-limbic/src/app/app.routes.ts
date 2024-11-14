import { Routes } from '@angular/router';
import { ImportTableComponent } from './import-table/import-table.component';
import { BaseUiComponent } from './base-ui/base-ui.component';

export const routes: Routes = [
  {path: 'import', component: ImportTableComponent},
  {path: '', component: BaseUiComponent}

];
