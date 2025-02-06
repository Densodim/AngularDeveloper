import {ComponentFixture, TestBed} from "@angular/core/testing"
import {FileHistoryComponent} from "./file-history.component"
import {of} from 'rxjs';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {AsyncPipe} from '@angular/common';
import {MessageServiceComponent} from '../../../lib/message-service/message-service.component';


//Make Mok
const fileFeatureMock = {
  selectHistory: () => of(['file1.json', 'file2.json']),
  selectFileFromHistory: () => of(null),
  FileFromHistory: jasmine.createSpyObj('FileFromHistory'),
}

const messageServiceMock = jasmine.createSpyObj("MessageServiceComponent", ["showSuccess"]);

describe("FileHistoryComponent", () => {
  let component: FileHistoryComponent
  let fixture: ComponentFixture<FileHistoryComponent>


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableModule, Button, AsyncPipe],
      declarations:[FileHistoryComponent],
      providers:[
        {provide:MessageServiceComponent, useValue: messageServiceMock},
        {provide: 'fileFeature', useValue: fileFeatureMock},
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(FileHistoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})
