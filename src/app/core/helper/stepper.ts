export class stepper {
    id?: string;
    title?: string;
    description?: string;
    duration?: number;
    steps?: {
        order?: number;
        title?: string;
        subtitle?: string;
        content?: string;
    }[];
}
