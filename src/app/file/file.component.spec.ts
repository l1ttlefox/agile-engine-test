import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileComponent } from './file.component';
import { TextService } from '../text-service/text.service';
import {SynonymsListComponent} from '../synonyms-list/synonyms-list.component';
import {SynonymService} from '../synonym-service/synonym.service';
import {HttpClientModule} from '@angular/common/http';

describe('FileComponent', () => {
  let component: FileComponent;
  let fixture: ComponentFixture<FileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileComponent, SynonymsListComponent],
      providers: [TextService, SynonymService],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
