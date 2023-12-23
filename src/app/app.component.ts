import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import { convertThousands } from './utils/validator.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private _fb: FormBuilder) {}
  private _cdr = inject(ChangeDetectorRef);
  readonly thousandControl = new FormControl('', [
    Validators.required,
    this.numberValidator,
  ]);

  title = 'ngx-mask';
  someForm = this._fb.group({
    price: [0.01, [Validators.required, this.validatePecent('p').bind(this)]],
    unit: ['VND', Validators.required],
  });
  ngOnInit(): void {
    const result = convertThousands(3000000000000000.9);
  }

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

  changeTitle() {
    this.title = Math.random().toString();
  }

  ngAfterViewInit(): void {}

  hanldeSlice(event: Event, controlName: string, maxlength = 17) {
    const control = this.someForm.get(controlName) as AbstractControl;
    const value = (_.get(event, 'target.value') || '') as string;

    if (_.size(value) > maxlength) {
      control.setValue(value.slice(0, maxlength));
      control.updateValueAndValidity({ onlySelf: true });
    }
  }

  numberValidator(control: AbstractControl): ValidationErrors | null {
    const value = _.get(control, 'value') || '';
    if (!value) return null;

    const convertNumberValue = +value;

    return !!convertNumberValue ? null : { invalidNumber: true };
  }
}
