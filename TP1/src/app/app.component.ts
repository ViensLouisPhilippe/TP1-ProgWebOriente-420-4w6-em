import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { album } from './models/album';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  albums : album[] = [];
  result : boolean = false;
  artist : string = "";

  constructor(public http : HttpClient){}

  async request() : Promise<void>{
    this.result = true;

    //get top album
    //https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json
    
    let albumGet = await lastValueFrom(this.http.get<any>("https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+ this.artist+"&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json"));
    console.log(albumGet);

    this.albums = [];
    // ...
    for(let x of albumGet.topalbums.album){
      this.albums.push(new album(x.name, x.image[2]["#text"]))
    }
    console.log(this.albums);
  }
  async requestSongs(albumSelect : string) : Promise<void>{
    //get info
    //https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9a8a3facebbccaf363bb9fd68fa37abf&artist=Cher&album=Believe&format=json
    let ChansonsGet = await lastValueFrom(this.http.get<any>("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9a8a3facebbccaf363bb9fd68fa37abf&artist="+ this.artist+"&album="+ albumSelect+"&format=json"));
    console.log(ChansonsGet);
  }


  newSearch():void{
    this.result = false;
  }
}
