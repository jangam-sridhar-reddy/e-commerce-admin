import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-full',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './full.component.html',
  styleUrl: './full.component.css',
})
export class FullComponent implements OnInit {
  ngOnInit(): void {}
}
