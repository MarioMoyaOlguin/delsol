import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollExamSlugComponent } from './poll-exam-slug.component';

describe('PollExamSlugComponent', () => {
  let component: PollExamSlugComponent;
  let fixture: ComponentFixture<PollExamSlugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollExamSlugComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollExamSlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
