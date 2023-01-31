import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesMenuComponent } from './modules-menu.component';

describe('ModulesMenuComponent', () => {
  let component: ModulesMenuComponent;
  let fixture: ComponentFixture<ModulesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
