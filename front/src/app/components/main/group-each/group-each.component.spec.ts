import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEachComponent } from './group-each.component';

describe('GroupEachComponent', () => {
  let component: GroupEachComponent;
  let fixture: ComponentFixture<GroupEachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
