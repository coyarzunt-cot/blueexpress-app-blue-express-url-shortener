import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '@shared';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { finalize } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { BlueExpress_Service } from '@shared/services/blueExpressService/blueExpress.urlShort.service';
@Component({
  selector: 'app-admin-page',
  templateUrl: './adminCreatePage.component.html',
  styleUrls: ['./adminCreatePage.component.scss'],
  providers: [],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MtxGridModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    ClipboardModule,
    MatChipsModule,
    PageHeaderComponent,
  ],
})
export class AdminCreatePageComponent implements OnInit {
  dataUrl = {
    urlLong: '',
    urlShort: '',
  };

  constructor(private blueExpressService: BlueExpress_Service) {}

  ngOnInit() {}

  async createUrlLong() {
    try {
      console.log('createUrlLong', this.dataUrl);
      this.dataUrl.urlShort = await this.blueExpressService.createUrlShort(this.dataUrl.urlLong);
    } catch (error) {
      console.error('createUrlLong', error);
    }
  }
}
