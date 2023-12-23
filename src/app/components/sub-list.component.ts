import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-list',
  template: `
    <table>
      <thead>
        <th>Menu</th>
        <th>Screen</th>
        <th>Action</th>
      </thead>
      <tbody>
        <ng-container *ngIf="json$ | async as data">
          <ng-container *ngFor="let item of data">
            <ng-container *ngIf="item?.children">
              <ng-container
                *ngTemplateOutlet="
                  tableTemp;
                  context: { $implicit: item?.children }
                "
              >
              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>

        <ng-template #tableTemp let-c>
          <ng-container *ngFor="let i of c">
            <ng-container *ngIf="i.type === 'menu'; else tdTempl">
              <tr>
                {{
                  i.name
                }}
                <ng-container *ngIf="i?.children">
                  <ng-container
                    *ngTemplateOutlet="
                      tableTemp;
                      context: { $implicit: i?.children }
                    "
                  >
                  </ng-container>
                </ng-container>
              </tr>
            </ng-container>
            <ng-template #tdTempl>
              <td>
                {{ i.name }}
                <ng-container *ngIf="i?.children">
                  <ng-container
                    *ngTemplateOutlet="
                      tableTemp;
                      context: { $implicit: i?.children }
                    "
                  >
                  </ng-container>
                </ng-container>
              </td>
            </ng-template>
          </ng-container>
        </ng-template>
      </tbody>
    </table>

    <h2>{{ title }}</h2>
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubListComponent {
  @Input() title: string = '';

  readonly json$: Observable<any> = of([
    {
      id: 1,
      name: 'User module',
      children: [
        {
          id: 1,
          name: 'Member',
          type: 'menu',
          children: [
            {
              id: 1,
              name: 'Member list',
              children: [
                {
                  id: 1,
                  name: 'Get member listing',
                },
                {
                  id: 2,
                  name: 'Get member listing 2',
                },
                {
                  id: 3,
                  name: 'Get member listing 3',
                },
              ],
            },
            {
              id: 2,
              name: 'Member detail',
              children: [
                {
                  id: 1,
                  name: 'Get member detail listiing',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          type: 'menu',
          name: 'Group',
          children: [
            {
              id: 1,
              name: 'Group list',
              children: [
                {
                  id: 1,
                  name: 'Get group listing',
                },
                {
                  id: 2,
                  name: 'Get group listing 2',
                },
                {
                  id: 3,
                  name: 'Get group listing 3',
                },
              ],
            },
            {
              id: 2,
              name: 'Group detail',
              children: [
                {
                  id: 1,
                  name: 'Get group detail 1',
                },
                {
                  id: 2,
                  name: 'Get group detail 2',
                },
                {
                  id: 3,
                  name: 'Get group detail 3',
                },
                {
                  id: 4,
                  name: 'Get group detail 4',
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
}
