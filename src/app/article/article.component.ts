import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Article } from '../_models/article.model';
import { Router } from '@angular/router';
import { ArticlesService } from '../shared/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() article: Article;

  constructor(private router: Router, private articleService: ArticlesService) {
    // article is populated by the Input now,
    // so we don't need anything here
  }

  voteUp(votes): boolean {
    let currentVotes = +votes;
    currentVotes += 1;
    this.article.votes = currentVotes;
    return false;
  }

  voteDown(votes): boolean {
    let currentVotes = +votes;
    currentVotes -= 1;
    this.article.votes = currentVotes;
    return false;
  }
  // domain() is a utility function that extracts
  // the domain from a URL, which we'll explain shortly
  domain(link): string {
    try {
      // e.g. http://foo.com/path/to/bar
      const domainAndPath: string = link.split('//')[1];
      // e.g. foo.com/path/to/bar
      return domainAndPath.split('/')[0];
    } catch (err) {
      return null;
    }
  }

  update(articleId) {
    this.router.navigate(['/list/update-article', articleId]);
    return false;
  }

  delete(articleId){
    this.articleService.deleteArticle(articleId).subscribe(result => {
      console.log("Deleted");
      this.router.navigate(['/list/']);
    }, error => {
      console.log("Error");
    }, () => {
      console.log("Finish");
    });
  }

  ngOnInit() {
  }

}
