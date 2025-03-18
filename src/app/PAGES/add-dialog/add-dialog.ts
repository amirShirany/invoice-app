import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'addDialog',
  standalone: true,
  templateUrl: './add-dialog.html',
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
  ],
})
export class DialogComponent {
  title: string = '';
  quantity: number | null = null;
  price: number | null = null;
  localTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = this.data || { title: '', quantity: null, price: null }; // مقداردهی پیش‌فرض
  }

  invoices: any[] = []; // آرایه برای ذخیره فاکتورها

  onAdd(): void {
    if (
      this.data.title &&
      this.data.quantity !== null &&
      this.data.price !== null
    ) {
      this.dialogRef.close(this.data); // ارسال داده به کامپوننت مادر
    } else {
      alert('مشکل در پر کردن اطلاعات!');
    }
  }

  onCancel() {
    this.dialogRef.close(); // بستن دیالوگ
  }
}
