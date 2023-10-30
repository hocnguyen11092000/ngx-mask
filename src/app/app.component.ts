import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _fb: FormBuilder) {}
  private _cdr = inject(ChangeDetectorRef);

  title = 'ngx-mask';
  someForm = this._fb.group({
    price: ['', [Validators.required, this.validatePecent('p').bind(this)]],
    unit: ['VND', Validators.required],
  });
  ngOnInit(): void {}

  handleSubmitForm() {
    if (this.someForm.valid) {
      console.log(this.someForm.getRawValue());
    }
  }

  validatePecent(p: string): ValidatorFn {
    return (control: AbstractControl) => {
      const value = (_.get(control, 'value') || '') as string;

      switch (p) {
        case 'p':
          if (this.someForm?.get('unit')?.value !== 'PERCENT') return null;

          return this.handleCheckValidPercent(value);

        default:
          return null;
      }
    };
  }

  handleCheckValidPercent(value: string) {
    if (!value) return null;

    const comcomaIdx = value.indexOf(',');

    if (comcomaIdx > -1) {
      const decimal = value.slice(comcomaIdx + 1);

      if (!+decimal) return { invalid: true };

      return null;
    }

    return +value <= 100 && +value > 0 ? null : { invalid: true };
  }
}
