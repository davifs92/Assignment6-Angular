import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from 'src/app/music-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: any;

  private newReleasesSub;

  constructor(private dataRetriever: MusicDataService, private router: Router) { }

  navigateToAlbum(e, id) {
    this.router.navigate(['/album', id]);
  }
  ngOnInit(): void {
    this.newReleasesSub = this.dataRetriever.getNewReleases().subscribe(data => { this.releases = data.albums.items });

  }

  ngOnDestroy() {
    this.newReleasesSub.unsubscribe();
  }

}
