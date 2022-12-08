export const getCSRFtoken = (html) => {
  //html as string
  const crfFirstPart = html.split('<meta name="csrf-token" content="')[1];
  const wholeCRFtoken = crfFirstPart.split('"')[0];
  return wholeCRFtoken;
};

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function copy(x) {
  return JSON.parse(JSON.stringify(x));
}

export function clean(obj) {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
}

export function cleanFieldsFilters(obj) {
  for (var propName in obj) {
    if (obj[propName] === null) continue;
    if (
      obj[propName] === "" ||
      obj[propName] === undefined ||
      obj[propName].length === 0
    ) {
      obj[propName] = null;
    }
  }
  return obj;
}
