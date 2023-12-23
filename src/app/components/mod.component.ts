import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  defer,
  iif,
  of,
  pluck,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { AppService } from '../services/app.service';
import { SubListComponent } from './sub-list.component';

@Component({
  selector: 'app-mod',
  template: `
    <form [formGroup]="modForm" (ngSubmit)="hanleSubmitForm()">
      <div class="form-group">
        <input type="text" placeholder="input..." formControlName="name" />
      </div>
      <button>submit</button>
    </form>

    <button [routerLink]="['/mod']">Go to create</button>
    <br />
    <button [routerLink]="['/mod', '123546']">Go to edit</button>
    <br />
    <br />
    <app-sub>
      <app-sub><h3>hello</h3></app-sub>
      <app-sub><h3>test</h3></app-sub>
      <app-sub>
        <app-sub>
          <h4>sub</h4>
          <app-sub>
            <h5>sub 2</h5>
          </app-sub>
        </app-sub>
      </app-sub>
    </app-sub>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModComponent implements OnInit {
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _activateRoute: ActivatedRoute
  ) {
    console.log('compoent running');
  }

  private _appService = inject(AppService);
  private _sub = inject(SubListComponent);

  readonly id$ = this._activateRoute.params.pipe(pluck('id'));

  readonly modForm: FormGroup = this._fb.group({
    name: [''],
  });

  ngOnInit(): void {
    console.log('compoent init');

    console.log(this._sub);
  }

  hanleSubmitForm() {
    if (this.modForm.valid) {
      const formValue = this.modForm.getRawValue();

      this.id$.pipe(
        switchMap((id) => {
          return iif(() => !id, this.create(formValue), this.edit(formValue));
        })
      );
      // .subscribe(console.log);

      of(null)
        .pipe(
          withLatestFrom(this.id$),
          switchMap(([_, id]) => {
            console.log('id ', id);

            return defer(() =>
              !id ? this.create(formValue) : this.edit(formValue)
            );
          })
        )
        .subscribe(console.log);
    }
  }

  create(data: any): Observable<string> {
    return of('create' + JSON.stringify(data));
  }

  edit(data: any): Observable<string> {
    return of('edit ' + JSON.stringify(data));
  }
}
