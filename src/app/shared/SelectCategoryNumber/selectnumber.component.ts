import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
    forwardRef,
} from '@angular/core';
import {
    transition,
    trigger,
    state,
    style,
    animate,
} from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { BibStatus, BibType, EventBibDTO } from 'nswag-api/nswag-api-marathon';
import { TranslocoService } from '@ngneat/transloco';
@Component({
    selector: 'app-selectnumber',
    templateUrl: './selectnumber.component.html',
    styleUrls: ['./selectnumber.component.css'],
    animations: [
        // Each unique animation requires its own trigger. The first argument of the trigger function is the name
        trigger('rotatedState', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rotated', style({ transform: 'rotate(180deg)' })),
            transition('rotated => default', animate('200ms ease-out')),
            transition('default => rotated', animate('200ms ease-in')),
        ]),
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectnumberComponent),
            multi: true,
        },
    ],
})
export class SelectnumberComponent implements ControlValueAccessor, OnChanges, OnInit {
    @Input() mainInputClass = '';
    @Input() openMenuClass = '';
    @Input() info: EventBibDTO[] = [];
    @Input() select = 'CHOOSE';
    @Input() status: string;
    isSearch = false;
    @Input() id: number;
    @Output() signal = new EventEmitter<{ state: boolean; element: number }>();
    @ViewChild('placeholder') placeholder!: ElementRef;
    openBox = 'default';
    selectAllBoolean = false;
    allelements: BehaviorSubject<EventBibDTO[]> = new BehaviorSubject<
        EventBibDTO[]
    >([]);
    show = false;

    borderState = false;

    workLazyScroll = true;

    multipleChoose: EventBibDTO[] = [];

    cleanSearch: string | number

    stepper = 10;

    constructor(private eRef: ElementRef,private translocoService: TranslocoService) {}

    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.show = false;
            this.openBox = 'default';
        }
        if (
            this.multipleChoose.length == 0 &&
            this.borderState == false &&
            this.openBox != 'default'
        ) {
            this.borderState = true;
        }
    }

    openMenu() {
        this.openBox = this.openBox == 'default' ? 'rotated' : 'default';
        this.show = !this.show;
        if(!this.show) {this.cleanSearch = ''; this.searchNumber('')}
    }
    ngOnInit(): void {
        if(this.select=='CHOOSE')
            {
                this.select = this.translocoService.translate('CHOOSE');
            }
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.allelements.next(changes['info'].currentValue);
        if (changes['info'].currentValue) {
            this.allelements.next(
                changes['info'].currentValue.slice(0, this.stepper)
            );
        }
    }
    ngAfterViewInit(): void {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && this.workLazyScroll) {
                    this.stepper += 10;
                    this.allelements.next(this.info.slice(0, this.stepper));
                }
            });
        }, options);

        observer.observe(this.placeholder.nativeElement);
    }
    addOrRemoveSelect(value: number, index: number) {
        this.borderState = false;
        let findArrayEl = this.multipleChoose.findIndex(
            (el: EventBibDTO) => el.bibCode === value
        );
        if (findArrayEl !== -1) {
            this.signal.emit({
                state: false,
                element: this.multipleChoose[findArrayEl].bibCode,
            });
            this.multipleChoose.splice(findArrayEl, 1);
            this.writeValue(this.multipleChoose);
            this.onChange(this.multipleChoose);
        } else {
            let evenBibDTO = new EventBibDTO({
                id: 0,
                bibCode: value,
                status: BibStatus.Active,
                bibType: BibType[this.status],
            });
            if (this.id) {
                evenBibDTO.eventId = this.id;
            }
            this.multipleChoose.push(evenBibDTO);
            this.signal.emit({ state: true, element: value });
            this.writeValue(this.multipleChoose);
            this.onChange(this.multipleChoose);
        }
    }

    data: any;

    onChange = (value: any) => {};
    onTouched = () => {};

    writeValue(obj: any): void {
        this.multipleChoose = obj;

        this.data = obj;
    }
    registerOnChange(fn: (data: any) => void) {
        if (this.data) {
            this.multipleChoose = this.data;
        }
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    selectedState(value: number) {
        return this.multipleChoose.find((el) => el.bibCode == value)
            ? true
            : false;
    }
    searchNumber(searchNumber: number | string) {
        this.workLazyScroll = false;
        if (!searchNumber) {
            this.isSearch = false;
            this.workLazyScroll = true;
            this.stepper = 10;
            this.allelements.next(this.info.slice(0,this.stepper));
            return;
        }
        this.isSearch = true;
        let numbers = this.info.filter((el) => el.bibCode == +searchNumber);
        this.allelements.next(numbers);
    }
    removeSearch()
    {
        this.isSearch = false;
        this.cleanSearch = '';
        this.workLazyScroll = true;
        this.allelements.next(this.info.slice(0,this.stepper));
    }
}
