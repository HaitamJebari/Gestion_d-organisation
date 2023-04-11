import { HOST, PORT } from "../js/config";

export const Login = async (name, pass) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": name,
        "pass": pass
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        let rawData = await fetch(`${HOST}:${PORT}/api/auth/v1`, requestOptions);
        let dataJson = await rawData.json();
        return dataJson;
    } catch (error) {
        console.warn(error);
        return null;
    }
}