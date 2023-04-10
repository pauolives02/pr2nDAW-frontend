import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ExercisesComponent } from './components/dashboard/exercises/exercises.component';
import { NavigationComponent } from './components/dashboard/navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { RankingComponent } from './components/dashboard/ranking/ranking.component';
import { SuggestionsComponent } from './components/dashboard/suggestions/suggestions.component';
import { SetsComponent } from './components/dashboard/sets/sets.component';
import { ComponentNavComponent } from './components/shared-components/component-nav/component-nav.component';
import { SpinnerComponent } from './components/shared-components/spinner/spinner.component';
import { AddExerciseComponent } from './components/dashboard/exercises/add-exercise/add-exercise.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { ExerciseDetailComponent } from './components/dashboard/exercises/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './components/dashboard/exercises/exercise-list/exercise-list.component';
import { HttpErrorInterceptor } from './interceptors/error-interceptor';
import { FileUploadComponent } from './components/shared-components/file-upload/file-upload.component';

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
    FileUploadComponent
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
