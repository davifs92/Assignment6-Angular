import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  results: any;
  searchQuery: any;
  private queryParams


  constructor(private dataRetriever: MusicDataService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.queryParams = this.router.queryParamMap.subscribe((params) => {
      this.searchQuery = this.router.snapshot.queryParams['q'];

      this.dataRetriever.searchArtists(this.searchQuery).subscribe((data) => {
        let artists = data.artists.items;

        this.results = artists.filter((artist: any) => artist.images.length > 0);
      });
    });
  }

  ngOnDestroy(): void {

    this.queryParams.unsubscribe();
  }

}
