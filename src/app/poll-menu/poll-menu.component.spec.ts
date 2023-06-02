import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollMenuComponent } from './poll-menu.component';

describe('PollMenuComponent', () => {
  let component: PollMenuComponent;
  let fixture: ComponentFixture<PollMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
