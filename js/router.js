const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};
// const githack_version = "71878f3882ba55d49099286b2c0094c8d96efd24";
const githack_version = "main";
const githack = "https://rawcdn.githack.com/baysao/baysaost/" + githack_version;

const routes = {
  404: "/pages/404.html",
  "/": "/pages/index.html",
  "#about": "/pages/about.html",
  "#lorem": "/pages/lorem.html",
  "#test": "/pages/test.html",
  "#test1": "/pages/test1.dot",
  "#test11": "/pages/test1.dot",
};

const def = {
  header: "My Header",
};
const handleLocation = async () => {
  const path = window.location.pathname;
  const pathHash = window.location.hash;
  console.log(pathHash);
  let route = "";
  if (pathHash) route = githack + routes[pathHash] || routes[404];
  else route = githack + routes[path] || routes[404];
  console.log(route);
  let html = await fetch(route).then((data) => data.text());
  if (/\.dot/.test(route)) {
    const _json = await fetch(route.replace(/\.dot$/, ".json")).then((data) =>
      data.json()
    );
    console.log(_json);
    console.log("dot");
    var pagefn = doT.template(html, undefined, def);
    html = pagefn(_json);
  }
  document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
