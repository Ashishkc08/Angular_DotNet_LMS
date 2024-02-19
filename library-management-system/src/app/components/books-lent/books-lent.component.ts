import { Component } from '@angular/core';
import { Book } from 'src/app/models/books.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books-lent',
  templateUrl: './books-lent.component.html',
  styleUrls: ['./books-lent.component.css']
})



export class BooksLentComponent {
  lentBooks: Book[] = [];
  userId: number = 0;
  userIdString: string | null = null;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
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
    this.bookService.getLentedBooks(this.userId).subscribe(books => {
      this.lentBooks = books;
    });
  }


}

