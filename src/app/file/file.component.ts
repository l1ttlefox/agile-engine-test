import {ChangeDetectionStrategy, Component, OnInit, Inject} from '@angular/core';
import {TextService} from '../text-service/text.service';
import {Synonym, SynonymService} from '../synonym-service/synonym.service';
import {DOCUMENT} from '@angular/common';
import {ControlPanelComponent} from '../control-panel/control-panel.component';
import {SynonymsListComponent} from '../synonyms-list/synonyms-list.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ControlPanelComponent, SynonymsListComponent]
})
export class FileComponent implements OnInit {
  text$: Promise<string>;
  savedSelection: Range | null;
  selectedText: string;
  synonyms: Observable<Synonym[]>;
  chosenSynonym: string;

  constructor(
    private textService: TextService,
    private synonymService: SynonymService,
    @Inject(DOCUMENT) private doc: any,
    private controlPanel: ControlPanelComponent
  ) {
  }

  ngOnInit() {
    this.text$ = this.textService.getMockText();
  }

  private getSynonyms(word: string) {
    this.synonyms = this.synonymService.getSynonyms(word);
  }

  public getSynonym(synonym: string) {
    this.doc.execCommand('insertText', false, synonym);
    this.chosenSynonym = synonym;
  }

  public manageSelection = (): void => {
    if (this.doc.getSelection) {
      const sel = this.doc.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        this.savedSelection = sel.getRangeAt(0);
        this.selectedText = sel.toString();
        this.getSynonyms(this.selectedText);
      }
    } else if (this.doc.getSelection && this.doc.createRange) {
      this.savedSelection = document.createRange();
    } else {
      this.savedSelection = null;
    }
  }

  onAreaClick() {
    this.controlPanel.triggerButton();
    if (this.doc.getSelection) {
      this.manageSelection();
    }
  }
}
