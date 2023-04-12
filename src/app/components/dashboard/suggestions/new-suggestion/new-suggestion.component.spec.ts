import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuggestionComponent } from './new-suggestion.component';

describe('NewSuggestionComponent', () => {
  let component: NewSuggestionComponent;
  let fixture: ComponentFixture<NewSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSuggestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
