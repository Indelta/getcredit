const wiget_routes = (app) => {
  app.get("/api/wiget", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-type', 'text/javascript');
    res.sendFile(__dirname + "/wiget/main.js");
    // res.send({ error: false, message: "" });
  });

  app.get("/api/wiget-html", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-type', 'text/html');
    res.sendFile(__dirname + "/wiget/index.html");
  });

  app.get("/api/wiget-css", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-type', 'text/css');
    res.sendFile(__dirname + "/wiget/style.css");
  });
};

module.exports = wiget_routes;
