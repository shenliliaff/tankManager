import { Component } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-basic-list-edit',
  templateUrl: './edit.component.html',
})
export class FAQListEditComponent {
  record: any = {};
  schema: SFSchema = {
    properties: {
      question: { type: 'string', title: '问题', maxLength: 200 },
      anwser: {
        type: 'string',
        title: '答案',
        ui: {
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
        },
      },
      category: {
        type: 'string',
        title: '分类',
        enum: [
          { value: 'main', label: 'main' },
          { value: 'not main', label: 'not main' },
        ],
      },
      lang: {
        type: 'string',
        title: '语言',
        enum: [
          { value: 'English', label: 'English' },
          { value: 'Chinese', label: 'Chinese' },
          { value: 'Russian', label: 'Russian' },
        ],
      },
    },
    required: ['answer', 'question', 'category', 'lang'],
    ui: {
      spanLabelFixed: 100,
      grid: { span: 24 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService) {}

  save(value: any) {
    this.msgSrv.success('保存成功');
    this.modal.close(value);
  }

  close() {
    this.modal.destroy();
  }
}
