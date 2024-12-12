import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appStringToHtml]',
    standalone: true,
})
export class StringToHtmlDirective {
    @Input({ required: true })
    public set appStringToHtml(v: string) {
        let htmlelement = new DOMParser().parseFromString(v, 'text/html');
        this.elementRef.nativeElement.insertAdjacentHTML(
            'afterbegin',
            htmlelement.documentElement.outerHTML
        );
    }
    constructor(private elementRef: ElementRef) {}
}
