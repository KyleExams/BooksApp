import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

import { Book } from "../../models";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	books: Book[];

	public constructor(private http: HttpClient,
		private router: Router,
		private toastr: ToastrService) { }

	public ngOnInit(): void {
		this.LoadBooks();
	}

	public AddBook(): void {
		this.router.navigateByUrl('add-edit');
	}

	public EditBook(guid: string): void {
		this.router.navigateByUrl('add-edit/' + guid);
	}

	public DeleteBook(guid: string): void {
		this.http.delete("http://localhost:4100/api/Books/" + guid, httpOptions)
			.subscribe(
			res => {
				this.LoadBooks();
			},
			err => {
				this.toastr.error('Error', err.error.Message);
			});
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

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};