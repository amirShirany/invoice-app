import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../add-dialog/add-dialog';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class InvoicePage {
  displayedColumns: string[] = ['title', 'quantity', 'price', 'actions'];
  invoices = [
    { title: 'محصول اول', quantity: 10, price: 1000 },
    { title: 'محصول دوم', quantity: 2, price: 2000 },
    { title: 'محصول سوم', quantity: 8, price: 5000 },
    { title: 'محصول چهارم', quantity: 5, price: 500 },
  ];

  getTotalPrice(): number {
    return this.invoices.reduce((total, invoice) => total + invoice.price, 0);
  }

  constructor(public dialog: MatDialog) {}

  // ویرایش فاکتور
  editInvoice(invoice: any): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { ...invoice }, // ارسال کپی داده به دیالوگ
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.invoices.findIndex((inv) => inv === invoice); // پیدا کردن فاکتور
        if (index !== -1) {
          this.invoices[index] = result; // به‌روزرسانی اطلاعات فاکتور
          this.invoices = [...this.invoices]; // به‌روزرسانی مرجع آرایه
        }
      }
    });
  }

  // حذف فاکتور
  deleteInvoice(element: any): void {
    this.invoices = this.invoices.filter((invoice) => invoice !== element);
  }

  //اضافه کردن محصول
  openaddDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { title: '', quantity: null, price: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.invoices.push(result);
        this.invoices = [...this.invoices, result];
      }
    });
  }
}
