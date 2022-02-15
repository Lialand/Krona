import React from "react";
import { Link } from "react-router-dom";

import { CertificatesArr, Certificate } from "types";
import { detailed } from "const/pages";
import "./Certificates.css";

interface CertificatesProps {
    certificates: CertificatesArr;
}

function Certificates({ certificates }: CertificatesProps) {

    return (
        <div className="box-cert-table">
        {
            certificates?.map((item) =>
                <table key={item[0]}>
                    <thead>
                        <tr>
                            <th>{item[0]} поток</th>
                            <th colSpan={4}>дата выдачи</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item[1].map((certificate: Certificate, key: number) =>
                            <tr key={key}>
                                <td><Link className="notunder" to={`${detailed}${certificate.CODE}`}>{certificate.NAME}</Link></td>
                                <td><Link className="notunder" to={`${detailed}${certificate.CODE}`}>{certificate.DATE}</Link></td>
                                <td>
                                    <a className="linkcert"
                                        href={`https://club.krona.studio${certificate.CERTIFICAT}`}
                                        target="_blank"
                                    >Именной&nbsp;сертификат.pdf
                                    </a>
                                </td>
                                <td>
                                    <a className="linkcert"
                                        href={`https://club.krona.studio${certificate.DOCUMENT}`}
                                        target="_blank"
                                    >Приложение.pdf
                                    </a>
                                </td>
                                <td>
                                    <Link className="notunder" to={`${detailed}${certificate.CODE}`}>
                                        <div className="cert-next"></div>
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )
        }
        </div>
    )
}

export default Certificates;
