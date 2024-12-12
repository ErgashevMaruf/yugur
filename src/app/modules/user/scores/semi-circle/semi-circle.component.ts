import { AsyncPipe } from '@angular/common';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Renderer2,
    ElementRef,
    ChangeDetectorRef,
    ViewChild,
    AfterViewInit,
    input,
    computed,
} from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { AthletesRankingDTO } from 'nswag-api/nswag-api-marathon';

@Component({
    selector: 'app-semi-circle',
    template: `
        <div
            class="w-full bg-grey50To900 py-6 h-full relative flex flex-col items-center justify-center rounded-[20px]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="178"
                height="178"
                viewBox="0 0 178 178"
                fill="none"
            >
                <path
                    d="M144.925 152.204C150.473 156.805 158.797 156.076 162.517 149.903C168.774 139.519 172.818 127.899 174.331 115.774C176.385 99.3131 173.691 82.608 166.565 67.6279C159.439 52.6478 148.179 40.0172 134.112 31.225C120.045 22.4328 103.758 17.8456 87.1698 18.004C70.582 18.1624 54.3852 23.0599 40.4888 32.1191C26.5923 41.1784 15.5755 54.0217 8.73704 69.1352C1.89857 84.2486 -0.476508 101.002 1.89181 117.421C3.6363 129.515 7.90088 141.056 14.3551 151.318C18.1922 157.419 26.5294 157.989 31.9885 153.283C37.4475 148.577 37.9096 140.379 34.4724 134.044C31.0537 127.743 28.7576 120.857 27.7245 113.695C26.0666 102.201 27.7292 90.474 32.5161 79.8946C37.303 69.3152 45.0148 60.3249 54.7423 53.9834C64.4698 47.6419 75.8076 44.2137 87.419 44.1028C99.0305 43.9919 110.432 47.203 120.279 53.3575C130.125 59.5121 138.007 68.3535 142.996 78.8396C147.984 89.3256 149.87 101.019 148.432 112.542C147.536 119.723 145.372 126.651 142.074 133.016C138.758 139.416 139.377 147.604 144.925 152.204Z"
                    class="fill-main"
                />
                <path
                    d="M147.841 148.416C151.513 151.081 156.689 150.281 158.974 146.361C165.183 135.706 168.932 123.756 169.897 111.39C171.076 96.2867 168.054 81.1511 161.167 67.6573C154.281 54.1634 143.796 42.8368 130.874 34.9298C117.951 27.0227 103.094 22.8433 87.9439 22.8535C72.7942 22.8637 57.9423 27.0631 45.0304 34.9875C32.1184 42.9119 21.6494 54.2526 14.7806 67.7557C7.91185 81.2588 4.91099 96.3984 6.10977 111.501C7.09122 123.865 10.8562 135.81 17.0802 146.457C19.3697 150.373 24.5473 151.166 28.2159 148.497C31.8845 145.828 32.6436 140.71 30.4526 136.737C25.9571 128.585 23.2292 119.543 22.4876 110.201C21.5286 98.1188 23.9293 86.0071 29.4243 75.2046C34.9193 64.4021 43.2946 55.3296 53.6241 48.9901C63.9537 42.6506 75.8351 39.291 87.9549 39.2829C100.075 39.2747 111.961 42.6183 122.299 48.9439C132.637 55.2695 141.024 64.3308 146.534 75.1259C152.043 85.921 154.46 98.0294 153.518 110.112C152.789 119.455 150.073 128.502 145.588 136.659C143.403 140.635 144.169 145.752 147.841 148.416Z"
                    [attr.fill]="'url(#paint0_linear' + index + ')'"
                />
                @if (pathId()==26) {
                <path
                    d="M153.5 144C155.985 144 158 141.985 158 139.5C158 137.015 155.985 135 153.5 135C151.015 135 149 137.015 149 139.5C149 141.985 151.015 144 153.5 144Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==25) {
                <path
                    d="M157.5 134C159.985 134 162 131.985 162 129.5C162 127.015 159.985 125 157.5 125C155.015 125 153 127.015 153 129.5C153 131.985 155.015 134 157.5 134Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==24) {
                <path
                    d="M160.5 123C162.985 123 165 120.985 165 118.5C165 116.015 162.985 114 160.5 114C158.015 114 156 116.015 156 118.5C156 120.985 158.015 123 160.5 123Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==23) {
                <path
                    d="M161.5 112C163.985 112 166 109.985 166 107.5C166 105.015 163.985 103 161.5 103C159.015 103 157 105.015 157 107.5C157 109.985 159.015 112 161.5 112Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==22) {
                <path
                    d="M161.5 100C163.985 100 166 97.9853 166 95.5C166 93.0147 163.985 91 161.5 91C159.015 91 157 93.0147 157 95.5C157 97.9853 159.015 100 161.5 100Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==21) {
                <path
                    d="M158.5 88C160.985 88 163 85.9853 163 83.5C163 81.0147 160.985 79 158.5 79C156.015 79 154 81.0147 154 83.5C154 85.9853 156.015 88 158.5 88Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==20) {
                <path
                    d="M154.5 77C156.985 77 159 74.9853 159 72.5C159 70.0147 156.985 68 154.5 68C152.015 68 150 70.0147 150 72.5C150 74.9853 152.015 77 154.5 77Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==19) {
                <path
                    d="M148.5 67C150.985 67 153 64.9853 153 62.5C153 60.0147 150.985 58 148.5 58C146.015 58 144 60.0147 144 62.5C144 64.9853 146.015 67 148.5 67Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==18) {
                <path
                    d="M140.5 58C142.985 58 145 55.9853 145 53.5C145 51.0147 142.985 49 140.5 49C138.015 49 136 51.0147 136 53.5C136 55.9853 138.015 58 140.5 58Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==17) {
                <path
                    d="M131.5 50C133.985 50 136 47.9853 136 45.5C136 43.0147 133.985 41 131.5 41C129.015 41 127 43.0147 127 45.5C127 47.9853 129.015 50 131.5 50Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==16) {
                <path
                    d="M122.5 44C124.985 44 127 41.9853 127 39.5C127 37.0147 124.985 35 122.5 35C120.015 35 118 37.0147 118 39.5C118 41.9853 120.015 44 122.5 44Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==15) {
                <path
                    d="M113.5 40C115.985 40 118 37.9853 118 35.5C118 33.0147 115.985 31 113.5 31C111.015 31 109 33.0147 109 35.5C109 37.9853 111.015 40 113.5 40Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==14) {
                <path
                    d="M102.5 37C104.985 37 107 34.9853 107 32.5C107 30.0147 104.985 28 102.5 28C100.015 28 98 30.0147 98 32.5C98 34.9853 100.015 37 102.5 37Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==13) {
                <path
                    d="M90.5 35C92.9853 35 95 32.9853 95 30.5C95 28.0147 92.9853 26 90.5 26C88.0147 26 86 28.0147 86 30.5C86 32.9853 88.0147 35 90.5 35Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==12) {
                <path
                    d="M78.5 36C80.9853 36 83 33.9853 83 31.5C83 29.0147 80.9853 27 78.5 27C76.0147 27 74 29.0147 74 31.5C74 33.9853 76.0147 36 78.5 36Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==11) {
                <path
                    d="M66.5 39C68.9853 39 71 36.9853 71 34.5C71 32.0147 68.9853 30 66.5 30C64.0147 30 62 32.0147 62 34.5C62 36.9853 64.0147 39 66.5 39Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==10) {
                <path
                    d="M54.5 44C56.9853 44 59 41.9853 59 39.5C59 37.0147 56.9853 35 54.5 35C52.0147 35 50 37.0147 50 39.5C50 41.9853 52.0147 44 54.5 44Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==9) {
                <path
                    d="M44.5 50C46.9853 50 49 47.9853 49 45.5C49 43.0147 46.9853 41 44.5 41C42.0147 41 40 43.0147 40 45.5C40 47.9853 42.0147 50 44.5 50Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==8) {
                <path
                    d="M36.5 57C38.9853 57 41 54.9853 41 52.5C41 50.0147 38.9853 48 36.5 48C34.0147 48 32 50.0147 32 52.5C32 54.9853 34.0147 57 36.5 57Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==7) {
                <path
                    d="M28.5 66C30.9853 66 33 63.9853 33 61.5C33 59.0147 30.9853 57 28.5 57C26.0147 57 24 59.0147 24 61.5C24 63.9853 26.0147 66 28.5 66Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==6) {
                <path
                    d="M22.5 76C24.9853 76 27 73.9853 27 71.5C27 69.0147 24.9853 67 22.5 67C20.0147 67 18 69.0147 18 71.5C18 73.9853 20.0147 76 22.5 76Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==5) {
                <path
                    d="M17.5 87C19.9853 87 22 84.9853 22 82.5C22 80.0147 19.9853 78 17.5 78C15.0147 78 13 80.0147 13 82.5C13 84.9853 15.0147 87 17.5 87Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==4) {
                <path
                    d="M15.5 98C17.9853 98 20 95.9853 20 93.5C20 91.0147 17.9853 89 15.5 89C13.0147 89 11 91.0147 11 93.5C11 95.9853 13.0147 98 15.5 98Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==3) {
                <path
                    d="M14.5 109C16.9853 109 19 106.985 19 104.5C19 102.015 16.9853 100 14.5 100C12.0147 100 10 102.015 10 104.5C10 106.985 12.0147 109 14.5 109Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==2) {
                <path
                    d="M15.5 121C17.9853 121 20 118.985 20 116.5C20 114.015 17.9853 112 15.5 112C13.0147 112 11 114.015 11 116.5C11 118.985 13.0147 121 15.5 121Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==1) {
                <path
                    d="M17.5 132C19.9853 132 22 129.985 22 127.5C22 125.015 19.9853 123 17.5 123C15.0147 123 13 125.015 13 127.5C13 129.985 15.0147 132 17.5 132Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                } @if (pathId()==0) {
                <path
                    d="M22.5 143C24.9853 143 27 140.985 27 138.5C27 136.015 24.9853 134 22.5 134C20.0147 134 18 136.015 18 138.5C18 140.985 20.0147 143 22.5 143Z"
                    fill="transparent"
                    stroke="white"
                    stroke-width="3"
                />
                }
                <defs>
                    <linearGradient
                        [id]="'paint0_linear' + index"
                        x1="88"
                        y1="16.5"
                        x2="88"
                        y2="151.5"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop #startColor />
                        <stop offset="1" #stopColor />
                    </linearGradient>
                </defs>
            </svg>
            <p
                class="text-grey700To200 absolute top-[43%] text-center translate-y-[-50%] font-[800] text-[32px]"
            >
                <span class="font-medium text-[14px] block text-grey400To300">{{'rank' | transloco}}</span>
                {{item().ranking}}
            </p>
            <div class="font-semibold text-[20px] w-full px-6">
                <p class="text-grey900To200">{{item().ranking}}/{{item().athletesCount}}</p>
                <p class="text-grey500To400">
                    {{ item() | appTranslateAsync:'formulaName' | async }}
                </p>
            </div>
        </div>
    `,
    styleUrls: ['./semi-circle.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslocoModule, TranslateAsyncPipe, AsyncPipe],
})
export class SemiCircleComponent implements AfterViewInit {
    rankings = [
        'RankOverall',
        'RankGender',
        'RankAge',
        'RankOrganization',
        'RankCoursGender',
        'RankUniversityGender',
    ];

    pathId = computed(()=>Math.round(+this.item().ranking/(this.item().athletesCount/27)));

    item = input<AthletesRankingDTO>();

    @ViewChild('startColor') startColor: ElementRef;
    @ViewChild('stopColor') stopColor: ElementRef;

    @Input() index: number;
    show = false;
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private _cdr: ChangeDetectorRef
    ) {}
    ngAfterViewInit(): void {
        let startColor;
        let stopColor;
        if (this.index % 2 == 1) {
            startColor = '#65E543';
            stopColor = '#4FB933';
        } else {
            startColor = '#36C5FA';
            stopColor = '#00A3E0';
        }
        this.changeGradientColors(startColor, stopColor);
    }
    changeGradientColors(startColor: string, stopColor: string) {
        const startStop = this.startColor.nativeElement;
        const endStop = this.stopColor.nativeElement;
        this.renderer.setAttribute(startStop, 'stop-color', startColor);
        this.renderer.setAttribute(endStop, 'stop-color', stopColor);
        this._cdr.markForCheck();
    }
}
