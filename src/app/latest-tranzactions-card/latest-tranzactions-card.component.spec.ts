import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTranzactionsCardComponent } from './latest-tranzactions-card.component';

describe('LatestTranzactionsCardComponent', () => {
  let component: LatestTranzactionsCardComponent;
  let fixture: ComponentFixture<LatestTranzactionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestTranzactionsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestTranzactionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
