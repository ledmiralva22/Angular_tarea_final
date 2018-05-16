import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { IArticleFilterParam } from '../_models/shared.model';

@Component({
  selector: 'app-manager-articles',
  templateUrl: './manager-articles.component.html',
  styleUrls: ['./manager-articles.component.scss']
})
export class ManagerArticlesComponent implements OnInit {
  filters: IArticleFilterParam = {
    sortBy: "",
    searchText: "",
    pageNumber: undefined,
    pageSize: undefined
  }
  @select(['countState','count']) readonly count$: Observable<number>;
  
  constructor() { }

  ngOnInit() {
    
  }

  increment() {
    //this.ngRedux.dispatch(this.actions.increment()); // <- New
    
  }

  decrement() {
    //this.ngRedux.dispatch(this.actions.decrement()); // <- New
    
  }

}
