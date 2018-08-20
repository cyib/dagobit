import { Routes, RouterModule } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'feed', component: FeedComponent },
    { path: '', component: LoginComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);