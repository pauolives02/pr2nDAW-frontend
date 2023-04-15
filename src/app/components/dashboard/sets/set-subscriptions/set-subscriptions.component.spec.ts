import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSubscriptionsComponent } from './set-subscriptions.component';

describe('SetSubscriptionsComponent', () => {
  let component: SetSubscriptionsComponent;
  let fixture: ComponentFixture<SetSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetSubscriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
