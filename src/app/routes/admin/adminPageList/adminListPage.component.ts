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
import { TablesRemoteDataService } from './remote-data.service';
import { finalize } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { BlueExpress_Service } from '@shared/services/blueExpressService/blueExpress.urlShort.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

export interface indexPage  {
  next:string,
  last: string
}

@Component({
  selector: 'app-admin-list-page',
  templateUrl: './adminListPage.component.html',
  styleUrls: ['./adminListPage.component.scss'],
  providers: [TablesRemoteDataService],
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MtxGridModule, MatInputModule, MatOptionModule, MatSelectModule, MatCardModule, MatDividerModule, MatListModule,
    PageHeaderComponent],
})


export class AdminListPageComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: 'Url Corta',
      field: 'shortUrl',
      formatter: (data: any) => `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`,
    },
    {
      header: 'Url Larga',
      field: 'longUrl',
      formatter: (data: any) => `<a href="${data.longUrl}" target="_blank">${data.longUrl}</a>`,
    },
    { header: 'Visitas', field: 'countRedirect', type: 'number' },
    {
      header: 'Acción',
      field: 'operation',
      width: '250px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Copiar',
          icon: 'file_copy',
          tooltip: 'Copiar',
          click:( record : any) => {this.copyUrlShort(record)},
        },
        {
          type: 'basic',
          text: 'Borrar',
          icon: 'delete',
          tooltip: 'Borrar',
          color: 'warn',
          pop:  {
            title: '¿Confirma Borrar?',
            closeText: "Cerrar",
            okText: "Ok",
          },
          click:( record : any) => {this.deleteUrlShort(record)},

        },
      ],
    },
  ];

  list: any[] = [];
  isLoading = true;

  listIndexPage: indexPage[] = [];
  indexCurrentPage: number = 0;

  query = {
    startKey: '0',
    limit: 10,
    keySearch: ''
  };

  get params() {
    return this.query;
  }

  constructor(private blueExpressService: BlueExpress_Service) {}

  ngOnInit() {
    this.getList();
  }

  async getList() {
    console.log("getList init this.indexPage", this.listIndexPage)
    console.log("getList init this.indexCurrentPage", this.indexCurrentPage)
    console.log("getList init this.listIndexPage.length", this.listIndexPage.length)
    this.isLoading = true;
   // this.indexPage.last = this.query.startKey;
    const resultList = await this.blueExpressService.getList(this.query.limit,this.query.startKey);
    console.log("getList resultList",resultList)
    this.list = resultList.Items;
    console.log("getList this.list",this.list)

    const indexPage : indexPage = {
      last: this.query.startKey,
      next : resultList.LastEvaluatedKey? resultList.LastEvaluatedKey.urlId : "-1"
    }

    this.listIndexPage[this.indexCurrentPage] = indexPage;

    if(resultList.LastEvaluatedKey){
      this.query.startKey = resultList.LastEvaluatedKey.urlId;
    }

    this.isLoading = false;
    console.log("getList finish this.this.indexCurrentPage", this.indexCurrentPage)
    console.log("getList finish this.indexPage", this.listIndexPage)
  }

  nextPage() {
    console.log("nextPage init this.indexCurrentPage", this.indexCurrentPage)
  // this.indexPage.current =  this.indexPage.next;
  //this.query.startKey = this.listIndexPage[this.indexCurrentPage++].last
   if(this.listIndexPage[this.indexCurrentPage].next !== "-1"){
    this.indexCurrentPage= ++this.indexCurrentPage;
    console.log("nextPage finish this.indexCurrentPage", this.indexCurrentPage)
    this.getList();
   }
  }

  previousPage() {
    this.indexCurrentPage= --this.indexCurrentPage;
    this.query.startKey = this.listIndexPage[this.indexCurrentPage].last
    this.getList();
  }

  async search() {
    this.query.limit = 1;

    const urlParts = this.query.keySearch.split('/');
    const result = await this.blueExpressService.getByUrlShort(urlParts[urlParts.length -1]);
    console.info('search-response', result);
    const itemSearch = {
      shortUrl: result.keySearch,
      longUrl: result.longUrl,
      urlId: result.urlId,
      countRedirect: result.countRedirect,
    }
    this.list = [result];
  }


  reset() {
    this.listIndexPage =[];
    this.indexCurrentPage = 0;
    this.query.startKey = "0";
    this.query.limit = 10;
    this.query.keySearch = "";
    this.getList();
  }

  copyUrlShort(record:any){
    console.log("copyUrlShort record",record)
    navigator.clipboard.writeText(record.shortUrl);
    //alert("record.shortUrl)
  }

  async deleteUrlShort(record:any){
    console.log("deleteUrlShort record.shortUrl",record.shortUrl)
    await this.blueExpressService.deleteUrlShort(record.urlId);
    this.reset();
  }

}
