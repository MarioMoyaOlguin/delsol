import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksScreenComponent } from './thanks-screen.component';

describe('ThanksScreenComponent', () => {
  let component: ThanksScreenComponent;
  let fixture: ComponentFixture<ThanksScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanksScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanksScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
