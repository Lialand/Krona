export interface Certificate {
    NAME: string;
    DATE: string;
    CERTIFICAT: string;
    DOCUMENT: string;
    CODE: string;
    COURSE: string;
    TIME: number;
}

export interface CertificatesObj {
    [index: number | string]: Array<Certificate>;
}

export type CertificatesArr = [number | string, Certificate[]][]; 