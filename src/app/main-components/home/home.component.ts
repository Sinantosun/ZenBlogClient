import { Component } from '@angular/core';
import { HomeSliderComponent } from '../home-components/home-slider/home-slider.component';
import { HomeBlogWithCategroyGroupComponent } from '../home-components/home-blog-with-categroy-group/home-blog-with-categroy-group.component';

@Component({
  selector: 'app-home',
  imports: [HomeSliderComponent,HomeBlogWithCategroyGroupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
