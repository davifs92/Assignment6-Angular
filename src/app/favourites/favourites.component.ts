import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any>;

  constructor(private dataRetriever: MusicDataService) { }

  ngOnInit(): void {
    this.dataRetriever.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id: any) {
    this.dataRetriever.removeFromFavourites(id).subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

}


