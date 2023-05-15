import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

// COMPONENTS //
// > AUTH
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// OTHER
import { NotFoundComponent } from './components/not-found/not-found.component';

// > DASHBOARD
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/dashboard/home/home.component';

// > DASHBOARD > EXERCISES
import { ExercisesComponent } from './components/dashboard/exercises/exercises.component';
import { AddExerciseComponent } from './components/dashboard/exercises/add-exercise/add-exercise.component';
import { ExerciseDetailComponent } from './components/dashboard/exercises/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './components/dashboard/exercises/exercise-list/exercise-list.component';
import { ExerciseSubscriptionsComponent } from './components/dashboard/exercises/exercise-subscriptions/exercise-subscriptions.component';
import { AllExercisesComponent } from './components/dashboard/exercises/all-exercises/all-exercises.component';

// > DASHBOARD > SETS
import { SetsComponent } from './components/dashboard/sets/sets.component';
import { SetListComponent } from './components/dashboard/sets/set-list/set-list.component';
import { SetSubscriptionsComponent } from './components/dashboard/sets/set-subscriptions/set-subscriptions.component';
import { AddSetComponent } from './components/dashboard/sets/add-set/add-set.component';
import { SetDetailComponent } from './components/dashboard/sets/set-detail/set-detail.component';
import { AllSetsComponent } from './components/dashboard/sets/all-sets/all-sets.component';

// > DASHBOARD > RANKING
import { RankingComponent } from './components/dashboard/ranking/ranking.component';

// > DASHBOARD > SUGGESTIONS
import { SuggestionsComponent } from './components/dashboard/suggestions/suggestions.component';
import { NewSuggestionComponent } from './components/dashboard/suggestions/new-suggestion/new-suggestion.component';
import { MySuggestionsComponent } from './components/dashboard/suggestions/my-suggestions/my-suggestions.component';
import { AllSuggestionsComponent } from './components/dashboard/suggestions/all-suggestions/all-suggestions.component';

// > DASHBOARD > PROFILE
import { ProfileComponent } from './components/dashboard/profile/profile.component';

// > DASHBOARD > CONFIGURATION
import { ConfigurationComponent } from './components/dashboard/configuration/configuration.component';
import { ConfigurationAvatarsComponent } from './components/dashboard/configuration/configuration-avatars/configuration-avatars.component';
import { ConfigurationUsersComponent } from './components/dashboard/configuration/configuration-users/configuration-users.component';
import { ConfigurationSubjectsComponent } from './components/dashboard/configuration/configuration-subjects/configuration-subjects.component';
import { ConfigurationReportsComponent } from './components/dashboard/configuration/configuration-reports/configuration-reports.component';



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent, data: { animation: 'isLeft' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'isRight' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], 
      children: [
        { path: '', component: HomeComponent },
        { path: 'exercises', component: ExercisesComponent,
          children: [
            { path: '', component: ExerciseListComponent, data: { isPrivate: false } },
            { path: 'private', component: ExerciseListComponent, data: { isPrivate: true } },
            { path: 'subscriptions', component: ExerciseSubscriptionsComponent },
            { path: 'add', component: AddExerciseComponent },
            { path: 'edit/:id', component: AddExerciseComponent },
            { path: 'detail/:id', component: ExerciseDetailComponent },
            { path: 'all', component: AllExercisesComponent, canActivate: [AdminGuard] },
          ]
        },
        { path: 'sets', component: SetsComponent,
          children: [
            { path: '', component: SetListComponent, data: { isPrivate: false } },
            { path: 'private', component: SetListComponent, data: { isPrivate: true } },
            { path: 'subscriptions', component: SetSubscriptionsComponent },
            { path: 'add', component: AddSetComponent },
            { path: 'edit/:id', component: AddSetComponent },
            { path: 'detail/:id', component: SetDetailComponent },
            { path: 'all', component: AllSetsComponent, canActivate: [AdminGuard] },
          ]
        },
        { path: 'ranking', component: RankingComponent },
        { path: 'suggestions', component: SuggestionsComponent,
          children: [
            { path: '', component: NewSuggestionComponent },
            { path: 'my-suggestions', component: MySuggestionsComponent },
            { path: 'all', component: AllSuggestionsComponent, canActivate: [AdminGuard] },
          ]
        },
        { path: 'profile/:id', component: ProfileComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'configuration', component: ConfigurationComponent, canActivate: [AdminGuard],
          children: [
            { path: '', redirectTo: 'avatars', pathMatch: 'full' },
            { path: 'avatars', component: ConfigurationAvatarsComponent },
            { path: 'subjects', component: ConfigurationSubjectsComponent },
            { path: 'user-list', component: ConfigurationUsersComponent },
            { path: 'user-reports', component: ConfigurationReportsComponent },
          ]
        },
      ]
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule { }