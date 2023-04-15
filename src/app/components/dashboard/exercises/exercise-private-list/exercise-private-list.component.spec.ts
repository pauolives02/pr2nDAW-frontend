import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePrivateListComponent } from './exercise-private-list.component';

describe('ExercisePrivateListComponent', () => {
  let component: ExercisePrivateListComponent;
  let fixture: ComponentFixture<ExercisePrivateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExercisePrivateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisePrivateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
