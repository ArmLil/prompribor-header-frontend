export default function locationPath(pathname) {
  let pathArr = pathname.split("/");
  let result = "/";
  pathArr = pathArr.filter((el) => el !== "");
  pathArr.forEach((item, i) => {
    if (item !== "") {
      if (i !== pathArr.length - 1) result = result + item + "/";
      else result = result + "avarii";
    }
  });
  return result;
}
