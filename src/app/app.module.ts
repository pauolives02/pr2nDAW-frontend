import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { HttpErrorInterceptor } from './interceptors/error-interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ExercisesComponent } from './components/dashboard/exercises/exercises.component';
import { NavigationComponent } from './components/dashboard/navigation/navigation.component';
import { RankingComponent } from './components/dashboard/ranking/ranking.component';
import { SuggestionsComponent } from './components/dashboard/suggestions/suggestions.component';
import { SetsComponent } from './components/dashboard/sets/sets.component';
import { ComponentNavComponent } from './components/shared-components/component-nav/component-nav.component';
import { SpinnerComponent } from './components/shared-components/spinner/spinner.component';
import { AddExerciseComponent } from './components/dashboard/exercises/add-exercise/add-exercise.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { ExerciseDetailComponent } from './components/dashboard/exercises/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './components/dashboard/exercises/exercise-list/exercise-list.component';
import { FileUploadComponent } from './components/shared-components/file-upload/file-upload.component';
import { NewSuggestionComponent } from './components/dashboard/suggestions/new-suggestion/new-suggestion.component';
import { ExercisePrivateListComponent } from './components/dashboard/exercises/exercise-private-list/exercise-private-list.component';
import { ListItemComponent } from './components/shared-components/list-item/list-item.component';
import { ExerciseSubscriptionsComponent } from './components/dashboard/exercises/exercise-subscriptions/exercise-subscriptions.component';
import { SetListComponent } from './components/dashboard/sets/set-list/set-list.component';
import { SetPrivateListComponent } from './components/dashboard/sets/set-private-list/set-private-list.component';
import { SetSubscriptionsComponent } from './components/dashboard/sets/set-subscriptions/set-subscriptions.component';
import { SetDetailComponent } from './components/dashboard/sets/set-detail/set-detail.component';
import { AddSetComponent } from './components/dashboard/sets/add-set/add-set.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotFoundComponent,
    ExercisesComponent,
    NavigationComponent,
    RankingComponent,
    SuggestionsComponent,
    SetsComponent,
    ComponentNavComponent,
    SpinnerComponent,
    AddExerciseComponent,
    ProfileComponent,
    ExerciseDetailComponent,
    ExerciseListComponent,
    FileUploadComponent,
    NewSuggestionComponent,
    ExercisePrivateListComponent,
    ListItemComponent,
    ExerciseSubscriptionsComponent,
    SetListComponent,
    SetPrivateListComponent,
    SetSubscriptionsComponent,
    SetDetailComponent,
    AddSetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
