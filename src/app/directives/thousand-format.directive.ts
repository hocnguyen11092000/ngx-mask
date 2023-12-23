import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import {
  Subject,
  debounceTime,
  fromEvent,
  pairwise,
  takeUntil,
  tap,
} from 'rxjs';
import { convertThousands } from '../utils/validator.utils';
import * as _ from 'lodash';

@Directive({
  selector: '[app-thausand]',
  exportAs: 'appThausand',
})
export class ThausandFormatDirective implements OnInit, OnDestroy {
  //#region inject services
  private readonly control = inject(NgControl);
  private readonly elm = inject(ElementRef);
  //#endregion inject services

  //#region subjects
  destroy$ = new Subject<void>();
  //#endregion subjects

  ngOnInit(): void {
    const nativeElm = this.elm.nativeElement as HTMLInputElement;

    if (nativeElm) {
      fromEvent(nativeElm, 'input')
        .pipe(
          tap(() => {
            const value = nativeElm.value.replace(/\s/g, '');
            const domValue = document.getElementById('dot_mask') as any;
            if (domValue) {
              console.log(domValue?.value);
            }

            if (value) {
              this.elm.nativeElement.value = value;
              this.control.control?.setValue(value, { emitEvent: false });
            }
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
