import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import {dataActions} from '../../../store/data/data.actions';
import {FileHistoryComponent} from '../file-history/file-history.component';
import {fileActions} from '../../../store/file/file.actions';
import {FileHistory} from '../../../store/file/file.model';
import {selectSelectedFileName} from '../../../store/file/file.reducer';
import {Observable} from 'rxjs';

@Component({
  selector: 'Upload',
  imports: [CommonModule, FileUploadModule, FileHistoryComponent],
  templateUrl: './upload.component.html',
  standalone: true,
  styleUrl: './upload.component.less'
})
export class UploadComponent {
  selectedFileName$: Observable<string | null>;
  selectedFileName: string | null = null;

  constructor(private store: Store) {
    this.selectedFileName$ = this.store.select(selectSelectedFileName);

    // Подписываемся на изменения имени выбранного файла
    this.selectedFileName$.subscribe(fileName => {
      this.selectedFileName = fileName;
    });
  }

  onFileSelected(event: any) {
    const file = event.files[0]; // PrimeNG возвращает объект с массивом `files`
    if (!file) return;

    if (file.type !== 'application/json') {
      alert('Файл должен быть в формате JSON');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл не должен превышать 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (typeof reader.result === "string") {
          const jsonData = JSON.parse(reader.result);

          const fileHistory: FileHistory = {
            fileName: file.name,
            uploadDate: new Date(),
            jsonDate: jsonData
          };

          this.selectedFileName = file.name;

          this.store.dispatch(dataActions.setData({data: jsonData}));
          this.store.dispatch(fileActions.addFileToHistory({file: fileHistory}))
        }

      } catch (error) {
        alert('Ошибка обработки JSON');
      }
    };

    reader.readAsText(file);
  }

}
