import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ModComponent } from './components/mod.component';
import { SubComponent } from './components/app-sub.component';
import { SubListComponent } from './components/sub-list.component';
import { ThausandFormatDirective } from './directives/thousand-format.directive';

@NgModule({
  declarations: [
    AppComponent,
    ModComponent,
    SubComponent,
    SubListComponent,
    ThausandFormatDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({}),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
