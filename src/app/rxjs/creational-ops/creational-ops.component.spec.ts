import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreationalOpsComponent } from './creational-ops.component';

describe('CreationalOpsComponent', () => {
  let component: CreationalOpsComponent;
  let fixture: ComponentFixture<CreationalOpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationalOpsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreationalOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the concat observable', () => {
    // Arrange

    // Act

    // Assert
    expect(component.concat).toBeTruthy();
  })

  it('should log the concatenated observable', (done) => {
    // Arrange
    const expected = [1, 2, 4]; // Match actual emissions
    const receivedValues: any[] = [];

    // Act
    component.concat$.subscribe({
      next: (value) => {
        receivedValues.push(value); // Capture emitted values
      },
      complete: () => {
        console.info(receivedValues);

        // Assert
        expect(receivedValues).toEqual(expected); // Assert emissions directly
        done(); // Mark test as completed
      }
    });

    // Trigger the observable to start emitting values
    component.startConcat();
  });

  it('should initialize the merge observable', () => {
    // Arrange

    // Act

    // Assert
    expect(component.merge).toBeTruthy();
  })

  it('should log the merged observable', (done) => {
    // Arrange
    const expected = ['B:1', 'A:1', 'A:2', 'B:2']; // Match actual emissions
    const receivedValues: any[] = [];

    // Act
    component.merge$.subscribe({
      next: (value) => {
        receivedValues.push(value); // Capture emitted values
      },
      complete: () => {
        console.info(receivedValues);

        // Assert
        expect(receivedValues).toEqual(expected); // Assert emissions directly
        done(); // Mark test as completed
      }
    });

    // Trigger the observable to start emitting values
    component.startMerge();
  });

  it('should initialize the combineLatest observable', () => {
    // Arrange

    // Act

    // Assert
    expect(component.combineLatest).toBeTruthy();
  })

  it('should log the combineLatest observable', (done) => {
    // Arrange
    const expected = [[1, 2], [10, 2]]; // Match actual emissions
    const receivedValues: any[] = [];

    // Act
    component.combineLatest$.subscribe({
      next: (value) => {
        receivedValues.push(value); // Capture emitted values
      },
      complete: () => {
        console.info(receivedValues);

        // Assert
        expect(receivedValues).toEqual(expected); // Assert emissions directly
        done(); // Mark test as completed
      }
    });

    // Trigger the observable to start emitting values
    component.startCombine();
  });

  it('should initialize the forkjoin observable', () => {
    // Arrange

    // Act

    // Assert
    expect(component.forkJoin).toBeTruthy();
  })

  it('should log the forkjoin observable', (done) => {
    // Arrange
    const expected = [1, 2, 3, 4]; // Match actual emissions
    const receivedValues: any[] = [];

    // Act
    component.forkJoin$.subscribe({
      next: (value) => {
        receivedValues.push(value); // Capture emitted values
      },
      complete: () => {
        console.info(receivedValues);

        // Assert
        expect(receivedValues).toEqual(expected); // Assert emissions directly
        done(); // Mark test as completed
      }
    })

    // Trigger the observable to start emitting values
    component.startForkJoin();
  })

});
