import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectHistory, selectSelectedFileName} from '../../../store/file/file.reducer';
import {TableModule} from 'primeng/table';
import {AsyncPipe} from '@angular/common';
import {fileActions} from '../../../store/file/file.actions';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-file-history',
  imports: [
    TableModule,
    AsyncPipe,
    Button
  ],
  templateUrl: './file-history.component.html',
  standalone: true,
  styleUrl: './file-history.component.less'
})
export class FileHistoryComponent implements OnInit, AfterViewInit {
  fileHistory$: Observable<any>;
  selectedFile$: Observable<string | null>;


  constructor(private store: Store) {
    this.fileHistory$ = this.store.select(selectHistory);
    this.selectedFile$ = this.store.select(selectSelectedFileName);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  selectFile(fileName: string): any {
    this.store.dispatch(fileActions.selectFileFromHistory({fileName}))
  }

}
