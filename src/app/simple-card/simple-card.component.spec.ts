import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCardComponent } from './simple-card.component';

describe('SimpleCardComponent', () => {
  let component: SimpleCardComponent;
  let fixture: ComponentFixture<SimpleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
