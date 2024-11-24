import { ComponentFixture, TestBed } from '@angular/core/testing';
import { dispatchFakeEvent, findEl } from './../../spec-helpers/element.spec-helper';

import { FlatteningOpsComponent } from './flattening-ops.component';

describe('FlatteningOpsComponent', () => {
  let component: FlatteningOpsComponent;
  let fixture: ComponentFixture<FlatteningOpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatteningOpsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlatteningOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should log the concatMap flattened observable', (done) => {
    // Arrange
    const expected = ['0', '1', '2', '3']; // Match actual emissions
    const receivedValues: string[] = [];

    // Act
    component.concatMapMessage$.subscribe({
      next: (value) => {
        receivedValues.push(value); // Capture emitted values
      },
      complete: () => {
        console.info('concatMap', receivedValues);

        // Assert
        expect(receivedValues).toEqual(expected); // Assert emissions directly
        done(); // Mark test as completed
      }
    });

    // Assert
    dispatchFakeEvent(findEl(fixture, 'concatmap-heading').nativeElement, 'click'); // Trigger the fake event
    fixture.detectChanges();
  })

  it('should log the mergeMap flattened observable', (done) => {
    // Arrange
    const expected = ['0', '1', '2', '0', '3', '1', '2', '3']; // Match actual emissions
    const receivedValues: string[] = [];

    // Act
    component.mergeMapMessage$.subscribe({
      next: (value) => {
        receivedValues.push(value); // Capture emitted values
      },
      complete: () => {
        console.info('mergeMap', receivedValues);

        // Assert
        expect(receivedValues).toEqual(expected); // Assert emissions directly
        done(); // Mark test as completed
      }
    });

    // Assert
    dispatchFakeEvent(findEl(fixture, 'mergemap-heading').nativeElement, 'click'); // Trigger the fake event (1st)
    setTimeout(() => {
      dispatchFakeEvent(findEl(fixture, 'mergemap-heading').nativeElement, 'click'); // Trigger the fake event (2nd)
      fixture.detectChanges();
    }, 100 * 2 + 10 /* Start  at the (end-1) of the 1st click + 10ms */)
    fixture.detectChanges();
  })
});
