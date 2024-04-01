import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onAuthFormSubmit(formObj: NgForm) {
    if (formObj.invalid) return;

    const { email, password } = formObj.value;

    formObj.reset();
  }
}
