import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: any;
  tracks: any;
  private albumSubscription;

  constructor(private dataRetriever: MusicDataService, private router: ActivatedRoute, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.albumSubscription = this.dataRetriever.getAlbumById(this.router.snapshot.params['id']).subscribe(
      data => { this.album = data }
    );

  }

  ngOnDestroy(): void {
    this.albumSubscription.unsubscribe();

  }

  addToFavourites(trackID: any) {
    this.dataRetriever.addToFavourites(trackID).subscribe(
      (success) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 15000,
        });
      },
      (err) => {
        this.snackBar.open('Error: Failed in adding to favourites', 'Done', {
          duration: 1500,
        });
      }
    );
  }


}