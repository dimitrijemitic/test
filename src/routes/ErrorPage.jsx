import React from 'react'
import { useHistory } from "react-router";

export default function ErrorPage() {

    const history = useHistory();

    const handleChangeRoute = (route) => history.push(route);


    return (
        <div>
            404
            <button onClick={() => handleChangeRoute('/')}>
                BACK
            </button>
        </div>
    )
}
