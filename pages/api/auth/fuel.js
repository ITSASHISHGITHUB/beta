// /pages/api/auth/fuel.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { location, fuelType } = req.query;
    const filePath = path.resolve('pages', 'api' , 'auth' , 'fuel.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const fuelPrices = JSON.parse(fileData);
    if (fuelPrices[location] && fuelPrices[location][fuelType]) {
      return res.status(200).json({
        location,
        fuelType,
        price: fuelPrices[location][fuelType]
      });
    } else {
      return res.status(404).json({ error: "Fuel data not found" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
