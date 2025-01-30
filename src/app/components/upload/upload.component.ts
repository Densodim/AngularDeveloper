import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {CommonModule} from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import {actions} from '../../../store/data.actions';

@Component({
  selector: 'Upload',
  imports: [CommonModule, FileUploadModule],
  templateUrl: './upload.component.html',
  standalone: true,
  styleUrl: './upload.component.less'
})
export class UploadComponent {
  constructor(private store: Store) {

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
          this.store.dispatch(actions({data: jsonData}));
        }

      } catch (error) {
        alert('Ошибка обработки JSON');
      }
    };

    reader.readAsText(file);
  }
}
