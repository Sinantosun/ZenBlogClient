import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError, Observable } from 'rxjs';
import { Result } from '../models/Other/result-model';
import { GetCategoryListModel } from '../models/CategoryModels/get-categroy-list-model';
import { AddCategoryModel } from '../models/CategoryModels/add-category-model';
import { UpdateCategoryModel } from '../models/CategoryModels/update-category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private service: GenericService) {

  }

  GetAllCategories(): Observable<Result<GetCategoryListModel[]>> {
    return this.service.Get<GetCategoryListModel[]>("categories").pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  GetPagedCategories(page: number = 1): Observable<Result<GetCategoryListModel[]>> {
    return this.service.Get<GetCategoryListModel[]>(`categories/getCategoriesByPage/${page}`).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  AddCategory(model: AddCategoryModel) {
    return this.service.Post("categories", model).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  UpdateCategory(model: UpdateCategoryModel) {
    return this.service.Put("categories", model).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  GetCategoryById(id: string): Observable<Result<UpdateCategoryModel>> {
    return this.service.Get<UpdateCategoryModel>(`categories/${id}`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  deleteCategory(id: string) {
    return this.service.Delete(`categories/${id}`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }


}
