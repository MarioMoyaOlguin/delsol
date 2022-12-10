import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollWelcomeComponent } from './poll-welcome.component';

describe('PollWelcomeComponent', () => {
  let component: PollWelcomeComponent;
  let fixture: ComponentFixture<PollWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollWelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
