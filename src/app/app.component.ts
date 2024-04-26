import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CookiesService } from './Services/cookies.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  title = 'NutriShop';
  isLogin = false
  tokenLongin: string | null = null;

  constructor(private cookieService: CookiesService) { }

  ngOnInit(): void {
    this.tokenLongin = this.cookieService.get('tokenLogin')
  }

  onLoginChanged(isLogin: boolean) {
    this.isLogin = isLogin;
  }
}
