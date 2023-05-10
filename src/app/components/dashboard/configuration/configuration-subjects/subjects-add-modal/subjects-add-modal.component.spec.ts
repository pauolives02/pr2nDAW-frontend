import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsAddModalComponent } from './subjects-add-modal.component';

describe('SubjectsAddModalComponent', () => {
  let component: SubjectsAddModalComponent;
  let fixture: ComponentFixture<SubjectsAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsAddModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
