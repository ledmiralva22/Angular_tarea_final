import { TestBed, inject } from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Article } from '../_models/article.model';

fdescribe('ArticlesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([ArticlesService], (service: ArticlesService) => {
    expect(service).toBeTruthy();
  }));

  it('getList should return the data list', () => {
    //Arrange
    let expectedList = [];

    let service = TestBed.get(ArticlesService);
    let http = TestBed.get(HttpTestingController);
    //Act
    service.getAll().subscribe((datalist) => {
      expect(datalist).toEqual(expectedList);
    });
    //Assert
    const req = http.expectOne('http://localhost:3000/articles?_sort=votes&_order=desc');
    expect(req.request.method).toBe("GET");
    req.flush(expectedList);
  });

  it('get one article from the list', () => {
    //Arrange
    let articleFake = {
      "id": 1,
      "title": "Angular 5",
      "link": "http://angular.io",
      "votes": "3"
    };

    let service = TestBed.get(ArticlesService);
    let http = TestBed.get(HttpTestingController);

    //Act
    service.getArticle(1).subscribe((res) => {
      expect(res.title).toContain('Angular 5');
    });

    let req = http.expectOne('http://localhost:3000/articles/1');
    req.flush(articleFake);
    http.verify();
  });

  it('create article', () => {
    let article = {
      "id" : "12",
      "title": "Linkedin",
      "link": "http://linkedin.com",
      "votes": "3"
    };

    let service = TestBed.get(ArticlesService);
    let http = TestBed.get(HttpTestingController);

    service.addArticle("Linkedin", "http://linkedin.com").subscribe(res => {
      expect(res.title).toContain('Linkedin');
      expect(res.link).toContain('http://linkedin.com');
    });

    const req = http.expectOne('http://localhost:3000/articles');
    expect(req.request.method).toBe('POST');
    req.flush(article);
    http.verify();

  });

  it('update article', () => {
    //Arrange
    let article = {
      "title": "Facebook",
      "link": "http://facebook.com",
      "votes": "3"
    };

    let service = TestBed.get(ArticlesService);
    let http = TestBed.get(HttpTestingController);

    //Act
    service.updateArticle(article,1).subscribe((res) => {
      expect(res.title).toContain('Facebook');
      expect(res.link).toContain('http://facebook.com');
    });

    const req = http.expectOne('http://localhost:3000/articles/1');
    expect(req.request.method).toBe("PUT");
    http.verify();
  });
});
