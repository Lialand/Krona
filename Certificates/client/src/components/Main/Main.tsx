import React, { useState, useEffect }from "react";
import { Route, Routes } from "react-router";
import axios from "axios";

import List from "../List/List";
import Detailed from "../Detailed/Detailed";
import Users from "../Admin/Users/Users";
import { CertificatesArr } from "types";
import "./Main.css";
import convertCertificatesToArray from "utils/convertCertificatesToArray";
import { detailed, users } from "const/pages";

function Main() {

    const [certificates, setCertificates] = useState<CertificatesArr>([]);
    
    const url = "https://club.krona.studio/api/";
    const body = { "METHOD": "/certificates/getAllCertificates/" }
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    useEffect(() => {
        
        axios
            .post(url, body, config)
            .then(
                res => setCertificates(convertCertificatesToArray(res.data)),
                err => console.error(err)
            )
    }, []);

    if (certificates.length === 0)
        return <></>
    return (
        <Routes>
            <Route path={`${detailed}:name`} element={<Detailed certificates={certificates} />} />
            <Route path={users} element={<Users />} />
            <Route path="/" element={<List certificates={certificates} />} />
        </Routes>
    );
}

export default Main;
