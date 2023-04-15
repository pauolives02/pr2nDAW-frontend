import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSubscriptionsComponent } from './exercise-subscriptions.component';

describe('ExerciseSubscriptionsComponent', () => {
  let component: ExerciseSubscriptionsComponent;
  let fixture: ComponentFixture<ExerciseSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseSubscriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
