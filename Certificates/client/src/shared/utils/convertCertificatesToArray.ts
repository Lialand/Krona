import { CertificatesObj, CertificatesArr } from "types";

export default function convertCertificatesToArray(obj: CertificatesObj): CertificatesArr {
    return Object.entries(obj).sort((a: any, b: any) => b[0] - a[0]);
}