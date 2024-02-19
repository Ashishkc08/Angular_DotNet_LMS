import { Injectable } from '@angular/core';
import { Book } from '../models/books.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface BookRatingModel {
  id: number;
  userId: number;
  bookId: number;
  rating: number;
}
interface RateBookRequest {
  bookId: number;
  userId: number;
  rating: number;
}
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[]=[];

  private apiUrl = 'https://localhost:7114/api';
  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBookById(id: number): Observable<Book> {
    const url = `${this.apiUrl}/books/${id}`;
    return this.http.get<Book>(url);
  }

  borrowBook(bookId: number, userId: number, borrowedDate: Date): Observable<any> {
    const borrowBookRequest = {
      BookId: bookId,
      UserId: userId,
      BorrowedDate: borrowedDate
    };

    return this.http.post(`${this.apiUrl}/books/Borrow`, borrowBookRequest);
  }

  getBorrowedBooks(userId: number): Observable<Book[]> {
    const url = `${this.apiUrl}/books/BorrowedByUser/${userId}`;
    return this.http.get<Book[]>(url);
  }

  getLentedBooks(userId: number): Observable<Book[]> {
    const url = `${this.apiUrl}/books/LentedByUser/${userId}`;
    return this.http.get<Book[]>(url);
  }

  returnBook(bookId: number, userId: number): Observable<any> {
    const returnBookRequest = {
      BookId: bookId,
      UserId: userId
    };

    return this.http.post(`${this.apiUrl}/books/Return`, returnBookRequest);
  }
  addBook(book: Book): Observable<any> {
    const url = `${this.apiUrl}/AddBook`;
    return this.http.post(url, book);
  }

  getUserRating(userId: number, bookId: number): Observable<number> {
    const request = {
      userId: userId,
      bookId: bookId
    };

    return this.http.post<number>(`${this.apiUrl}/books/GetUserRating`, request);
  }

  getAllRatings(): Observable<BookRatingModel[]> {
    return this.http.post<BookRatingModel[]>(`${this.apiUrl}/books/AllRatings`, {});
  }
  rateBook(request: RateBookRequest): Observable<any> {
    const url = `${this.apiUrl}/books/Rate`;
    return this.http.post(url, request);
  }
}
