import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromoSubscribePage } from './promo-subscribe.page';

describe('PromoSubscribePage', () => {
  let component: PromoSubscribePage;
  let fixture: ComponentFixture<PromoSubscribePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoSubscribePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromoSubscribePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
