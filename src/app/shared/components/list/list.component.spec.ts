/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.tabData = {
      emptyHasAButton: false,
      emptySubtitle: '',
      emptyTitle: '',
      hasASearch: false,
      title: '',
      showReferenceDiv: false
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a string', fakeAsync(() => {
    component.inputSearch = 'Rik'
    component.onSearch(component.inputSearch)
    const spy = spyOn(component.search, 'emit').and.callFake(() => 'Rik');
    tick(1000)

    expect(spy).toHaveBeenCalled();
    expect(typeof component.inputSearch).toEqual('string')
  }))
});
