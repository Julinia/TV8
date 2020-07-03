import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  public getNews(page: number = 1) {
    return this.httpClient.get('https://tv8.md/wp-json/wp/v2/posts?page=' + page)
      .pipe(map((posts: any) => {
        posts = posts.map((post: any) => {
          this.getMedia(post.featured_media).subscribe((res: any) => {
            post.media = res.source_url;
          });
          return post;
        });
        return posts;
      }));
  }

  public getMedia(id: number){
    return this.httpClient.get('https://tv8.md/wp-json/wp/v2/media/' + id);
  }
  public getPost(id: number){
    return this.httpClient.get('https://tv8.md/wp-json/wp/v2/posts/' + id)
      .pipe(map((post: any) => {
          this.getMedia(post.featured_media).subscribe((res: any) => {
            post.media = res.source_url;
          });
          return post;
        }));
  }
}
