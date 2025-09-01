import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
declare const alertify: any

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    alertify.set('notifier', 'position', 'top-right');
    alertify.set('notifier', 'delay', 4);
  }
}
