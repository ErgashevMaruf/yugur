import { Directive, OnDestroy, OnInit, AfterViewInit, Input, Output, EventEmitter, ElementRef, Renderer2 } from "@angular/core";
import { Subject, delay, filter } from "rxjs";

@Directive({
  selector: '[observeVisibility]',
  standalone:true
})
export class ObserveVisibilityDirective{
  @Input() appIntersection: IntersectionObserverInit = {};
  @Input() first:boolean
  @Output() viewChange = new EventEmitter();
  observer: IntersectionObserver;
  constructor(private el: ElementRef, private renderer: Renderer2,) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      const e = entries[0];
    if(window.scrollY || this.first)
    {
      this.renderer.removeClass(this.el.nativeElement,'section--hidden')
    }
    }, this.appIntersection);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.el.nativeElement);
    this.observer.disconnect();
  }
 
}