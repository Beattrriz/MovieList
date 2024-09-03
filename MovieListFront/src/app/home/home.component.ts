import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  query: string = '';

  constructor(private router: Router){}

  searchMovies(){
    if(this.query){
      this.router.navigate(['/movies'], {queryParams: {query: this.query}});
    }
  }

}
