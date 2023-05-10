import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarsAddModalComponent } from './avatars-add-modal.component';

describe('AvatarsAddModalComponent', () => {
  let component: AvatarsAddModalComponent;
  let fixture: ComponentFixture<AvatarsAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarsAddModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
