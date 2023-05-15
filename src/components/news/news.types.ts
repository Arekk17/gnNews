import { Article } from "../../types";
export type ArticleState = Pick<Article, "author" | "content" | "url" | "urlToImage">

export type NewsPopupProps = {
    isOpen: boolean;
    onClose: () => void;
} & ArticleState