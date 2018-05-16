import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../shared/articles.service';
import { Article } from '../_models/article.model';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss']
})
export class ArticleUpdateComponent implements OnInit {

  articleId: number;
  article: Article;
  private sub: any;
  constructor(private router: Router,private route: ActivatedRoute, private articleService: ArticlesService) {
    this.article = new Article("","",0);
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.articleId = params['id'];
      this.articleService.getArticle(this.articleId).subscribe(result => {
        this.article = result
        console.log(this.article);
      }, err => {
        console.log("error log");
      }, () => {
        console.log("finish log");
      });
    })
  }

  updateArticle(){
    this.articleService.updateArticle(this.article, this.articleId).subscribe(
      result => {
        this.router.navigate(['/list/']);
      }, err => {
        console.log("error");
      }, () => {
        console.log("finish");
      }
    );
  }
}
