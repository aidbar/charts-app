import { Routes } from '@angular/router';
import { ViewModeComponent } from './view-mode/view-mode.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    {path: 'view-mode', component: ViewModeComponent},
    {path: 'settings', component: SettingsComponent},
    {path: '', redirectTo: '/view-mode', pathMatch: 'full'}
];
