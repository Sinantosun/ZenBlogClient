import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeadComponent } from '../admin-components/admin-layout-components/admin-head/admin-head.component';
import { AdminSidebarComponent } from '../admin-components/admin-layout-components/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../admin-components/admin-layout-components/admin-header/admin-header.component';
import { SidebarService } from '../services/sidebar.service';
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminHeadComponent, AdminSidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
  constructor(private sidebarService: SidebarService) {

  }

  isCollepsed: boolean = false;

  ngOnInit(): void {
    this.sidebarService.collepsed$.subscribe((result) => { 
      this.isCollepsed = result;
    })
  }
}
