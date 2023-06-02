import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollViewerComponent } from './poll-viewer.component';

describe('PollViewerComponent', () => {
  let component: PollViewerComponent;
  let fixture: ComponentFixture<PollViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
