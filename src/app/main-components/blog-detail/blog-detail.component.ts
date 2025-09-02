import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { GetBlogByIdModel } from '../../models/BlogModels/get-blog-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  imports: [FormsModule,CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {

  model: GetBlogByIdModel = new GetBlogByIdModel;
  constructor(private route: ActivatedRoute, private blogservice: BlogService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      let id = param["id"];
      this.getBlog(id);

    })
  }

  getBlog(id: string) {
    console.log("gelen id değeri : ", id);
    this.blogservice.GetBlogById(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.model = response.data;
      }
    })
  }
}
