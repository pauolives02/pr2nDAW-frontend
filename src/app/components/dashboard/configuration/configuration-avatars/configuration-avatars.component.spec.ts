import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationAvatarsComponent } from './configuration-avatars.component';

describe('ConfigurationAvatarsComponent', () => {
  let component: ConfigurationAvatarsComponent;
  let fixture: ComponentFixture<ConfigurationAvatarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationAvatarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
