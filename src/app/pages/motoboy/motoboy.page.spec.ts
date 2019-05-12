import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoboyPage } from './motoboy.page';

describe('MotoboyPage', () => {
  let component: MotoboyPage;
  let fixture: ComponentFixture<MotoboyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotoboyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoboyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
