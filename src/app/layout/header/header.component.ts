import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  validToken:boolean = false;
  headerDisabled:boolean = true
  constructor(private router: Router, private authService : AuthService){}

  ngOnInit(): void {
   this.validToken =  this.authService.checkToken()
  }

  logout(){
    this.authService.logout()
  }
}
