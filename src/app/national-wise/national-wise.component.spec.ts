import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalWiseComponent } from './national-wise.component';

describe('NationalWiseComponent', () => {
  let component: NationalWiseComponent;
  let fixture: ComponentFixture<NationalWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
