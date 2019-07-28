import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Synonym} from '../synonym-service/synonym.service';


@Component({
  selector: 'app-synonyms-list',
  templateUrl: './synonyms-list.component.html',
  styleUrls: ['./synonyms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SynonymsListComponent {
  @Input() synonyms: Observable<Synonym[]>;
  @Output() getSynonym = new EventEmitter<string>();

  constructor() {
  }

  public applySynonym(synonym: string) {
    this.getSynonym.emit(synonym);
  }
}
