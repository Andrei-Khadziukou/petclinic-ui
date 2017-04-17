import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleableListComponent } from './toggleable-list.component';

describe('ToggleableListComponent', () => {
  let component: ToggleableListComponent;
  let fixture: ComponentFixture<ToggleableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
