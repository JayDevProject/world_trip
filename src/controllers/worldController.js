export const world = (req, res) => {
  res.render("ejs/worldmap/world.ejs");
};

export const asia_land = (req, res) => {
  res.render("ejs/worldmap/asia.ejs");
};

export const korea = (req, res) => {
  res.render("pug/country/korea");
};

export const europe_land = (req, res) => {
  res.render("ejs/worldmap/europe.ejs");
};
