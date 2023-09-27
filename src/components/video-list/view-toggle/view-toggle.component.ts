import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.component.html',
  styleUrls: ['./view-toggle.component.scss']
})
export class ViewToggleComponent {
  @Input() currentView: String= 'grid';
  @Output() viewChanged = new EventEmitter<String>();

  toggleView(view: string) {
    this.currentView = view;
    this.viewChanged.emit(this.currentView);
  }
}
