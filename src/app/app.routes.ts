import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'rxjs/unsubscribing',
    loadComponent: () =>
      import('./rxjs/unsubscribing/unsubscribing.component').then(
        (m) => m.UnsubscribingComponent
      ),
  },
  {
    path: 'rxjs/creational-operators',
    loadComponent: () =>
      import('./rxjs/creational-ops/creational-ops.component').then(
        (m) => m.CreationalOpsComponent
      ),
  },
  {
    path: 'rxjs/flattening-operators',
    loadComponent: () =>
      import('./rxjs/flattening-ops/flattening-ops.component').then(
        (m) => m.FlatteningOpsComponent
      ),
  },
];
