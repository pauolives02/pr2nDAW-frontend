import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSuggestionsComponent } from './all-suggestions.component';

describe('AllSuggestionsComponent', () => {
  let component: AllSuggestionsComponent;
  let fixture: ComponentFixture<AllSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSuggestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
