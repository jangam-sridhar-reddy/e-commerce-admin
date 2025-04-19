import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { filter } from 'rxjs';
@Component({
  selector: 'app-full',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './full.component.html',
  styleUrl: './full.component.css',
})
export class FullComponent implements OnInit {
  headerDisabled:boolean = true
  constructor(private router: Router){}
  ngOnInit(): void {
    this.updateHeaderVisibility(this.router.url)
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      (event)=>{
        this.updateHeaderVisibility(event.url)
      }
    )
    
  }

  private updateHeaderVisibility(url: string) { 
    if(url.includes('/login')){
      this.headerDisabled = false
    } else if(url.includes('/registration')){
      this.headerDisabled = false
    }else {
      this.headerDisabled = true
    }
  }
}
