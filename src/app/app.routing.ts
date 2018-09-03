import { Routes, RouterModule } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';

const APP_ROUTES: Routes = [
    { path: '', component: FeedComponent },
    { path: 'login', component: LoginComponent },
    { path: 'feed', component: FeedComponent },
    { path: 'camera', component: CameraComponent },
    { path: 'profile', component: ProfileComponent },
    { path: ':username', component: ProfileComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);