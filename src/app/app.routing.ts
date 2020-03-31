import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base';
import { HomeStudentComponent } from './home-student';
import { HomeTeacherComponent } from './home-teacher';
import { LoginStudentComponent } from './login-student';
import { LoginTeacherComponent } from './login-teacher';
import { TopicListComponent } from './topic_list';
import { RegisterComponent } from './register';
import { SubmissionComponent } from './submission';
import { SubmissionListComponent } from './submission_list';
import { EassyListComponent } from './eassy_list';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: 'base', component: BaseComponent},
    { path: 'home-student', component: HomeStudentComponent, canActivate: [AuthGuard] },
    { path: 'home-teacher', component: HomeTeacherComponent, canActivate: [AuthGuard] },
    { path: 'login-student', component: LoginStudentComponent },
    { path: 'login-teacher', component: LoginTeacherComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'topic_list', component: TopicListComponent },
    { path: 'submission', component: SubmissionComponent },
    { path: 'submission_list', component: SubmissionListComponent },
    { path: 'eassy_list', component: EassyListComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);