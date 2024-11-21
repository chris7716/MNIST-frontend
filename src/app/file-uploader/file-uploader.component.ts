import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-uploader',
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent {
  selectedFile: File | null = null;
  isUploading = false;
  uploadProgress = 0;
  uploadSuccess = false;
  errorMessage: string = '';
  metrics: any;

  constructor(private apiService: ApiService) {}

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.selectedFile = input.files[0];
    }
  }

  // Upload the selected model file
  uploadModel(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a model file first.';
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;
    this.uploadSuccess = false;
    this.errorMessage = '';

    this.apiService.uploadModel(this.selectedFile).subscribe(
      (response: any) => {
        this.isUploading = false;
        this.uploadSuccess = true;
        this.metrics = response;
      },
      (error) => {
        this.isUploading = false;
        this.errorMessage = `Upload failed: ${error.message}`;
      }
    );
  }

  // Reset the uploader
  resetUploader(): void {
    this.selectedFile = null;
    this.isUploading = false;
    this.uploadProgress = 0;
    this.uploadSuccess = false;
    this.errorMessage = '';
    this.metrics = null;
  }
}
