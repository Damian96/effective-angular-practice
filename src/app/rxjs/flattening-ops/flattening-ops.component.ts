import { AsyncPipe } from "@angular/common";
import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { concatMap, fromEvent, interval, map, mergeMap, of, Subject, take, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-flattening-ops',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './flattening-ops.component.html',
  styleUrl: './flattening-ops.component.scss'
})
export class FlatteningOpsComponent {

  protected readonly destroy = inject(DestroyRef);

  concatMapMessage$ = new Subject<string>();
  @ViewChild('concatMapHeading') concatMapHeading!: ElementRef<HTMLElement>;

  mergeMapMessage$ = new Subject<string>();
  mergeMapClickCount = 0;
  @ViewChild('mergeMapHeading') mergeMapHeading!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.registerConcatMap();
  }

  onMergeMapClickHandler() {
    if (!this.mergeMapClickCount) { // only if first click
      setTimeout(() => this.mergeMapMessage$.complete(), 100 * 8 + 10);
    }

    this.registerMergeMap().subscribe();
    this.mergeMapClickCount++;
  }

  registerConcatMap() {
    fromEvent(this.concatMapHeading.nativeElement, 'click').pipe(
      tap(() => {
        setTimeout(() => this.concatMapMessage$.complete(), 150 * 4 + 10)
      }),
      takeUntil(this.concatMapMessage$),
      concatMap(() => interval(150).pipe(take(4))),
    ).subscribe({
      next: (number) => {
        this.concatMapMessage$.next(number.toString());
        // Logs: 0, 1, 2, 3 on every click
      },
    })
  }

  registerMergeMap() {
    return of({}).pipe(
      takeUntil(this.mergeMapMessage$),
      mergeMap(() => interval(100).pipe(take(4))),
      map((number) => {
        this.mergeMapMessage$.next(number.toString())
      })
    );
  }
}
