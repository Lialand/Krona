import React, { useState, useEffect } from "react";
import { useParams } from "react-router"; 
import { Link } from "react-router-dom";

import { CertificatesArr, Certificate } from "types";
import getCertificate from "utils/getCertificate";
import "./Detailed.css";

interface DetailedProps {
    certificates: CertificatesArr;
}

function Detailed({ certificates }: DetailedProps) {

    const { name } = useParams();
    const [certificate, ] = useState<Certificate>(getCertificate(certificates, name));

    useEffect(() => {
        document.title = "Krona Certificates. "+certificate.NAME;
    }, []);

    return (
        <section className="bdetail">
            <header className="header header-detail">
                Krona Certificates
                <div className="header-detail-center">
                    <div className="cert-fio cert-fio-mobile">{certificate.NAME}</div>
                    <div className="info-block">
                        <div className="info-item">
                            <span>прошла дистанционный курс</span>
                            <span>{certificate.COURSE}</span>
                        </div>
                        <div className="info-item">
                            <span>объем курса</span>
                            <span>{certificate.TIME} часа</span>
                        </div>
                        <div className="info-item">
                            <span>дата выдачи сертификата</span>
                            <span>{certificate.DATE}</span>
                        </div>
                    </div>
                    <div className="info-block">
                        <div className="info-item">
                            <span>подтверждение</span>
                            <span>
                                Мы подтверждаем, что студент действительно обучался в нашей школе и
                                закончил указанный курс
                            </span>
                        </div>
                        <div className="info-item">
                            <span>документы</span>
                            <span>
                                <a href={`https://club.krona.studio${certificate.CERTIFICAT}`} target="_blank">Именной сертификат.pdf</a>
                                <a href={`https://club.krona.studio${certificate.DOCUMENT}`} target="_blank">Приложение.pdf</a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="header-detail-right">
                    <Link to="/">Назад</Link>
                </div>  
            </header>
            <div className="cert-fio">{certificate.NAME}</div>
        </section>
    )
}

export default Detailed;