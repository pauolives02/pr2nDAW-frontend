// MODULES //
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from "@angular/material/dialog";
import { NgxSelectModule } from 'ngx-select-ex';

// INTERCEPTORS //
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/error-interceptor';
import { AuthInterceptor } from './interceptors/auth-interceptor';

// COMPONENTS //
import { AppComponent } from './app.component';

// > AUTH
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// OTHER
import { NotFoundComponent } from './components/not-found/not-found.component';

// > DASHBOARD
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { NavigationComponent } from './components/dashboard/navigation/navigation.component';

// > DASHBOARD > PROFILE
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { SelectAvatarComponent } from './components/dashboard/profile/select-avatar/select-avatar.component';

// > DASHBOARD > EXERCISES
import { ExercisesComponent } from './components/dashboard/exercises/exercises.component';
import { ExerciseDetailComponent } from './components/dashboard/exercises/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './components/dashboard/exercises/exercise-list/exercise-list.component';
import { AddExerciseComponent } from './components/dashboard/exercises/add-exercise/add-exercise.component';
import { ExerciseSubscriptionsComponent } from './components/dashboard/exercises/exercise-subscriptions/exercise-subscriptions.component';
import { AllExercisesComponent } from './components/dashboard/exercises/all-exercises/all-exercises.component';

// > DASHBOARD > SETS
import { SetsComponent } from './components/dashboard/sets/sets.component';
import { SetListComponent } from './components/dashboard/sets/set-list/set-list.component';
import { SetSubscriptionsComponent } from './components/dashboard/sets/set-subscriptions/set-subscriptions.component';
import { SetDetailComponent } from './components/dashboard/sets/set-detail/set-detail.component';
import { AddSetComponent } from './components/dashboard/sets/add-set/add-set.component';
import { AllSetsComponent } from './components/dashboard/sets/all-sets/all-sets.component';

// > DASHBOARD > RANKING
import { RankingComponent } from './components/dashboard/ranking/ranking.component';

// > DASHBOARD > SUGGESTIONS
import { SuggestionsComponent } from './components/dashboard/suggestions/suggestions.component';
import { MySuggestionsComponent } from './components/dashboard/suggestions/my-suggestions/my-suggestions.component';
import { NewSuggestionComponent } from './components/dashboard/suggestions/new-suggestion/new-suggestion.component';
import { AllSuggestionsComponent } from './components/dashboard/suggestions/all-suggestions/all-suggestions.component';
import { DetailSuggestionComponent } from './components/dashboard/suggestions/detail-suggestion/detail-suggestion.component';

// > DASHBOARD > SHARED COMPONENTS
import { ComponentNavComponent } from './components/shared-components/component-nav/component-nav.component';
import { SpinnerComponent } from './components/shared-components/spinner/spinner.component';
import { FileUploadComponent } from './components/shared-components/file-upload/file-upload.component';
import { ListItemComponent } from './components/shared-components/list-item/list-item.component';
import { ItemSubscriptionDialogComponent } from './components/shared-components/list-item/item-subscription-dialog/item-subscription-dialog.component';
import { SharedTableComponent } from './components/shared-components/shared-table/shared-table.component';
import { ConfirmDialogComponent } from './components/shared-components/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from './components/shared-components/message-dialog/message-dialog.component';

// > DASHBOARD > CONFIGURATION
import { ConfigurationComponent } from './components/dashboard/configuration/configuration.component';
import { ConfigurationAvatarsComponent } from './components/dashboard/configuration/configuration-avatars/configuration-avatars.component';
import { ConfigurationUsersComponent } from './components/dashboard/configuration/configuration-users/configuration-users.component';
import { ConfigurationSubjectsComponent } from './components/dashboard/configuration/configuration-subjects/configuration-subjects.component';
import { ConfigurationReportsComponent } from './components/dashboard/configuration/configuration-reports/configuration-reports.component';
import { AvatarsAddModalComponent } from './components/dashboard/configuration/configuration-avatars/avatars-add-modal/avatars-add-modal.component';
import { SubjectsAddModalComponent } from './components/dashboard/configuration/configuration-subjects/subjects-add-modal/subjects-add-modal.component';
import { PlayGoalComponent } from './components/dashboard/play-goal/play-goal.component';


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
    ListItemComponent,
    ExerciseSubscriptionsComponent,
    SetListComponent,
    SetSubscriptionsComponent,
    SetDetailComponent,
    AddSetComponent,
    MySuggestionsComponent,
    HomeComponent,
    ItemSubscriptionDialogComponent,
    ConfigurationComponent,
    ConfigurationAvatarsComponent,
    ConfigurationUsersComponent,
    ConfigurationSubjectsComponent,
    ConfigurationReportsComponent,
    ConfirmDialogComponent,
    SharedTableComponent,
    AllExercisesComponent,
    AllSetsComponent,
    MessageDialogComponent,
    AvatarsAddModalComponent,
    SubjectsAddModalComponent,
    AllSuggestionsComponent,
    DetailSuggestionComponent,
    SelectAvatarComponent,
    PlayGoalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    NgxSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
