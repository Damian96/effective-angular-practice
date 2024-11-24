import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { combineLatest, concat, merge, Subject } from "rxjs";

@Component({
  selector: 'app-creational-ops',
  standalone: true,
  imports: [],
  templateUrl: './creational-ops.component.html',
  styleUrl: './creational-ops.component.scss'
})
export class CreationalOpsComponent implements OnInit {

  protected readonly destroy = inject(DestroyRef);

  combineLatest = {
    a: new Subject(),
    b: new Subject()
  }
  combineLatest$ = combineLatest([
    this.combineLatest.a,
    this.combineLatest.b
  ]).pipe(takeUntilDestroyed(this.destroy));

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

  forkJoin = {
    a: new Subject(),
    b: new Subject()
  }
  forkJoin$ = merge(
    this.forkJoin.a,
    this.forkJoin.b
  ).pipe(takeUntilDestroyed(this.destroy));

  ngOnInit() { }

  startConcat() {
    this.concat.a.next(1);
    this.concat.a.next(2);
    this.concat.b.next(3);
    this.concat.a.complete();

    this.concat.b.next(4);
    this.concat.b.complete();

    // Logs: B:1, A:1, A:2, B:2
  }

  startMerge() {
    this.merge.b.next('B:1');
    this.merge.a.next('A:1');
    this.merge.a.next('A:2');
    this.merge.b.next('B:2');

    this.merge.a.complete();
    this.merge.b.complete();
    // Logs: B:1, A:1, A:2, B:2
  }

  startCombine() {
    this.combineLatest.a.next(1);

    setTimeout(() => { this.combineLatest.b.next(2), 100 });
    setTimeout(() => { this.combineLatest.a.next(10), 500 });

    setTimeout(() => {
      this.combineLatest.a.complete();
      this.combineLatest.b.complete();
    }, 200)

    // Logs: 1, 2, 10, 2
  }

  startForkJoin() {
    this.forkJoin.a.next(1);
    this.forkJoin.b.next(2);
    this.forkJoin.a.next(3);
    this.forkJoin.b.next(4);

    this.forkJoin.a.complete();
    this.forkJoin.b.complete();

    // Logs: 1, 2, 3, 4
  }
}
