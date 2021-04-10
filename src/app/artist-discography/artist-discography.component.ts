import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  albums: any;
  artist: any;

  private artistSubscription;
  private albumSubscription;

  constructor(private dataRetriever: MusicDataService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.artistSubscription = this.dataRetriever.getArtistById(this.router.snapshot.params['id']).subscribe(
      data => { this.artist = data }
    );

    this.albumSubscription = this.dataRetriever.getAlbumsByArtistId(this.router.snapshot.params['id']).subscribe(
      data => {
        this.albums = data.items.filter((album, index, next) => {
          return index === next.findIndex((item) => (
            item.name === album.name
          ));
        });
      });
  }

  ngOnDestroy(): void {

    this.artistSubscription.unsubscribe();
    this.albumSubscription.unsubscribe();
  }

}

