import { Component, EventEmitter, Output } from '@angular/core';
import { CookiesService } from '../../Services/cookies.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private cookieService: CookiesService) { }

  @Output() loginChanged = new EventEmitter<boolean>();

  isLoginError = false

  adminInfo = {
    email: 'admin@nutriShop.com',
    password: '4dminNutrisop*'
  }

  userInfo = {
    email: 'user@test.com',
    password: 'us3r1234'
  }

  infoInput = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  toggleErrorLogin() {
    this.isLoginError = !this.isLoginError
  }

  handleSubmitLogin() {

    if (this.infoInput.value.email === this.adminInfo.email && this.infoInput.value.password === this.adminInfo.password) {
      this.cookieService.set('tokenLogin', 'vhlBGDIa3sWDT0xtXF')
      this.loginChanged.emit(true)
    } else if (this.infoInput.value.email === this.userInfo.email && this.infoInput.value.password === this.userInfo.password) {
      this.cookieService.set('tokenLogin', 'ZskyGa6GGpwaLUb73y')
      this.loginChanged.emit(true)
    } else {
      this.toggleErrorLogin()
    }
  }

}
