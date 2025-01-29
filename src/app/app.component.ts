import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UploadComponent} from './upload/upload.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'AngularDeveloper';
}
