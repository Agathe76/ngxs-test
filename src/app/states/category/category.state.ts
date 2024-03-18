import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, createSelector } from '@ngxs/store';
import { AddArticle, AddCategory } from './category.action';
import { Article, CategoryStateModel } from './category.state.model';

const defaultState: CategoryStateModel = {
  articleByCategory: {
    animals: {
      articles: [
        { name: 'zebra', content: 'They are like ponies with stripes.' },
        { name: 'panda', content: 'They are like bears but black and white.' },
      ]
    },
    books: {
      articles: [
        { name: 'harry potter', content: 'A young sorcerer go to school' },
        { name: 'les miserables', content: 'The world is sad and depressing.' },
      ]
    }
  },
  categoryList: ['animals', 'books']
};

@State<CategoryStateModel>({
  name: 'CategoryState',
  defaults: defaultState
})
@Injectable()
export class CategoryState {

  @Selector()
  static AllState(state: CategoryStateModel): CategoryStateModel {
    return state;
  }

  @Selector()
  static AllCategories(state: CategoryStateModel): string[] {
    return state.categoryList;
  }

  static GetActicleListByCategoryId(categoryId: string) {
    return createSelector([CategoryState], (state: CategoryStateModel) => {
      return state.articleByCategory[categoryId].articles;
    });
  }

  @Action(AddCategory)
  AddCategoryFunction({getState, patchState}: StateContext<CategoryStateModel>, action: AddCategory) {
    const state = getState();

    if (!state.articleByCategory[action.newCategory]) {
      patchState({
        categoryList: [...state.categoryList, action.newCategory],
        articleByCategory: {...state.articleByCategory, [action.newCategory]: {articles: []}},
      });
    }
  }

  @Action(AddArticle)
  AddArticleFucntion({getState, patchState}: StateContext<CategoryStateModel>, action: AddArticle) {
    const state = getState();

    state.articleByCategory[action.idCategory].articles.push({
      name: action.articleName,
      content: action.articleContent
    });

    patchState({
      ...state,
      articleByCategory: state.articleByCategory,
    });
      
  }
  
}

