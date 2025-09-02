import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetCategoryListModel } from '../../../models/CategoryModels/get-categroy-list-model';
import { CategoryService } from '../../../services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-blog-with-categroy-group',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './home-blog-with-categroy-group.component.html',
  styleUrl: './home-blog-with-categroy-group.component.css'
})
export class HomeBlogWithCategroyGroupComponent implements OnInit {

  getblogsWithCategories: GetCategoryListModel[] = [];

  constructor(private categoryService: CategoryService) {

  }



  ngOnInit(): void {
    this.categoryService.GetAllCategories().subscribe({
      next: (result:any) => { 
        this.getblogsWithCategories = result.data;
      }
    })
  }


}
