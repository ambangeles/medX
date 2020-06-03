const today = () => {
  const date = new Date();
  return date.toLocaleString("en-PH");
};

const getAge = (DOB) => {
  const today = new Date();
  const birthDate = new Date(DOB);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;
  }

  return age;
};

const getMonth = (monthStr) => {
  return new Date(monthStr + "-1-01").getMonth() + 1;
};

const capitalize = (data) => {
  return data[0].toUpperCase() + data.slice(1);
};
const isFileImage = (file) => {
  return file && file["mimetype"].split("/")[0] === "image";
};

const byteLength = (str) => {
  var s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--; //trail surrogate
  }
  return s;
};

module.exports.capitalize = capitalize;
module.exports.today = today;
module.exports.getAge = getAge;
module.exports.getMonth = getMonth;
module.exports.isFileImage = isFileImage;
module.exports.byteLength = byteLength;
