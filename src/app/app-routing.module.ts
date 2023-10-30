import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModComponent } from './components/mod.component';

const routes: Routes = [
  {
    path: 'mod',
    component: ModComponent,
  },
  {
    path: 'mod/:id',
    component: ModComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
