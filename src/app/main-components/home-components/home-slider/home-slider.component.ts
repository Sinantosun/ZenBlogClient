import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { GetBlogListModel } from '../../../models/BlogModels/get-blog-list-model';
import { GenericService } from '../../../services/generic.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-slider',
  imports: [FormsModule,CommonModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.css'
})
export class HomeSliderComponent implements OnInit {

  constructor(private service: GenericService) {

  }


  latestBlogs: GetBlogListModel[] = [];

  swiper: any;

  loadValues() {

    this.service.Get("blogs/GetLast5BlogsList").subscribe({
      next: (response :any) => { 
        this.latestBlogs = response.data;
      }
    });

  }

  ngOnInit() {

    AOS.init({
      duration: 5000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    this.swiper = new Swiper('.init-swiper', {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });


        this.loadValues();
  }
}
