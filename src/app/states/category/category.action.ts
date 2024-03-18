export class AddCategory {
    static readonly type = '[CategoryState] Add new Category';

    constructor(public newCategory: string) {}
}

export class AddArticle {
    static readonly type = '[CategoryState] Add new article';

    constructor(public idCategory: string, public articleName: string, public articleContent: string) {}
}
