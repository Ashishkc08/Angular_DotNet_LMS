import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BorrowedBooksComponent } from './components/borrowed-books/borrowed-books.component';
import { BooksLentComponent } from './components/books-lent/books-lent.component';
import { LendBookComponent } from './components/lend-book/lend-book.component';
import { AuthGuard } from './services/auth.gaurd';
import { AuthGuardLoggedIn } from './services/auth.loggedin.gaurd';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLoggedIn] },
  { path: '', component: HomepageComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuardLoggedIn] },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'books/borrowed/:id', component: BorrowedBooksComponent, canActivate: [AuthGuard] },
  { path: 'books/lent/:id', component: BooksLentComponent, canActivate: [AuthGuard] },
  { path: 'addbook', component: LendBookComponent, canActivate: [AuthGuard], },
  { path: '**', component: HomepageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
