import {gzip, ungzip} from "pako";

export const decode = (str: string): string => {
  if (str === "") {
    return ""
  }
  const base64 = decodeURIComponent(str);
  const gzipped = Uint8Array.from(window.atob(base64), c => c.charCodeAt(0));
  return ungzip(gzipped, { to: "string" });
}

export const encode = (str: string): string => {
  if (str === "") {
    return ""
  }
  const gzipped: Uint8Array = gzip(str);
  const base64 = window.btoa(String.fromCharCode(...gzipped));
  return encodeURIComponent(base64);
}
