const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  404: "/pages/404.html",
  "/": "/pages/index.html",
  "#about": "/pages/about.html",
  "#lorem": "/pages/lorem.html",
  "#test": "/pages/test.html",
  "#test1":
    "https://rawcdn.githack.com/baysao/baysaost/28dfde634044fafc83dc471e5f7df782e8988b44/test1.dot",
  "#test11": "/pages/test1.dot",
};

const def = {
  header: "My Header",
};
const handleLocation = async () => {
  const path = window.location.pathname;
  const pathHash = window.location.hash;
  const route = routes[pathHash] || routes[path] || routes[404];
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
