import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-metrics',
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css'],
})
export class MetricsComponent implements OnInit {
  datasource: any;
  metrics: any[] = [];
  page = 1;
  pageSize = 10;

  constructor(private apiService: ApiService) {}

  displayedColumns: string[] = [
    'model_name',
    'accuracy',
    'precision',
    'recall',
    'f1_score',
    'confusion_matrix',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.apiService.fetchMetrics(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.metrics = data;
        this.datasource = new MatTableDataSource<MetricElement>(data);
        this.datasource.paginator = this.paginator;
      },
      error: (err) => console.error('Error fetching metrics:', err),
    });
  }
}

export interface MetricElement {
  model_name: any;
  accuracy: any;
  precision: any;
  recall: any;
  f1_score: any;
  confusion_matrix: any;
}
