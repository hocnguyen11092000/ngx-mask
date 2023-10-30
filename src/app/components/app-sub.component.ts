import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sub',
  template: `
    <style>
      .sub {
        margin-left: 16px;
      }
    </style>
    <div class="sub">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubComponent {}
