import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SidebarService } from '../../../services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit {

  isCollepsed = false;
  constructor(private authservice: AuthService, private sideBarService: SidebarService) {

  }

  ngOnInit(): void {
    this.sideBarService.collepsed$.subscribe((result) => {
      this.isCollepsed = result;
    })
  }


  getFullName() {
    return this.authservice.getFullName();
  }

}
