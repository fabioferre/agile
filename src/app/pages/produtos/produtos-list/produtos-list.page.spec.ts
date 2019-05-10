import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosListPage } from './produtos-list.page';

describe('ProdutosListPage', () => {
  let component: ProdutosListPage;
  let fixture: ComponentFixture<ProdutosListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutosListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
