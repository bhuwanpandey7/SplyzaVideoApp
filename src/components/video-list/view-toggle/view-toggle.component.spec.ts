import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewToggleComponent } from './view-toggle.component';

describe('ViewToggleComponent', () => {
  let component: ViewToggleComponent;
  let fixture: ComponentFixture<ViewToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewToggleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default currentView of "grid"', () => {
    expect(component.currentView).toBe('grid');
  });

  it('should emit the selected view when toggleView is called', () => {
    const view = 'list';
    spyOn(component.viewChanged, 'emit');
    component.toggleView(view);
    expect(component.currentView).toBe(view);
    expect(component.viewChanged.emit).toHaveBeenCalledWith(view);
  });
});
