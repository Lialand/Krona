import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Certificates from "./Certificates/Certificates";
import { CertificatesArr } from "types";
import { users } from "const/pages";
import "./List.css";

interface ListProps {
    certificates: CertificatesArr;
}

function List({ certificates }: ListProps) {

    useEffect(() => {
        document.title = "Krona Certificates";
    }, []);

    return (
        <>
            <header className="header">
                Krona Certificates
                <Link to={users}>Редактирование пользователей</Link>
            </header>
            <div className="box-cert">
                <div className="box-cert-title">
                    Сертификаты
                </div>
                <Certificates certificates={certificates} />
            </div>
        </>
    );
}

export default List;
