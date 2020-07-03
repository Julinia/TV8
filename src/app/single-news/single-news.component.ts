import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent implements OnInit {

  post;
  postId;
  html;

  constructor(
    public router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute,
    // private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {

    this.postId = this.route.snapshot.paramMap.get('id');

    this.apiService.getPost(this.postId).subscribe((res: any) => {
      this.post = res;
      //this.html = this.sanitizer.bypassSecurityTrustHtml(res.content.rendered);
      console.log(res);
    });
  }

}
