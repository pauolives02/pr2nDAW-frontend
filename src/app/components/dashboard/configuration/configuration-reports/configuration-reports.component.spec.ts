import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationReportsComponent } from './configuration-reports.component';

describe('ConfigurationReportsComponent', () => {
  let component: ConfigurationReportsComponent;
  let fixture: ComponentFixture<ConfigurationReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
