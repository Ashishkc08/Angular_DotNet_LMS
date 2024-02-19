import { Component } from '@angular/core';
import { Book } from 'src/app/models/books.model';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  showTokenErrorMessage = false;
  books: Book[] = [];
  username: string = '';
  userId: number = 0;
  currentUserDetail: any;
  constructor(private bookService: BookService, private userService: UserService) { }
  ngOnInit(): void {
    const storedUsername = sessionStorage.getItem('currentUser');
    this.getBooks();
    if (storedUsername) {
      this.username = storedUsername;
  }
  this.getId()
  const currentUserDetailString = sessionStorage.getItem('currentUserDetail');
  if (currentUserDetailString) {
    this.currentUserDetail = JSON.parse(currentUserDetailString);
  }
}
getBooks() {
  this.bookService.getBooks().subscribe(books => {
    this.books = books;
  });
}
isLoggedIn(): boolean {
  // Check if the user is logged in by verifying the presence of username in session storage
  return !!sessionStorage.getItem('currentUser');
}
selectedBook: Book | undefined;

  showBorrowBookModal(book: Book): void {
    this.selectedBook = book;
  }

  borrowBook(bookId : number): void {
    const borrowedDate = new Date();
    if (this.currentUserDetail && this.currentUserDetail.tokensAvailable === 0) {
      this.showTokenErrorMessage = true;
      setTimeout(() => {
        this.showTokenErrorMessage = false;
      }, 3000);
      return;
    }
    this.bookService.borrowBook(bookId, this.userId, borrowedDate)
      .subscribe(response => {
        console.log(response);
        const index = this.books.findIndex(book => book.bookId === bookId);

        if (index !== -1) {
          this.books[index].isBookAvailable = false;
        }
        const currentUserDetailString = sessionStorage.getItem('currentUserDetail');
        if (currentUserDetailString) {
          const currentUserDetail = JSON.parse(currentUserDetailString);
          currentUserDetail.tokensAvailable -= 1;
          sessionStorage.setItem('currentUserDetail', JSON.stringify(currentUserDetail));
        }

      }, error => {
        console.error(error);
      });
  }
  getId(){
    const currentUser = sessionStorage.getItem('currentUser');

  if (currentUser) {
    this.userService.getUserIdByUsername(currentUser).subscribe(x => {
      this.userId = x;
    });
  }
  }
}
