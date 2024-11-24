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
    component.startConcat(); // This is the Act step, moving it to after the subscription
  });




});
