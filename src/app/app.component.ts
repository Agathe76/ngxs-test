import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryState } from './states/category/category.state';
import { AddArticle, AddCategory } from './states/category/category.action';
import { Article } from './states/category/category.state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public allCategories$: Observable<string[]>;
  public articleList$: Observable<Article[]>;
  public categoryToAdd: string = '';
  public articleContent: string = '';
  public articleName: string = '';
  public categoryId: string = '';

  constructor(private readonly store: Store) {
    this.allCategories$ = this.store.select(CategoryState.AllCategories);

    this.loadArticleList();
  }

  public loadArticleList(): void {
    this.articleList$ = this.store.select(CategoryState.GetActicleListByCategoryId('books'));
  }

  public chooseCategory(idCategory: string): void {
    this.articleList$ = this.store.select(CategoryState.GetActicleListByCategoryId(idCategory));
    this.categoryId = idCategory;
  }

  public addCategory(): void {
    this.store.dispatch(new AddCategory(this.categoryToAdd));

    this.categoryToAdd = '';
  }

  public addArticle(): void {
    this.store.dispatch(new AddArticle(this.categoryId, this.articleName, this.articleContent));

    this.articleName = '';
    this.articleContent = '';
  }
}
