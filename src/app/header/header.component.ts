import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public loginUser:LoginService) { }

  ngOnInit(): void {
  }

  @Input() returnLink?:boolean;
  @Input() link?:string;

  logout = () => {
    this.loginUser.logout();
  }

}
