import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent],
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
