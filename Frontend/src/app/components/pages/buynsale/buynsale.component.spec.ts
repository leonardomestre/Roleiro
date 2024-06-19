import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuynsaleComponent } from './buynsale.component';

describe('BuynsaleComponent', () => {
  let component: BuynsaleComponent;
  let fixture: ComponentFixture<BuynsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuynsaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuynsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
