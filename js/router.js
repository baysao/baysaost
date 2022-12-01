const githack_version = "main";
const githack = "https:rawcdn.githack.com/baysao/baysaost/" + githack_version;

// handleLocation();
const def = {
  header: "My Header",
};

const route = Rlite(notFound, {
  // Default route
  "": function () {
    return "Home";
  },

  about: function () {
    return "About";
  },
  test1: async function () {
    //    return "About";
    let route = githack + "/pages/test1.dot";
    const _html = await fetch(route).then((data) => data.text());
    const _json = await fetch(route.replace(/\.dot$/, ".json")).then((data) =>
      data.json()
    );

    var _tmpl = doT.template(_html, undefined, def);
    return _tmpl(_json);
  },

  // // #sent?to=john -> r.params.to will equal 'john'
  // sent: function ({ to }) {
  //   return "Sent to " + to;
  // },

  // // #users/chris -> r.params.name will equal 'chris'
  // "users/:name": function ({ name }) {
  //   return "User " + name;
  // },

  // // #users/foo/bar/baz -> r.params.path will equal 'foo/bar/baz'
  // "users/*path": function ({ path }) {
  //   return "Path = " + path;
  // },
});

function notFound() {
  return "<h1>404 Not found :/</h1>";
}

// Hash-based routing
async function processHash() {
  const hash = location.hash || "#";

  // Do something useful with the result of the route
  let html = await route(hash.slice(1));
  document.getElementById("main-page").innerHTML = html;
}

window.addEventListener("hashchange", processHash);
processHash();
