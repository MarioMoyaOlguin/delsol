import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDepComponent } from './choose-dep.component';

describe('ChooseDepComponent', () => {
  let component: ChooseDepComponent;
  let fixture: ComponentFixture<ChooseDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
