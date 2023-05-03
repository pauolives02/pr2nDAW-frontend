import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationUsersComponent } from './configuration-users.component';

describe('ConfigurationUsersComponent', () => {
  let component: ConfigurationUsersComponent;
  let fixture: ComponentFixture<ConfigurationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
