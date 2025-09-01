import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetCategoryListModel } from '../../models/CategoryModels/get-categroy-list-model';
import { CategoryService } from '../../services/category.service';
import { AddCategoryModel } from '../../models/CategoryModels/add-category-model';
import { APIResponseHandler } from '../../tools/api-response-handler';
import { UpdateCategoryModel } from '../../models/CategoryModels/update-category-model';
import { AlertHandler } from '../../tools/alert-handler';
declare const alertify: any
declare var bootstrap: any;

@Component({
  selector: 'app-admin-category',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent implements OnInit {

  @ViewChild('updateCategoryModal') updateModal!: ElementRef;
  @ViewChild('addCategoryModal') createModal!: ElementRef;

  model: GetCategoryListModel[] = [];
  addCategoryModel: AddCategoryModel = new AddCategoryModel;
  updateCategoryModel: UpdateCategoryModel = new UpdateCategoryModel;
  error: string = "";
  page = 1;
  pageSize = 8;
  totalCount = 0;

  constructor(private categoryService: CategoryService) {

  }
  ngOnInit(): void {
    this.loadCategories();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.totalCount / this.pageSize))
      .fill(0)
      .map((x, i) => i + 1);
  }

  loadCategories(page: number = 1) {
    this.page = page;
    this.categoryService.GetPagedCategories(page).subscribe(({
      next: (response: any) => {
        this.model = response.data.values;
        this.totalCount = response.data.totalCount;
      },
      error: (err) => { console.log(err); }
    }));
  }

  getCategoryById(id: string) {
    this.error = "";
    this.categoryService.GetCategoryById(id).subscribe({
      next: (response: any) => {
        this.updateCategoryModel = response.data;
        const modal = new bootstrap.Modal(this.updateModal.nativeElement);
        modal.show();
      },
      error: (err) => { console.log(err); }
    });
  }

  addCategory() {
    this.categoryService.AddCategory(this.addCategoryModel).subscribe({
      next: () => {
        this.loadCategories();
      },
      error: (response) => {
        this.handleErr(response);
      },
      complete: () => {
        alertify.success("Kategori Eklendi...!");
        this.error = "";
        this.addCategoryModel = new AddCategoryModel;
      }
    })
  }

  updateCategory() {
    this.categoryService.UpdateCategory(this.updateCategoryModel).subscribe({
      next: (res) => {
        const modalInstance = bootstrap.Modal.getInstance(this.updateModal.nativeElement);
        modalInstance?.hide();
      },
      error: (response) => {
        this.handleErr(response);
      },
      complete: () => {
        alertify.success("Kategori Güncellendi...!");
      }
    });
  }

  removeCategory(id: string) {
    AlertHandler.ShowConfirmMessage().then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.loadCategories();
          },
          error: (err) => {
            this.handleErr(err);
          },
          complete: () => {
            alertify.success("Kayıt Silindi...!");
          }
        })
      }
    });
  }

  private handleErr(response: any) {
    var handlerResponse = APIResponseHandler.Handle(response);
    if (handlerResponse) {
      this.error = handlerResponse;
    }
  }

  showCreateModal() {
    this.error = "";
    this.addCategoryModel = new AddCategoryModel;
    const modal = new bootstrap.Modal(this.createModal.nativeElement);
    modal.show();
  }

}
