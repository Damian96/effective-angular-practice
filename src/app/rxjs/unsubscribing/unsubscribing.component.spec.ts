import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribingComponent } from './unsubscribing.component';

describe('UnsubscribingComponent', () => {
  let component: UnsubscribingComponent;
  let fixture: ComponentFixture<UnsubscribingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsubscribingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsubscribingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
