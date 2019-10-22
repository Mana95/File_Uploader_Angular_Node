import { Component, OnInit, Input, Output, EventEmitter,OnChanges, 
   ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, AfterContentInit, Directive } from '@angular/core';
  import { ChildboxComponent } from '../childbox/childbox.component';
import { ActivatedRoute } from '@angular/router';
import {JobService} from '../_services';
  
  
  @Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[datacontainer]',
  })


  export class DatacontainerDirective  {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
  }

@Component({
  selector: 'app-reply-comments',
  templateUrl: './reply-comments.component.html',
  styleUrls: ['./reply-comments.component.css']
})
export class ReplyCommentsComponent implements OnInit,OnChanges {
  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Array<object> = [];
  commentData: any;
  uniqueId: any;

  @ViewChildren (DatacontainerDirective) entry: QueryList<DatacontainerDirective>;
  
  constructor(private resolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private JobService: JobService
    ) { }

  ngOnInit() {
    this.uniqueId = (this.route.snapshot.paramMap.get('jobid'));
    // alert("This is the Id"+this.uniqueId);
    //   alert("This is the comment" + this.currentUser.username)
    this.JobService.getByIdComments(this.uniqueId)
    .subscribe(
      data => {
       this.commentData = data
        console.log(data);
      }
    );

  }

  ngOnChanges() {
    if (this.postComment !== undefined) {
      console.log('Main array====>', this.postComment);
    }
  }

  removeComment(no) {
    this.postComment.splice(no, 1);
    console.log('After remove array====>', this.postComment);
    this.countComments.emit(this.postComment);
  }

  replyComment(index) {
    this.loadComponent = true;
    const myFactory = this.resolver.resolveComponentFactory(ChildboxComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0 ) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['commentNo'] = index;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.userReplycomment.subscribe(
        data => {
          console.log('Piyali=>', data);
          this.receiveReplyComment(data, index);
        }
      );
      myRef.instance.deletNo.subscribe(
        no => {
          myRef.destroy();
        }
      );
    }
  }

  receiveReplyComment($event, i) {
    this.reply = $event;
    console.log($event);
    this.postComment.forEach((element) => {
      if (element['commentId'] === i) {
        element['replyComment'].push(...$event);
        console.log('Main array after reply comment=>', this.postComment);
      }
    });
    console.log(this.reply);
    this.loadComponent = false;
  }

}
