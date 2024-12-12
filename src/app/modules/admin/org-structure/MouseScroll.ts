export class MouseScroll {
    constructor(
        public _startX: number = 0,
        public _startY: number = 0,
        public _offsetX: number = 0,
        public _offsetY: number = 0,
        public _zoom: number = 100,
        public onMouseMoveC: boolean = false
    ) {}
    public onMouseDown($event, el) {
        this._startX = $event.clientX;
        this._startY = $event.clientY;
        this._offsetX = el.scrollLeft;
        this._offsetY = el.scrollTop;
        this.onMouseMoveC = true;
    }
    public onMouseUp($event) {
        this.onMouseMoveC = false;
    }
    public onMouseMove($event, el) {
        if (this.onMouseMoveC) {
            el.scrollLeft = el.scrollLeft + $event.clientX - this._startX;
            el.scrollTop = el.scrollTop + $event.clientY - this._startY;
            //   el.scrollLeft = this._offsetX + $event.clientX - this._startX;
            //   el.scrollTop = this._offsetY + $event.clientY - this._startY;
        }
    }
    onScrollPlus($event, org) {
        if (this.onMouseMoveC == false) {
            //console.log(org);
            this._zoom += 10;
            org.el.nativeElement.style.zoom = this._zoom + '%';
            //console.log(org.el.nativeElement.style);
        }
    }
    onScrollMinus($event, org) {
        if (this.onMouseMoveC == false) {
            if (this._zoom != 1) {
                this._zoom -= this._zoom <= 10 ? 1 : 10;
            }
            org.el.nativeElement.style.zoom = this._zoom + '%';
            //console.log(org.el.nativeElement.style);
        }
    }
}
