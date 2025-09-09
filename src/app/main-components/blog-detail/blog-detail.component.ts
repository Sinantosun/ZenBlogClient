import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { SubCommentService } from '../../services/subcomment.service';
import { ParentSubCommentService } from '../../services/parentsubcomment.service';

import { GetBlogByIdModel } from '../../models/BlogModels/get-blog-model';
import { CreateCommentModel } from '../../models/CommentModels/create-comment-modelt';
import { CreateSubCommentModel } from '../../models/SubCommentModels/create-sub-comment-model';
import { CreateParentSubCommentModel } from '../../models/ParentSubCommentModels/create-parent-sub-comment.model';
import { GetSameCategoryBlogListModel } from '../../models/BlogModels/get-same-category-blog-list-model';

import { AlertifyAlertHandler } from '../../tools/alertify-alert-handler';
import { APIResponseHandler } from '../../tools/api-response-handler';
import { SweetAlertHandler } from '../../tools/sweet-alert-handler';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  model: GetBlogByIdModel = new GetBlogByIdModel();
  error: string = '';
  commentModel: CreateCommentModel = new CreateCommentModel();
  subCommentModel: CreateSubCommentModel = new CreateSubCommentModel();
  createParentCommentModel: CreateParentSubCommentModel = new CreateParentSubCommentModel();
  commentCount: number = 0;
  getSameCategoryBlogListModel: GetSameCategoryBlogListModel[] = [];
  _id: string = '';

  constructor(
    private route: ActivatedRoute,
    private parentSubService: ParentSubCommentService,
    private blogservice: BlogService,
    private authservice: AuthService,
    private commentService: CommentService,
    private subcommentService: SubCommentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this._id = param['id'];
      this.getBlog(this._id);
    });
  }

  removeSubComment(id: string) {
    SweetAlertHandler.ShowConfirmMessage('Uyarı', 'Yorumunuzu silmek istediğinize emin misiniz?').then(result => {
      if (result.isConfirmed) {
        this.subcommentService.deleteSubComment(id).subscribe({
          next: () => this.getBlog(this._id),
          error: () => AlertifyAlertHandler.AlertifyError('Yorumunuz silinemedi. bir hata oluştu.'),
          complete: () => AlertifyAlertHandler.AlertifySuccess('Yorum Silindi...!')
        });
      }
    });
  }

  removeParentSubComment(id: string) {
    SweetAlertHandler.ShowConfirmMessage('Uyarı', 'Yorumunuzu silmek istediğinize emin misiniz?').then(result => {
      if (result.isConfirmed) {
        this.parentSubService.deleteParentSubComment(id).subscribe({
          next: () => this.getBlog(this._id),
          error: err => {
            console.log(err);
            AlertifyAlertHandler.AlertifyError('Yorumunuz silinemedi. bir hata oluştu.');
          },
          complete: () => AlertifyAlertHandler.AlertifySuccess('Yorum Silindi...!')
        });
      }
    });
  }

  RemoveComment(id: string) {
    SweetAlertHandler.ShowConfirmMessage('Uyarı', 'Yorumunuzu silmek istediğinize emin misiniz?').then(result => {
      if (result.isConfirmed) {
        this.commentService.RemoveComment(id).subscribe({
          next: () => this.getBlog(this._id),
          error: () => AlertifyAlertHandler.AlertifyError('Yorumunuz silinemedi. bir hata oluştu.'),
          complete: () => AlertifyAlertHandler.AlertifySuccess('Yorum Silindi...!')
        });
      }
    });
  }

  showParentSubCommentForm(subIndex: number, commentIndex: number) {
    this.model.comments[commentIndex].subComments[subIndex].isformActive = true;
    this.model.comments[commentIndex].subComments.forEach((item, i) => {
      item.isformActive = i === subIndex;
    });
  }

  getSameBlogList(id: string) {
    this.blogservice.getSameBlogList(id).subscribe({
      next: (res: any) => {
        this.getSameCategoryBlogListModel = res.data;
        console.log(res);
      }
    });
  }

  getUserId() {
    return this.authservice.getuserId();
  }

  isLoginIn() {
    return this.authservice.loggedIn();
  }

  getBlog(id: string) {
    this.blogservice.GetBlogById(id).subscribe({
      next: (response: any) => {
        this.model = response.data;
        this.commentModel.blogId = id;
        this.commentModel.userId = this.getUserId();

        let totalSubCount = this.model.comments
          ? this.model.comments.reduce((acc: number, c: any) => acc + (c.subComments?.length || 0), 0)
          : 0;

        this.commentCount = this.model.comments.length + totalSubCount;
        this.getSameBlogList(response.data.categoryId);
      }
    });
  }

  AddComment() {
    this.commentService.AddComment(this.commentModel).subscribe({
      next: () => this.getBlog(this._id),
      error: err => {
        var response = APIResponseHandler.Handle(err);
        this.error = response;
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess('Yorum kaydı eklendi.');
        this.error = '';
        this.commentModel = new CreateCommentModel();
      }
    });
  }

  ShowSubCommentForm(index: number) {
    this.model.comments.forEach((item, i) => {
      item.formActive = i === index;
    });
  }

  addparentSubComment(id: string) {
    this.createParentCommentModel.userId = this.getUserId();
    this.createParentCommentModel.subCommentId = id;

    this.parentSubService.AddParentSubComment(this.createParentCommentModel).subscribe({
      next: () => this.getBlog(this._id),
      error: err => {
        var result = APIResponseHandler.Handle(err);
        this.error = result;
        AlertifyAlertHandler.AlertifyError('Yorum eklenemedi...!');
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess('Yorum Eklendi...!');
        this.createParentCommentModel = new CreateParentSubCommentModel();
      }
    });
  }

  addSubComment(id: string) {
    this.subCommentModel.commentId = id;
    this.subCommentModel.userId = this.getUserId();

    this.subcommentService.AddSubComment(this.subCommentModel).subscribe({
      next: () => this.getBlog(this._id),
      error: err => {
        var response = APIResponseHandler.Handle(err);
        this.error = response;
        console.log(err);
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess('Yorum kaydı eklendi.');
        this.error = '';
        this.subCommentModel = new CreateSubCommentModel();
      }
    });
  }

  translateToEnglish(index: number) {
    let text = this.model.comments[index].body;
    this.model.comments[index].isTranslateJobLoading = true;

    this.commentService.translateToEnglish(text).subscribe({
      next: (res: any) => {
        this.model.comments[index].isTranslateJobLoading = false;
        this.model.comments[index].body = res.data.translatedText;
      },
      error: () => {
        this.model.comments[index].isTranslateJobLoading = false;
      }
    });
  }
}
