import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  baseUrl = "http://localhost:8080/api/users"

  userObj:any =  {
    first_name : '',
    last_name : '',
    email : '',
    password : '',
  }

  http = inject(HttpClient);
  router = inject(Router)

  onSingup() {
    this.http.post(this.baseUrl, this.userObj).subscribe((res : any) => {
      if (res) {
        localStorage.setItem("user", JSON.stringify(res))
        this.router.navigateByUrl('/')
      } 
    })
  }
}
