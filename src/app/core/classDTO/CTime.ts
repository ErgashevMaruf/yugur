export class CTime {
    constructor(
        public day: number = 0,
        public month: number = 0,
        public year: number = 0,
        public hour: number = 0,
        public minut: number = 0,
        public second: number = 0,
        public curTime: Date = new Date(0, 0, 0, 0, 0, 0, 0),
        public curFirstRun: boolean = false,
        public timeTest: boolean = false //Для проверки равности дате 0 потому что при 0 он дает гад 31
    ) {}
    public setCurTime() {
        this.curTime = new Date(0, 0, this.day, this.hour, this.minut, 0, 0);
    }
    public checkTime(i) {
        return i < 10 ? '0' + i : i;
    }

    public startTime() {
        this.curTime.setSeconds(this.curTime.getSeconds() + 1);
        this.year = this.checkTime(this.curTime.getFullYear());
        if (this.timeTest) {
            this.day = 0;
        } else {
            this.day = this.checkTime(this.curTime.getDate());
        }
        this.month = this.checkTime(this.curTime.getMonth() + 1);
        this.hour = this.checkTime(this.curTime.getHours());
        this.minut = this.checkTime(this.curTime.getMinutes());
        this.second = this.checkTime(this.curTime.getSeconds());
        var self = this;
        setTimeout(function () {
            self.startTime();
        }, 1000);
    }
    public startMinusTime() {
        this.curTime.setSeconds(this.curTime.getSeconds() - 1);
        this.year = this.checkTime(this.curTime.getFullYear());
        if (this.timeTest) {
            this.day = 0;
        } else {
            this.day = this.checkTime(this.curTime.getDate());
        }
        this.month = this.checkTime(this.curTime.getMonth());
        this.hour = this.checkTime(this.curTime.getHours());
        this.minut = this.checkTime(this.curTime.getMinutes());
        this.second = this.checkTime(this.curTime.getSeconds());
        var self = this;
        setTimeout(function () {
            self.startMinusTime();
        }, 1000);
    }
}
