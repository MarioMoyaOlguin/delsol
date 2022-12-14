import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaCreadaComponent } from './encuesta-creada.component';

describe('EncuestaCreadaComponent', () => {
  let component: EncuestaCreadaComponent;
  let fixture: ComponentFixture<EncuestaCreadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaCreadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaCreadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
