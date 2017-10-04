import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegiosComponent } from './privilegios.component';

describe('PrivilegiosComponent', () => {
  let component: PrivilegiosComponent;
  let fixture: ComponentFixture<PrivilegiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
