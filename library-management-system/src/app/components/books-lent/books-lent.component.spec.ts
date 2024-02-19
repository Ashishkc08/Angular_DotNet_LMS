import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksLentComponent } from './books-lent.component';

describe('BooksLentComponent', () => {
  let component: BooksLentComponent;
  let fixture: ComponentFixture<BooksLentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksLentComponent]
    });
    fixture = TestBed.createComponent(BooksLentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
