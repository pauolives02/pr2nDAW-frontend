import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPrivateListComponent } from './set-private-list.component';

describe('SetPrivateListComponent', () => {
  let component: SetPrivateListComponent;
  let fixture: ComponentFixture<SetPrivateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetPrivateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetPrivateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
