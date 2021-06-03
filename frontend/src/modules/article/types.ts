
export default interface IArticleState {
  articles: IArticle[];
  loading: boolean
}

export interface IArticle {
  id: number;
  title: string;
  body: string;
}