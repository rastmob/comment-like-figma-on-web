import { Component } from '@angular/core';
import { Service } from './app.service';
import DataSource from 'devextreme/data/data_source';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})
export class AppComponent {
  dataSource: DataSource;
  

  constructor(service: Service) {
    this.dataSource = service.getDataSource();
  }
}
