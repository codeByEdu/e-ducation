import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "./api/api";


export default function App() {
    const [jobs, setJobs] = useState<[any]>();



    useEffect(() => {
        api
            .get("/escola/name")
            .then((response) => setJobs(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);



    const myArray = ['Jack', 'Mary', 'John', 'Krish', 'Navin'];
    return (
        <div className="App">
            {/* <p>{jobs?.uuid}</p> */}


            {jobs?.map(name => (
                <li>
                    {name.codigo}
                    {name.ano}
                </li>
            ))}
        </div>
    );
}