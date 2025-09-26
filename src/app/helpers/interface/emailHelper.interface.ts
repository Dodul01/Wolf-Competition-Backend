export interface IEmailFeilds {
    from: string;
    to: string | string[];
    template: {
        subject: string;
        html: string;
    }
}