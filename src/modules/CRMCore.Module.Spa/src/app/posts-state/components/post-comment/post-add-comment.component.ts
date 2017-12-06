import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-add-comment',
  templateUrl: './post-add-comment.component.html'
})
export class PostAddCommmentComponent implements OnInit {
  comment: FormGroup;
  @Output() addComment = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {
    this.comment = new FormGroup(
    {
      content : new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  onSubmit({ value, valid }: { value: string, valid: boolean }) {
    console.log(value, valid);
    if (valid) {
      this.addComment.emit(value);
    }
  }
}
