function statusService(req, res) {
  const json = { status: "OK" };
  res.send(json);
}

module.exports = statusService;
