import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

import { Book } from "../models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    books: Book[];

    public constructor(private http: HttpClient,
        private router: Router,
        private toastr: ToastrService) { }

    public ngOnInit(): void {
        this.LoadBooks();
    }

    private LoadBooks(): void {
        this.http.get<Book[]>("http://localhost:4100/api/Books")
            .subscribe(
                res => {
                    this.books = res;
                },
                err => {
                    this.toastr.error('Error', err.error);
                });
    }
}
