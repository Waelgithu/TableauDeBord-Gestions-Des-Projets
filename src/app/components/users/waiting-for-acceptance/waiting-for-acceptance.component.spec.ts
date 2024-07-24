import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForAcceptanceComponent } from './waiting-for-acceptance.component';

describe('WaitingForAcceptanceComponent', () => {
  let component: WaitingForAcceptanceComponent;
  let fixture: ComponentFixture<WaitingForAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingForAcceptanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingForAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
