import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsmIssuePlaceComponent } from './esm-issue-place.component';

describe('EsmIssuePlaceComponent', () => {
  let component: EsmIssuePlaceComponent;
  let fixture: ComponentFixture<EsmIssuePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsmIssuePlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsmIssuePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
