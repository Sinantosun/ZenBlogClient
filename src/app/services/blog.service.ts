import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { catchError, Observable } from 'rxjs';
import { Result } from '../models/Other/result-model';
import { GetBlogListModel } from '../models/BlogModels/get-blog-list-model';
import { AddBlogModel } from '../models/BlogModels/add-blog-model';
import { UpdateBlogModel } from '../models/BlogModels/update-blog-model';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private service: GenericService) {

  }

  GetAllBlog(): Observable<Result<GetBlogListModel[]>> {
    return this.service.Get<GetBlogListModel[]>("blogs").pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  GetPagedBlog(page: number = 1): Observable<Result<GetBlogListModel[]>> {
    return this.service.Get<GetBlogListModel[]>(`blogs/getBlogByPage/${page}`).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  AddBlog(model: AddBlogModel) {
    return this.service.Post("blogs", model).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  UpdateBlog(model: UpdateBlogModel) {
    return this.service.Put("blogs", model).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  GetBlogById(id: string): Observable<Result<UpdateBlogModel>> {
    return this.service.Get<UpdateBlogModel>(`blogs/${id}`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }

  deleteBlog(id: string) {
    return this.service.Delete(`blogs/${id}`).pipe(
      catchError((err) => {
        throw err;
      })
    )
  }


}
