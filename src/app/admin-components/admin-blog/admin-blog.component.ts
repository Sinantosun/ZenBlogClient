import { Component, ElementRef, ViewChild } from '@angular/core';
import { GetBlogListModel } from '../../models/BlogModels/get-blog-list-model';
import { AddBlogModel } from '../../models/BlogModels/add-blog-model';
import { UpdateBlogModel } from '../../models/BlogModels/update-blog-model';
import { SweetAlertHandler } from '../../tools/sweet-alert-handler';
import { APIResponseHandler } from '../../tools/api-response-handler';
import { BlogService } from '../../services/blog.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetCategoryListModel } from '../../models/CategoryModels/get-categroy-list-model';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
declare const alertify: any;
declare var bootstrap: any;

@Component({
  selector: 'app-admin-blog',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-blog.component.html',
  styleUrl: './admin-blog.component.css'
})
export class AdminBlogComponent {
  @ViewChild('updateBlogModal') updateModal!: ElementRef;
  @ViewChild('addBlogModal') createModal!: ElementRef;

  model: GetBlogListModel[] = [];

  categoryModel: GetCategoryListModel[] = [];
  addBlogModel: AddBlogModel = new AddBlogModel;
  updateBlogModel: UpdateBlogModel = new UpdateBlogModel;
  error: string = "";
  erros: any[] = [];
  page = 1;
  pageSize = 8;
  totalCount = 0;

  constructor(private blogService: BlogService, private categoryService: CategoryService, private authservice: AuthService) {

  }
  getErrorsFor(prop: string) {
    return this.erros?.filter(x => x.propertyName === prop) ?? [];
  }

  ngOnInit(): void {
    this.loadBlog();

  }

  loadBlogValues() {
    this.categoryService.GetAllCategories().subscribe({
      next: (response: any) => {
        this.categoryModel = response.data;
      }
    })
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.totalCount / this.pageSize))
      .fill(0)
      .map((x, i) => i + 1);
  }

  loadBlog(page: number = 1) {
    this.page = page;
    this.blogService.GetPagedBlog(page).subscribe(({
      next: (response: any) => {
        this.model = response.data.values;
        this.totalCount = response.data.totalCount;
        console.log(response);
      },
      error: (err) => { console.log(err); }
    }));
  }

  getBlogById(id: string) {
    this.error = "";
    this.erros = [];
    this.blogService.GetBlogById(id).subscribe({
      next: (response: any) => {
        this.loadBlogValues();
        this.updateBlogModel = response.data;
        const modal = new bootstrap.Modal(this.updateModal.nativeElement);
        modal.show();

      },
      error: (err) => { console.log(err); }
    });
  }

  addBlog() {
    this.blogService.AddBlog(this.addBlogModel).subscribe({
      next: () => {
        this.loadBlog();
      },
      error: (response) => {
        this.handleErr(response);
        this.erros = response.error.errors;

      },
      complete: () => {
        alertify.success("Blog Eklendi...!");
        this.error = "";
        this.addBlogModel = new AddBlogModel;
        const modalInstance = bootstrap.Modal.getInstance(this.createModal.nativeElement);
        modalInstance?.hide();
      }
    })
  }

  updateBlog() {
    this.blogService.UpdateBlog(this.updateBlogModel).subscribe({
      next: (res) => {
        const modalInstance = bootstrap.Modal.getInstance(this.updateModal.nativeElement);
        modalInstance?.hide();

        this.loadBlog();
      },
      error: (response) => {
        this.handleErr(response);
        this.erros = response.error.errors;
      },
      complete: () => {
        alertify.success("Blog Güncellendi...!");
      }
    });
  }

  removeBlog(id: string) {
    SweetAlertHandler.ShowConfirmMessage().then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe({
          next: () => {
            this.loadBlog();
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
    this.erros = [];
    this.loadBlogValues();
    this.error = "";
    this.addBlogModel = new AddBlogModel;
    const modal = new bootstrap.Modal(this.createModal.nativeElement);
    modal.show();

    this.addBlogModel.userId = this.authservice.getuserId();
  }
}
