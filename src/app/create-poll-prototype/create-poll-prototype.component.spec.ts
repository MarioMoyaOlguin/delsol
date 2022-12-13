import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePollPrototypeComponent } from './create-poll-prototype.component';

describe('CreatePollPrototypeComponent', () => {
  let component: CreatePollPrototypeComponent;
  let fixture: ComponentFixture<CreatePollPrototypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePollPrototypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePollPrototypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
