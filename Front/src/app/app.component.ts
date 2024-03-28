import { Component } from '@angular/core';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Atividade complementar';
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    let user: any | null;
    if(localStorage.getItem('user'))
      user = JSON.parse(localStorage.getItem('user') ?? '{}');
    else
      user = null;
    if(user)
      this.userService.setCurrentUser(user);
  }
}
