import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Subject } from "rxjs";

@Component({
  selector: 'app-unsubscribing',
  standalone: true,
  imports: [],
  templateUrl: './unsubscribing.component.html',
  styleUrl: './unsubscribing.component.scss'
})
export class UnsubscribingComponent implements OnInit {
  protected readonly destroy = inject(DestroyRef);

  public mySubject$ = new Subject();

  ngOnInit() {
    this.mySubject$.pipe(takeUntilDestroyed(this.destroy)).subscribe({
      next: () => { },
      error: () => { },
      complete: () => { },
    });
  }
}
