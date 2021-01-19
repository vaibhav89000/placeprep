import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlacementComponent } from './view-placement.component';

describe('ViewPlacementComponent', () => {
  let component: ViewPlacementComponent;
  let fixture: ComponentFixture<ViewPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPlacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
