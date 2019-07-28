import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Synonym {
  word: string;
  score: number;
  tags: string[];
}


@Injectable()
export class SynonymService {
  synonymUrl = 'https://api.datamuse.com/words';

  constructor(private http: HttpClient) {
  }

  getSynonyms(word: string) {
    return this.http.get<Synonym[]>(this.synonymUrl, {
      params: {
        ml: word,
        max: '5'
      }
    });
  }
}
