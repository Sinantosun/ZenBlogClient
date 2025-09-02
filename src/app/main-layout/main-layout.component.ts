import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MainHeadComponent } from '../main-components/main-layout-components/main-head/main-head.component';
import { MainHeaderComponent } from '../main-components/main-layout-components/main-header/main-header.component';
import { MainFooterComponent } from '../main-components/main-layout-components/main-footer/main-footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [MainHeadComponent, MainHeaderComponent, MainFooterComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {



}
