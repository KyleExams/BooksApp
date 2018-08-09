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
    bookForEdit: Book = null;

    public constructor(private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService) { }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params['guid']) {
                this.GetBookForEdit(params['guid']);
            } else {
                this.bookForEdit = null;
            }
        });
    }

    public SaveBook(addEditBookForm: NgForm): void {
        console.log(addEditBookForm.value);
        console.log(this.bookForEdit);
        if (this.bookForEdit == null) {
            this.http.post("http://localhost:4100/api/Books", addEditBookForm.value, httpOptions)
                .subscribe(
                    res => {
                        this.router.navigateByUrl('/');
                    },
                    err => {
                        this.toastr.error('Error', err.error);
                    });
        } else {
            this.http.put("http://localhost:4100/api/Books/" + this.bookForEdit.guid, addEditBookForm.value, httpOptions)
                .subscribe(
                    res => {
                        this.router.navigateByUrl('/');
                    },
                    err => {
                        this.toastr.error('Error', err.error);
                    });
        }
    }

    public cancelAddEdit(): void {
        this.router.navigateByUrl('/');
    }

    private GetBookForEdit(guid: string): void {
        this.http.get<Book>("http://localhost:4100/api/Books/" + guid)
            .subscribe(
                res => {
                    this.bookForEdit = res;
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
