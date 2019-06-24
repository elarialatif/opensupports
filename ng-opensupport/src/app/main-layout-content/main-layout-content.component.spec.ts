import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutContentComponent } from './main-layout-content.component';

describe('MainLayoutContentComponent', () => {
  let component: MainLayoutContentComponent;
  let fixture: ComponentFixture<MainLayoutContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
