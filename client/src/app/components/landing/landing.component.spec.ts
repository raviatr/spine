// client/src/app/landing/landing.component.spec.ts

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { createFakeToken, createFakeUser } from '../../testing/factories';
import { LandingComponent } from './landing.component';

fdescribe('LandingComponent', () => {
  let logOutButton: DebugElement;
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        LandingComponent
      ],
      providers: [
        AuthService
      ]
    });
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    localStorage.setItem('taxi.auth', JSON.stringify(
      createFakeToken(createFakeUser()))
    );
    fixture.detectChanges();
    logOutButton = fixture.debugElement.query(By.css('button.btn.btn-primary'));
  });

  it('should allow a user to log out of an account', () => {
    logOutButton.triggerEventHandler('click', null);
    expect(localStorage.getItem('taxi.auth')).toBeNull();
  });
});
