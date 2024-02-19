import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/books.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    this.getBookDetails();
  }

  getBookDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.bookService.getBookById(+id).subscribe(
        book => {
          this.book = book;
        },
        error => {
          console.error('Error fetching book details:', error);
        }
      );
    } else {
      console.error('Invalid book ID:', id);
    }
  }
  getStarRating(): string {
    const rating = this.book?.rating || 0;

    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    let starRatingString = '';

    for (let i = 0; i < fullStars; i++) {
      starRatingString += '<i class="fas fa-star"></i>';
    }

    if (halfStar) {
      starRatingString += '<i class="fas fa-star-half-alt"></i>';
    }

    for (let i = 0; i < 5 - fullStars - (halfStar ? 1 : 0); i++) {
      starRatingString += '<i class="far fa-star"></i>';
    }

    return starRatingString;
  }

  }

