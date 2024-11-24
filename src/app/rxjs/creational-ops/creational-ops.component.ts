import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { concat, merge, Subject } from "rxjs";

@Component({
  selector: 'app-creational-ops',
  standalone: true,
  imports: [],
  templateUrl: './creational-ops.component.html',
  styleUrl: './creational-ops.component.scss'
})
export class CreationalOpsComponent implements OnInit {

  protected readonly destroy = inject(DestroyRef);

  concat = {
    a: new Subject(),
    b: new Subject()
  }
  concat$ = concat(
    this.concat.a,
    this.concat.b
  ).pipe(takeUntilDestroyed(this.destroy));

  merge = {
    a: new Subject(),
    b: new Subject()
  }
  merge$ = merge(
    this.merge.a,
    this.merge.b
  ).pipe(takeUntilDestroyed(this.destroy));

  ngOnInit() {
    // this.concat$.subscribe(console.log);
  }

  startConcat() {
    this.concat.a.next(1);
    this.concat.a.next(2);
    this.concat.b.next(3);
    this.concat.a.complete();

    this.concat.b.next(4);
    this.concat.b.complete();

    // Logs: B:1, A:1, A:2, B:2
  }
}
