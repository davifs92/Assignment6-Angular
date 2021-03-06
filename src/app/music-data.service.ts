import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>('https://api.spotify.com/v1/browse/new-releases', { headers: { Authorization: `Bearer ${token}` } });
    }));
  }

  getArtistById(id): Observable<SpotifyApi.SingleArtistResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums`, {
        params: {
          include_groups: 'album,single',
          limit: '50'
        }
        , headers: { "Authorization": `Bearer ${token}` }
      });
    }));
  }

  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}?market=US`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));

  }

  addToFavourites(id): Observable<[String]> {
    return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, id);

  }

  removeFromFavourites(id): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      if (favouritesArray.length <= 0) {
        return new Observable(o => o.next({ tracks: [] }));
      }
      const favoriteItems = favouritesArray.join();
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favoriteItems}`, { headers: { "Authorization": `Bearer ${token}` } });
      }));
    }));
  }

  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites `).pipe(mergeMap((favouritesArray) => {
      if (favouritesArray.length <= 0) {
        return new Observable(o => o.next({ tracks: [] }));
      }
      const favoriteItems = favouritesArray.join();
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favoriteItems}`, { headers: { "Authorization": `Bearer ${token}` } });
      }));
    }));
  }
}