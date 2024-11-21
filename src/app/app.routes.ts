import { Routes } from '@angular/router';
import { MetricsComponent } from './metrics/metrics.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

export const routes: Routes = [
  { path: '', redirectTo: '/metrics', pathMatch: 'full' },
  { path: 'metrics', component: MetricsComponent },
  { path: 'test', component: FileUploaderComponent },
];
