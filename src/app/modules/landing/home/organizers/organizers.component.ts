import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../services/gallery.service';
import { MaskService } from 'app/modules/services/mask.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBackClient, FeedBackDTO, FeedType } from 'nswag-api-marathon';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-organizers',
    templateUrl: './organizers.component.html',
    styleUrls: ['./organizers.component.scss'],
})
export class OrganizersComponent implements OnInit {
    phoneMask: string;
    constructor(
        private gallery: GalleryService,
        public maskServie: MaskService,
        private fb:FormBuilder,
        private feedbackClient:FeedBackClient,
        private dialog:MatDialog
    ) {}

    feedback: FormGroup

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5,
        },
        {
            breakpoint: '768px',
            numVisible: 3,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
        },
    ];
    ngOnInit() {
        this.phoneMask = this.maskServie.phones['+998'];
        // this.gallery.getCategories().subscribe((res) => {
        //     this.images = res;
        // });
        this.feedback = this.fb.group({
            title:['', Validators.required],
            tel:['', Validators.required],
            email:['',Validators.required],
            description:['', Validators.required]
        })

    }
    sendFeedBack()
    {
      let value= this.feedback.value
      let all = value.title + '   ' +'    '+ value.tel+'   '+ value.email+'    '+ value.description;
      let feedback =  new FeedBackDTO();
      feedback.text = all;
      feedback.type = FeedType.Suggestion;
      this.feedback.reset();
      this.feedbackClient.onSave(feedback).subscribe(res=>{
        this.dialog.open(SuccessComponent, {
            data: 'thankyoufeedback'
        })
      })
    }
}
