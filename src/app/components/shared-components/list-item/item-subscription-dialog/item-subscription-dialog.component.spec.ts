import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSubscriptionDialogComponent } from './item-subscription-dialog.component';

describe('ItemSubscriptionDialogComponent', () => {
  let component: ItemSubscriptionDialogComponent;
  let fixture: ComponentFixture<ItemSubscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSubscriptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
