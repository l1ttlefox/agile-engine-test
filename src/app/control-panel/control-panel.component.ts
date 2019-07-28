import {ChangeDetectionStrategy, Component, Renderer2, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent {
  buttons = ['bold', 'italic', 'underline'];

  constructor(
    private r: Renderer2,
    @Inject(DOCUMENT) private doc: any
  ) {
  }

  applyChange(command, appliedValue = null) {
    this.doc.execCommand(command, false, appliedValue);
    this.triggerButton();
  }

  triggerButton() {
    this.buttons.forEach(e => {
      const result = this.doc.queryCommandState(e);
      const elementById = this.doc.getElementById(e);
      if (result) {
        this.r.addClass(elementById, 'active');
      } else {
        this.r.removeClass(elementById, 'active');
      }
    });
  }
}
