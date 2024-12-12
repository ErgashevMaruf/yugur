import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseScrollbarDirective } from '@fuse/directives/scrollbar';

@Component({
    selector: 'navbar',
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl  : './navbar.component.html',
    styles: [
        `
            :host {
                width: 100% !important;
                height: 100% !important;

            }
        `,
    ]
})
export class NavbarComponent implements OnInit
{

    @Input() styles: any;
    @Input() parentClasses: string = '';
    @Input() title: string = 'Title';
    @Input() maticon: string = 'group';
    @Output() addButton = new EventEmitter<void>();
    @Input() showExportExcel = false;
    @Output() expoerExcelButton = new EventEmitter<void>();
    @Input() isShowAddButton: boolean = true;
    @Input() dt: any = undefined;
    @Input() leftBtn = false;
    @Input() leftBtnTitle: string = 'left btn title'
    @Output() lefBtnClick = new EventEmitter<void>();

    private _fuseScrollbarDirectives!: QueryList<FuseScrollbarDirective>;

    constructor() { }

    /**
   * Setter for fuseScrollbarDirectives
   */
    @ViewChildren(FuseScrollbarDirective)
    set fuseScrollbarDirectives(fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>)
    {
        // Store the directives
        this._fuseScrollbarDirectives = fuseScrollbarDirectives;
    }

    ngOnInit()
    {

    }
     /**
     * Getter for current year
     */
     get currentYear(): number {
        return new Date().getFullYear();
    }

    onResized(): void
    {
        this._fuseScrollbarDirectives?.forEach((fuseScrollbarDirective) =>
        {
            fuseScrollbarDirective.elementRef.nativeElement.scrollTo({
                top: 0
            })
            fuseScrollbarDirective.update();
        });
    }

}
