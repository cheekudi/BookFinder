export interface Book {
  id: string;
  title: string;
  author: string;
  cover?: string;
  primary_isbn10?: string;
  description?: string;
  publishedDate?: string;
  publisher?: string;
  pageCount?: string;
}

export interface BookResponse {
  items: Array<{
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      description?: string;
      imageLinks?: {
        thumbnail: string;
      };
    };
  }>;
}
