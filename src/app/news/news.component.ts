import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  articles = [];
  page = 1;
  notEmptyPost = true;
  notscrolly = true;

  constructor(private apiService: ApiService,  private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.apiService.getNews().subscribe((data: any) => {
      this.articles = data;
      console.log(data);
    });
    this.loadInitPost();
  }

  loadInitPost() {
    this.apiService.getNews(this.page).subscribe((data) =>{
      this.articles = data;
    });
  }

  onScroll() {
    console.log('sss');
    if (this.notscrolly && this.notEmptyPost) {
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextPost();
    }
  }

  loadNextPost() {
    this.apiService.getNews(++this.page)
      .subscribe( (data: any) => {
        // const newPost = data[0];
        this.spinner.hide();
        if (data.length === 0 ) {
          this.notEmptyPost =  false;
        }
        // add newly fetched posts to the existing post
        this.articles = this.articles.concat(data);
        this.notscrolly = true;
      });
  }
}
