
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interface';

// const GIPHY_API_KEY = 'LcL2nAk33zveKuy93g51K8tJGenialvYgGasZz';

// api.giphy.com/v1/gifs/search?api_key=LcL2nAk33zveKuy93g51K8tJvYgGasZz&q=Valorant&limit=10

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];  //Tipo gif lo creamos en el interface cambiando el nombre

  private _tagsHistory: string[] = [];
  private apiKey: string = 'LcL2nAk33zveKuy93g51K8tJvYgGasZz';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory ( tag: string ): void{
    tag = tag.toLowerCase();

    if ( this._tagsHistory.includes( tag )) {
      this._tagsHistory = this.tagsHistory.filter((oldtag) => oldtag !== tag);



    };
    this._tagsHistory.unshift(tag);
    this._tagsHistory.splice(0,10);
    // if (this._tagsHistory.length > 10){
    //   this._tagsHistory.pop();
    // }

  }


  searchTag ( tag: string ): void {

    if ( tag.length === 0 ) return;

    this.organizeHistory( tag );

    const params = new HttpParams() //este objeto no hay que importarlo, ya está, y nos ayuda a tener la url más organizada pasando parámetros en lugar de todo el chorro de api key de postman
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{ params })
      .subscribe( resp => {
        this.gifList = resp.data;

        //console.log({ gifs: this.gifList} );
      } ) // es un Observable, nos subscribimos para ver lo que va enviando.

    //this._tagsHistory.unshift(tag);

  }

}
