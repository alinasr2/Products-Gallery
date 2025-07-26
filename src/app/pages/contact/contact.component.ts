import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../services/form/form.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private readonly formService = inject(FormService);
  submissionState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  form:FormGroup = new FormGroup({
    name: new FormControl(null,Validators.required),
    email: new FormControl(null,[Validators.email,Validators.required]),
    subject: new FormControl(null,Validators.required),
    message: new FormControl(null,Validators.required),
  });

  submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
  } else {
    this.submissionState = 'loading';
    this.formService.sendMessage(this.form.value).subscribe({
      next: () => {
        this.submissionState = 'success';
        this.form.reset();
        setTimeout(() => this.submissionState = 'idle', 3000);
      },
      error: () => {
        this.submissionState = 'error';
        setTimeout(() => this.submissionState = 'idle', 3000);
      }
    });
  }
}
}