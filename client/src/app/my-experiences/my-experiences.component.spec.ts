import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExperiencesComponent } from './my-experiences.component';

describe('MyExperiencesComponent', () => {
  let component: MyExperiencesComponent;
  let fixture: ComponentFixture<MyExperiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExperiencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
