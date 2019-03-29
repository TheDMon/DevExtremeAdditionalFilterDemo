import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalFilterButtonComponent } from './additional-filter-button.component';

describe('AdditionalFilterButtonComponent', () => {
  let component: AdditionalFilterButtonComponent;
  let fixture: ComponentFixture<AdditionalFilterButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalFilterButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalFilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
