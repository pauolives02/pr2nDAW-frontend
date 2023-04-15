import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// COMPONENTS //
// > AUTH
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// OTHER
import { NotFoundComponent } from './components/not-found/not-found.component';

// > DASHBOARD
import { DashboardComponent } from './components/dashboard/dashboard.component';

// > DASHBOARD > EXERCISES
import { ExercisesComponent } from './components/dashboard/exercises/exercises.component';
import { AddExerciseComponent } from './components/dashboard/exercises/add-exercise/add-exercise.component';
import { ExerciseDetailComponent } from './components/dashboard/exercises/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './components/dashboard/exercises/exercise-list/exercise-list.component';
import { ExercisePrivateListComponent } from './components/dashboard/exercises/exercise-private-list/exercise-private-list.component';
import { ExerciseSubscriptionsComponent } from './components/dashboard/exercises/exercise-subscriptions/exercise-subscriptions.component';

// > DASHBOARD > SETS
import { SetsComponent } from './components/dashboard/sets/sets.component';
import { SetListComponent } from './components/dashboard/sets/set-list/set-list.component';
import { SetPrivateListComponent } from './components/dashboard/sets/set-private-list/set-private-list.component';
import { SetSubscriptionsComponent } from './components/dashboard/sets/set-subscriptions/set-subscriptions.component';
import { AddSetComponent } from './components/dashboard/sets/add-set/add-set.component';
import { SetDetailComponent } from './components/dashboard/sets/set-detail/set-detail.component';

// > DASHBOARD > RANKING
import { RankingComponent } from './components/dashboard/ranking/ranking.component';

// > DASHBOARD > SUGGESTIONS
import { SuggestionsComponent } from './components/dashboard/suggestions/suggestions.component';
import { NewSuggestionComponent } from './components/dashboard/suggestions/new-suggestion/new-suggestion.component';

// > DASHBOARD > PROFILE
import { ProfileComponent } from './components/dashboard/profile/profile.component';

// AUTO



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent, data: { animation: 'isLeft' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'isRight' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], 
      children: [
        { path: 'exercises', component: ExercisesComponent,
          children: [
            { path: '', component: ExerciseListComponent },
            { path: 'private', component: ExercisePrivateListComponent },
            { path: 'subscriptions', component: ExerciseSubscriptionsComponent },
            { path: 'add', component: AddExerciseComponent },
            { path: 'detail/:id', component: ExerciseDetailComponent },
          ]
        },
        { path: 'sets', component: SetsComponent,
          children: [
            { path: '', component: SetListComponent },
            { path: 'private', component: SetPrivateListComponent },
            { path: 'subscriptions', component: SetSubscriptionsComponent },
            { path: 'add', component: AddSetComponent },
            { path: 'detail/:id', component: SetDetailComponent },
          ]
        },
        { path: 'ranking', component: RankingComponent },
        { path: 'suggestions', component: SuggestionsComponent,
          children: [
            { path: '', component: NewSuggestionComponent }
          ]
        },
        { path: 'profile', component: ProfileComponent },
      ]
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }