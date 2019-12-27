import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FAQListEditComponent } from './edit/edit.component';
import { Widget } from '@delon/form';

@Component({
  selector: 'app-basic-list',
  templateUrl: './FAQ-list.component.html',
  styleUrls: ['./FAQ-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FAQListComponent implements OnInit {
  q: any = {
    status: 'all',
  };
  loading = false;
  data: any[] = [];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.http.get('http://localhost:3000/public/faq').subscribe((res: any) => {
      this.data = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  openEdit(record: any = {}) {
    this.modal.create(FAQListEditComponent, { record }, { size: 'md' }).subscribe(res => {
      if (record.id) {
        record = { ...record, id: 'mock_id', percent: 0, ...res };
      } else {
        this.data.splice(0, 0, res);
        this.data = [...this.data];
      }
      this.cdr.detectChanges();
    });
  }
}
