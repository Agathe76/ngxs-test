export interface Article {
    name: string;
    content: string;
};
  
export interface ArticleByCategory {
    [id: string]: {
        articles: Article[];
    };
};

export interface CategoryStateModel {
    articleByCategory: ArticleByCategory,
    categoryList: string[],
};
