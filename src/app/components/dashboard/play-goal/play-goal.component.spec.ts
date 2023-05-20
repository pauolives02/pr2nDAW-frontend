import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGoalComponent } from './play-goal.component';

describe('PlayGoalComponent', () => {
  let component: PlayGoalComponent;
  let fixture: ComponentFixture<PlayGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
