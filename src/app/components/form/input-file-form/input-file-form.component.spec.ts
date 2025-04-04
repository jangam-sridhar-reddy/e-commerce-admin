import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileFormComponent } from './input-file-form.component';

describe('InputFileFormComponent', () => {
  let component: InputFileFormComponent;
  let fixture: ComponentFixture<InputFileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
