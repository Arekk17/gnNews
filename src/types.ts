import { ReactNode } from "react";

export type Article = {
    source: {
      id: number | null;
      name: string
    }
    url: string | undefined;
    publishedAt: ReactNode;
    urlToImage: string | undefined;
    description: any;
    author: string;
    title: string;
    date: string;
    content: string;
}
