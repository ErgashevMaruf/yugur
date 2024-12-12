import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ],
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
    @Input() selectOne = true;
    @Input() borderColor;
    @Input() border = 0;
    @Input() background = '#6E62E563';
    @Input() width = 18;
    @Input() height = 18;
    @Input() borderRadius = 2;
    @Output() outputParent = new EventEmitter<string>();
    show: boolean;

    constructor() {}
    ngOnInit(): void {}

    changeState() {
        this.show = !this.show;
        this.writeValue(this.show);
        this.onChange(this.show);
        this.outputParent.emit('');
    }
    onChange: (data: any) => void;

    onTouched: () => void;

    writeValue(state: any): void {
        this.show = state;
    }
    registerOnChange(fn: (data: any) => void) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
