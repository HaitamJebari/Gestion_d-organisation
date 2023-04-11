export const getUTCString = (d = null) => {
    let t = d ? new Date(d) : new Date();

    let day = t.getUTCDate() > 9 ? t.getUTCDate() : "0".concat(t.getUTCDate());
    let month = t.getUTCMonth() + 1 > 9 ? t.getUTCMonth() + 1 : "0".concat(t.getUTCMonth() + 1);
    let year = t.getUTCFullYear();
    let hour = t.getUTCHours() > 9 ? t.getUTCHours() : "0".concat(t.getUTCHours());
    let minute = t.getUTCMinutes() > 9 ? t.getUTCMinutes() : "0".concat(t.getUTCMinutes());
    let second = t.getUTCSeconds() > 9 ? t.getUTCSeconds() : "0".concat(t.getUTCSeconds());

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}