import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExperiencesComponent } from './add-experiences.component';

describe('AddExperiencesComponent', () => {
  let component: AddExperiencesComponent;
  let fixture: ComponentFixture<AddExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExperiencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
