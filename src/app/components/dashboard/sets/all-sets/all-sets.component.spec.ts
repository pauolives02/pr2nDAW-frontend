import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSetsComponent } from './all-sets.component';

describe('AllSetsComponent', () => {
  let component: AllSetsComponent;
  let fixture: ComponentFixture<AllSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
