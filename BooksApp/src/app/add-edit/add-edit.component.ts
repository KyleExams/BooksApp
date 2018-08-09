import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';

import { Book } from "../../models";

@Component({
	selector: 'add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
	bookForAddEdit: Book = {
		GUID: "00000000-0000-0000-0000-000000000000",
		Name: "",
		Author: "",
		CreatedAt: new Date(),
		UpdatedAt: null
	};
	pristineBook: Book = this.bookForAddEdit;
	isEdit: boolean = false;

	public constructor(private route: ActivatedRoute,
		private http: HttpClient,
		private router: Router,
		private toastr: ToastrService) { }

	public ngOnInit(): void {
		this.route.params.subscribe(params => {
			if (params['guid']) {
				this.GetBookForEdit(params['guid']);
				this.isEdit = true;
			}
		});
	}

	public SaveBook(): void {
		if (this.isEdit) {
			this.http.put("http://localhost:4100/api/Books/" + this.bookForAddEdit.GUID, this.bookForAddEdit, httpOptions)
				.subscribe(
				res => {
					this.router.navigateByUrl('/');
				},
				err => {
					this.toastr.error('Error', err.error.Message);
				});
		} else {
			this.http.post("http://localhost:4100/api/Books", this.bookForAddEdit, httpOptions)
				.subscribe(
				res => {
					this.router.navigateByUrl('/');
				},
				err => {
					this.toastr.error('Error', err.error.Message);
				});
		}
	}

	public cancelAddEdit(): void {
		this.router.navigateByUrl('/');
	}

	public isBookPristine(): boolean {
		return this.bookForAddEdit.Name == this.pristineBook.Name &&
			this.bookForAddEdit.Author == this.pristineBook.Author;
	}

	private GetBookForEdit(guid: string): void {
		this.http.get<Book>("http://localhost:4100/api/Books/" + guid)
			.subscribe(
			res => {
				this.bookForAddEdit = res;
				this.pristineBook = { ...this.bookForAddEdit };
			},
			err => {
				this.toastr.error('Error', err.error.Message);
			});
	}
}

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
