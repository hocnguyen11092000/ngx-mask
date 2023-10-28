import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _fb: FormBuilder) {}

  title = 'ngx-mask';
  someForm = this._fb.group({
    price: ['', [Validators.required]],
    unit: ['VND', Validators.required],
  });
  ngOnInit(): void {}

  handleSubmitForm() {
    if (this.someForm.valid) {
      console.log(this.someForm.getRawValue());
    }
  }
}
