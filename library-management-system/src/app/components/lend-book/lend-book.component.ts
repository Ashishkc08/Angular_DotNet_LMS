import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.component.html',
  styleUrls: ['./lend-book.component.css']
})
export class LendBookComponent {


  name: string = '';
  author: string = '';
  genre: string = '';
  description: string = '';
  lentByUserId: number | undefined;
  showSuccessAlert: boolean = false;
  showErrorAlert: { status: boolean, message: string } = { status: false, message: '' };
  constructor(private http: HttpClient) {
    const currentUserDetailString = sessionStorage.getItem('currentUserDetail');
    const currentUserDetail = currentUserDetailString ? JSON.parse(currentUserDetailString) : null;

    this.lentByUserId = currentUserDetail?.userId ? +currentUserDetail.userId : undefined;
   }

  onSubmit() {
    if (this.name && this.author && this.genre && this.description){
    const newBook = {
      name: this.name,
      author: this.author,
      genre: this.genre,
      description: this.description,
      lentByUserId: this.lentByUserId
    };

    this.http.post<any>('https://localhost:7114/api/books/AddBook', newBook)
      .subscribe(response => {
        console.log(response);
        this.showSuccessAlert = true;
        const currentUserDetailString = sessionStorage.getItem('currentUserDetail');
        if (currentUserDetailString) {
          const currentUserDetail = JSON.parse(currentUserDetailString);
          currentUserDetail.tokensAvailable += 1;
          sessionStorage.setItem('currentUserDetail', JSON.stringify(currentUserDetail));
        }
        this.resetForm();
        setTimeout(() => {
          this.showSuccessAlert = false;

        }, 3000);
      }, error => {
        console.error(error);
        this.showErrorAlert.status = true;
        this.showErrorAlert.message = "Something Went Wrong"
        setTimeout(() => {
          this.showErrorAlert.status = false;

        }, 3000);
      });
  }
  else
  {
  this.showErrorAlert.status = true;
  this.showErrorAlert.message = "All fields are required"
  setTimeout(()=>{
    this.showErrorAlert.status = false;
  },3000)
}
}

  resetForm() {
    this.name = '';
    this.author = '';
    this.genre = '';
    this.description = '';
  }
  }




