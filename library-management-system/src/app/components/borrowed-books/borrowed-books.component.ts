import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/books.model';
import { BookService } from 'src/app/services/book.service';

interface BookRatingModel {
  id: number;
  userId: number;
  bookId: number;
  rating: number;
}


@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent {
  ratings: BookRatingModel[]=[];

  borrowedBooks: Book[] = [];
  userId: number = 0;
  userIdString: string | null = null;
  userRating: number = 0;
  isRatingEnabled: boolean = false;

  constructor(private bookService: BookService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAllRatings();
    const currentUserDetailString = sessionStorage.getItem('currentUserDetail');

    if (currentUserDetailString !== null) {
      try {
        const currentUserDetail = JSON.parse(currentUserDetailString);

        if (currentUserDetail?.userId) {
          this.userId = +currentUserDetail.userId;
          this.getBooks();
        } else {
          console.error('User ID not found in currentUserDetail');
        }
      } catch (error) {
        console.error('Error parsing currentUserDetail:', error);
      }
    } else {
      console.error('User details not found in session storage');
    }
  }

  getBooks() {
    this.bookService.getBorrowedBooks(this.userId).subscribe(books => {
      this.borrowedBooks = books;
    });
  }

  returnBook(mybookId: number): void {
    this.bookService.returnBook(mybookId, this.userId).subscribe(response => {
      console.log(response);
      this.borrowedBooks = this.borrowedBooks.filter(book => book.bookId !== mybookId);
    }, error => {
      console.error(error);
    });
  }

  getRatingForBook(bookId: number): Observable<number> {
    return this.http.post<number>('https://localhost:7114/api/books/GetUserRating', { UserId: this.userId, BookId: bookId })

  }
  isRatingNonZero(bookId: number): boolean {
    this.getRatingForBook(bookId).subscribe(rating => {
      return rating !== 0;
    });

    return false;
  }
  fetchAllRatings(): void {
    this.bookService.getAllRatings().subscribe(
      (ratings: BookRatingModel[]) => {
        this.ratings = ratings;
        console.log('All Ratings:', this.ratings);
      },
      error => {
        console.error('Error fetching ratings:', error);

      }
    );
  }
  isRatingExists(bookId: number): boolean {
    return this.ratings.some(rating => rating.userId === this.userId && rating.bookId === bookId);
  }

  getRating(bookId:number):number{
      const existingRating = this.ratings.find(r => r.userId === this.userId && r.bookId === bookId);
      return existingRating ? existingRating.rating : 0;
    }
    rateBook(bookId: number, rating: number): void {
      // Make an HTTP request to rate the book
      this.bookService.rateBook({ bookId: bookId, userId: this.userId, rating: rating }).subscribe(
        (response) => {
          console.log(response);
          const updatedRating: BookRatingModel = {
            id: 1,
            userId: this.userId,
            bookId,
            rating
          };

          const existingRatingIndex = this.ratings.findIndex(r => r.userId === this.userId && r.bookId === bookId);
          if (existingRatingIndex !== -1) {
            this.ratings[existingRatingIndex] = updatedRating;
          } else {
            this.ratings.push(updatedRating);
          }

          console.log('Rating successful');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
