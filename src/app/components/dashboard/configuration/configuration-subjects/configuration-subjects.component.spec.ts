import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSubjectsComponent } from './configuration-subjects.component';

describe('ConfigurationSubjectsComponent', () => {
  let component: ConfigurationSubjectsComponent;
  let fixture: ComponentFixture<ConfigurationSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationSubjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
