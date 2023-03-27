import { Article } from "../../types";
export type ArticleState = Pick<Article, "author" | "content" | "url">

export type NewsPopupProps = {
    isOpen: boolean;
    onClose: () => void;
} & ArticleState
