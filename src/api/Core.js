import { HOST, PORT } from "../js/config";
import { getUTCString } from "../js/utils";

export const getGroups = async (uid, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    uid: uid,
    token: token,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let rawData = await fetch(`${HOST}:${PORT}/api/groupes/v1`, requestOptions);
    let dataJson = await rawData.json();
    if (!dataJson?.error) return dataJson;
    else throw new Error(JSON.stringify(dataJson));
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const sendData = async (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let rawData = await fetch(
      `${HOST}:${PORT}/api/Messageorder/v1`,
      requestOptions
    );
    let dataJson = await rawData.json();
    return dataJson;
  } catch (error) {
    console.log("yeeet");
    console.warn(error);
    return null;
  }
};

export const openBackOffice = async (uid, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    uid: uid,
    token: token,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let rawData = await fetch(
      `${HOST}:${PORT}/api/auth/v1/Back-office-link`,
      requestOptions
    );
    let dataJson = await rawData.json();
    return dataJson;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const getHistory = async (
  page = 0,
  per_page = 15,
  gid,
  cid,
  dmin = "",
  dmax = "",
  token,
  uid
) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");

  // let raw = JSON.stringify(token);

  var requestOptions = {
    method: "POST",
    redirect: "follow",
    body: token,
  };

  let q = `${HOST}:${PORT}/api/Message-history/v1/all?page=${page}&number=${per_page}`;
  q = gid ? `${q}&groupeId=${gid}` : q;
  q = cid ? `${q}&coursId=${cid}` : q;
  q =
    dmin.length > 0 ? `${q}&dateTMin=${getUTCString(dmin)}` : `${q}&dateTMin=`;
  q =
    dmax.length > 0 ? `${q}&dateTMax=${getUTCString(dmax)}` : `${q}&dateTMax=`;
  q = uid ? `${q}&envoyePar=${uid}` : q;

  console.log(q);

  try {
    let rawData = await fetch(q, requestOptions);
    let dataJson = await rawData.json();
    if (dataJson) {
      return dataJson;
    } else {
      return null;
    }
  } catch (error) {
    console.warn(error);
    return null;
  }
};
