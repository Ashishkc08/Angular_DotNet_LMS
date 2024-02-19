
export interface Book {
  bookId: number;
  name: string;
  rating: number;
  author: string;
  genre: string;
  isBookAvailable: boolean;
  description: string;
  lentByUserId: number | null;
  currentlyBorrowedById: number | null;
  tokensRequired: number;
  image: string;
}
