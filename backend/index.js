const express = require('express')
const app = express()
const port = 3000
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const building_map = {
    'B1' : {
        'Name' : 'General hospital',
        'X_Coordinate' : 1300,
        'Y_Coordinate' : 560
     },
     'B2' : {
        'Name' : 'Firehall',
        'X_Coordinate' : -350,
        'Y_Coordinate' : 1100
     }
}

const towers = [
    {
        'ID' :  'C1',
        'Name' : 'Bell NW',
        'X Coordinate' : 2200,
        'Y Coordinate' : 1720
    },
    {
        'ID' :  'C2',
        'Name' : 'Bell NE',
        'X Coordinate' : -1090,
        'Y Coordinate' : 1400
    },
    {
        'ID' :  'C3',
        'Name' : 'Bell SW',
        'X Coordinate' : 760,
        'Y Coordinate' : -1360
    },
    {
        'ID' :  'C4',
        'Name' : 'Bell SE',
        'X Coordinate' : -1410,
        'Y Coordinate' : -450
    }
]



app.get('/buildings', (req, res) => {
//   res.send('Hello World!')
    res.json(building_map)

})

function computeDist(bx, by, tx, ty) {
    return Math.sqrt(Math.pow((tx - bx),2) + Math.pow((ty - by),2) )
}

app.get('/tower', function(req, res) {
    const building_id = req.query.ID
    const building_X = building_map[building_id].X_Coordinate
    const building_Y = building_map[building_id].Y_Coordinate
    
    
    let min_dist = Infinity
    let closest_tower
    for (let tower of towers) {
        let dist = computeDist(building_X, building_Y,tower['X Coordinate'],tower['Y Coordinate'])
        
        if (dist < min_dist) {
            closest_tower = tower
            min_dist = dist
        }
       

    }
    closest_tower['Distance'] = min_dist
    



    res.json(closest_tower);
  });
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})