import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsChartsComponent } from './polls-charts.component';

describe('PollsChartsComponent', () => {
  let component: PollsChartsComponent;
  let fixture: ComponentFixture<PollsChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
