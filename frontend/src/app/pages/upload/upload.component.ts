import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  download = {
    filename: 'CSV Template',
    url: 'assets/download/CSV_TEMPLATE.csv',
  };

  /* DOWNLOAD TEMPLATE */
  downloadFile(url: any, fileName: any) {
    fetch(url, {
      method: 'get',
      mode: 'no-cors',
      referrerPolicy: 'no-referrer',
    })
      .then((res) => res.blob())
      .then((res) => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', fileName);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
      });
  }

  /* UPLOAD FILE */


  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File = null as any; // Variable to store file

  // Inject service
  constructor(
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
    console.log(event.target.files[0]); 
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    if(this.file) {
      this.fileUploadService.upload(this.file).subscribe((event: any) => {
        alert("Uploaded")
    })
      /* if (typeof event === 'object') {
        // Short link via api response
        this.shortLink = event.link;

        this.loading = false; // Flag variable
      } */
    } else {
      alert("Please select a file first")
    }
  }
}

