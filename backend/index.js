const express = require("express");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const building_map = {
  B1: {
    Name: "General hospital",
    X_Coordinate: 1300,
    Y_Coordinate: 560,
  },
  B2: {
    Name: "Firehall",
    X_Coordinate: -350,
    Y_Coordinate: 1100,
  },
  B3: {
    Name: "University",
    X_Coordinate: -890,
    Y_Coordinate: -1300,
  },
  B4: {
    Name: "Central Library",
    X_Coordinate: 470,
    Y_Coordinate: 1010,
  },
  B5: {
    Name: "Secondary school",
    X_Coordinate: 1550,
    Y_Coordinate: 850,
  },
  B6: {
    Name: "Primary school",
    X_Coordinate: 1450,
    Y_Coordinate: 950,
  },
  B7: {
    Name: "City Hall",
    X_Coordinate: -600,
    Y_Coordinate: 200,
  },
};

const towers = [
  {
    ID: "C1",
    Name: "Bell NW",
    "X Coordinate": 2200,
    "Y Coordinate": 1720,
  },
  {
    ID: "C2",
    Name: "Bell NE",
    "X Coordinate": -1090,
    "Y Coordinate": 1400,
  },
  {
    ID: "C3",
    Name: "Bell SW",
    "X Coordinate": 760,
    "Y Coordinate": -1360,
  },
  {
    ID: "C4",
    Name: "Bell SE",
    "X Coordinate": -1410,
    "Y Coordinate": -450,
  },
  {
    ID: "C5",
    Name: "Rogers NW1",
    "X Coordinate": 2300,
    "Y Coordinate": 1710,
  },
  {
    ID: "C6",
    Name: "Rogers NW2",
    "X Coordinate": 50,
    "Y Coordinate": 2080,
  },
  {
    ID: "C7",
    Name: "Rogers SE",
    "X Coordinate": -1410,
    "Y Coordinate": -450,
  },
  {
    ID: "C8",
    Name: "Freedom SW",
    "X Coordinate": 1100,
    "Y Coordinate": -1200,
  },
  {
    ID: "C9",
    Name: "Freedom NE",
    "X Coordinate": -1090,
    "Y Coordinate": 1400,
  },
  {
    ID: "C10",
    Name: "TELUS SE1",
    "X Coordinate": -1740,
    "Y Coordinate": -50,
  },
  {
    ID: "C11",
    Name: "TELUS SE2",
    "X Coordinate": -2300,
    "Y Coordinate": -350,
  },
];

app.get("/buildings", (req, res) => {
  res.json(building_map);
});

function computeDist(bx, by, tx, ty) {
  return Math.sqrt(Math.pow(tx - bx, 2) + Math.pow(ty - by, 2)).toFixed(3);
}

app.get("/tower", function (req, res) {
  const building_id = req.query.ID;
  const building_X = building_map[building_id].X_Coordinate;
  const building_Y = building_map[building_id].Y_Coordinate;

  let min_dist = Infinity;
  let closest_tower;
  for (let tower of towers) {
    let dist = computeDist(
      building_X,
      building_Y,
      tower["X Coordinate"],
      tower["Y Coordinate"]
    );

    if (dist < min_dist) {
      closest_tower = tower;
      min_dist = dist;
    }
  }
  closest_tower["Distance"] = min_dist;

  res.json(closest_tower);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
