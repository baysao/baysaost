const def = {
  header: "My Header",
};
async function _handler_index() {
  let _route = githack + "/pages/menu.dot";
  const _html = await fetch(_route).then((data) => data.text());
  const _json = await fetch(_route.replace(/\.dot$/, ".json")).then((data) =>
    data.json()
  );
  var _tmpl = doT.template(_html, undefined, def);
  document.getElementById("main-nav").innerHTML = _tmpl(_json);
}
async function _handler_post(params, state, url) {
  console.log({ params, state, url });
  //    return "About";
  let _post_data = githack + "/posts/" + url;
  if (/\.dot/.test(url)) {
    let _post_tmpl = githack + "/post.dot";
    let _post_data = githack + "/posts/" + url;
    const _html = await fetch(_post_tmpl).then((data) => data.text());
    const _json = await fetch(_post_data.replace(/\.dot$/, ".json")).then(
      (data) => data.json()
    );

    var _tmpl = doT.template(_html, undefined, def);
    return _tmpl(_json);
  }
  return await fetch(_post_data).then((data) => data.text());
}
async function _handler_page(params, state, url) {
  //    return "About";
  let _route = githack + "/pages/" + url + ".dot";
  const _html = await fetch(_route).then((data) => data.text());
  const _json = await fetch(_route.replace(/\.dot$/, ".json")).then((data) =>
    data.json()
  );

  var _tmpl = doT.template(_html, undefined, def);
  return _tmpl(_json);
}

const route = Rlite(notFound, {
  // Default route
  "": function () {
    return "Home";
  },

  about: function () {
    return "About";
  },
  test1: _handler_page,
  "post/:name": async function (params, state, url) {
    console.log({ params, state, url });
    return await _handler_post(params, state, params.name);
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
_handler_index();

//});

window.addEventListener("hashchange", processHash);
processHash();
