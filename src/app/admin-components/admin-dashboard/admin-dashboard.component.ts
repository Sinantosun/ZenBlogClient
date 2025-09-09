import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { GetCommentAnalisytModel } from '../../models/CommentModels/get-comment-analisyt-model';
import { DashboardService } from '../../services/dashboard.service';
import { GetDashboardWidgetModel } from '../../models/DashboardModels/get-dashboard-widgets-model';
import { BlogService } from '../../services/blog.service';
import { MessageService } from '../../services/message.service';
import { GetMessageListModel } from '../../models/MessageModels/get-messsage-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  constructor(private commentService: CommentService, private dashboardService: DashboardService, private blogservice: BlogService, private messageService: MessageService) {

  }
  getCommentAnalisytModel: GetCommentAnalisytModel = new GetCommentAnalisytModel;
  getDashboardWidgetModel: GetDashboardWidgetModel = new GetDashboardWidgetModel;
  leastCommentedBlogTitle: string = "";
  mostCommentedBlogTitle: string = ""
  messageModel: GetMessageListModel[] = [];
  ngOnInit(): void {
    this.loadCommentAnalisytValues();
    this.loadDashboardWidgets();
    this.getLeastCommentedBlogTitle();
    this.getMostCommentedBlogTitle();
    this.getMessages();
  }

  getMessages() {
    this.messageService.GetMessagesForDashboard().subscribe({
      next: (res:any) => {
        this.messageModel = res.data;
      }
    })
  }

  getLeastCommentedBlogTitle() {
    this.blogservice.getLeastCommentedBlogTitle().subscribe({
      next: (res: any) => {
        this.leastCommentedBlogTitle = res.data;
      }
    })
  }

  getMostCommentedBlogTitle() {
    this.blogservice.getMostCommentedBlogTitle().subscribe({
      next: (res: any) => {
        this.mostCommentedBlogTitle = res.data;
      }
    })
  }

  loadDashboardWidgets() {
    this.dashboardService.GetDashboardWidgets().subscribe({
      next: (res: any) => {
        this.getDashboardWidgetModel = res.data;
        console.log(res);
      }
    })
  }
  loadCommentAnalisytValues() {
    this.commentService.GetCommentAnaliyst().subscribe({
      next: (res: any) => {
        this.getCommentAnalisytModel = res.data;
      }
    })
  }
}
