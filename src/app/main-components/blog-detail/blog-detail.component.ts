import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { GetBlogByIdModel } from '../../models/BlogModels/get-blog-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CreateCommentModel } from '../../models/CommentModels/create-comment-modelt';
import { CommentService } from '../../services/comment.service';
import { AlertifyAlertHandler } from '../../tools/alertify-alert-handler';
import { APIResponseHandler } from '../../tools/api-response-handler';
import { CreateSubCommentModel } from '../../models/SubCommentModels/create-sub-comment-model';
import { SubCommentService } from '../../services/subcomment.service';
import { ParentSubCommentService } from '../../services/parentsubcomment.service';
import { CreateParentSubCommentModel } from '../../models/ParentSubCommentModels/create-parent-sub-comment.model';


@Component({
  selector: 'app-blog-detail',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {



  model: GetBlogByIdModel = new GetBlogByIdModel;
  error: string = "";
  commentModel: CreateCommentModel = new CreateCommentModel;
  subCommentModel: CreateSubCommentModel = new CreateSubCommentModel;
  createParentCommentModel: CreateParentSubCommentModel = new CreateParentSubCommentModel;
  commentCount: number = 0;


  constructor(private route: ActivatedRoute,
    private parentSubService: ParentSubCommentService,
    private blogservice: BlogService, private authservice: AuthService, private commentService: CommentService, private subcommentService: SubCommentService) {

  }
  _id: string = "";

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      let id = param["id"];
      this._id = id;
      this.getBlog(id);
    })
  }

  showParentSubCommentForm(subcommentindex: number, commentIndex: number) {
    this.model.comments[commentIndex].subComments[subcommentindex].isformActive = true;

    this.model.comments[commentIndex].subComments.forEach((item, i) => {
      item.isformActive = (i === subcommentindex);
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
        console.log(response);
        this.commentCount = this.model.comments.length + totalSubCount;
      }
    })
  }

  AddComment() {
    this.commentService.AddComment(this.commentModel).subscribe({
      next: () => {
        this.getBlog(this._id);
      }
      , error: (err) => {
        var response = APIResponseHandler.Handle(err);
        this.error = response;

      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess("Yorum kaydı eklendi.");
        this.error = "";
        this.commentModel = new CreateCommentModel;
      }
    })
  }

  ShowSubCommentForm(index: number) {
    
    this.model.comments.forEach((item, i) => {
      item.formActive = (i === index);
    });
  }

  addparentSubComment(id: string) {
    this.createParentCommentModel.userId = this.getUserId();
    this.createParentCommentModel.subCommentId = id;
    this.parentSubService.AddParentSubComment(this.createParentCommentModel).subscribe({
      next: () => {
        this.getBlog(this._id);
      },
      error: (err) => {
        var result = APIResponseHandler.Handle(err);
        this.error = result;
        AlertifyAlertHandler.AlertifyError("Yorum eklenemedi...!");
      },
      complete: () => { 
        AlertifyAlertHandler.AlertifySuccess("Yorum Eklendi...!");
        this.createParentCommentModel = new CreateParentSubCommentModel;
      }
    })
  }

  addSubComment(id: string) {
    this.subCommentModel.commentId = id;
    this.subCommentModel.userId = this.getUserId();
    console.log(this.subCommentModel);
    this.subcommentService.AddSubComment(this.subCommentModel).subscribe({
      next: (data) => {
        this.getBlog(this._id);
      },
      error: (err) => {
        var response = APIResponseHandler.Handle(err);
        this.error = response;
        console.log(err);
      },
      complete: () => {
        AlertifyAlertHandler.AlertifySuccess("Yorum kaydı eklendi.");
        this.error = "";
        this.subCommentModel = new CreateSubCommentModel;
      }

    })

  }
}
