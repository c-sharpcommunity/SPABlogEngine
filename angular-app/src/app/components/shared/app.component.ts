import { Component } from '@angular/core';
import { LoginService } from '../../services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simple Blog Engine';
  userEmail: string;

  constructor(private loginService: LoginService) {
    loginService.loginSubject.asObservable().subscribe(p => {
      this.userEmail = localStorage.getItem('loggedUser') || '';
    });
  }
  ngOnInit() {
    this.userEmail = localStorage.getItem('loggedUser') || '';
  }
}
