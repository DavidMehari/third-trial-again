import React, { useEffect, useState } from 'react';

function Statistics({attractions, cities}) {

  const [statsByCity, setStatsByCity] = useState({});

  useEffect(() => {
    attractions.forEach(attraction => {
      getAvgPriceByCity(attraction.settlement)
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attractions]);
  
  function getAttractionCountByCity(city) {
    return attractions.filter(attraction => attraction.settlement === city).length
  }
  
  function getAvgPriceByCity(city) {
    let pricesByCity = [];
    attractions.forEach(attraction => {
      if (attraction.settlement === city) {
        pricesByCity.push(parseInt(attraction.price));
      }
    });

    const totalPriceByCity = pricesByCity.reduce((a, b) => a + b, 0);
    const avg = (totalPriceByCity / pricesByCity.length) || 0;
    
    setStatsByCity((prev) => {
      return ({
        ...prev,
        [city]: avg
      });
    });

    return avg;
  }
  
  function getAvgOfAllCities() {
    let totalPrices = 0;
    attractions.forEach(attraction => {
      totalPrices += parseInt(attraction.price);
    });

    return totalPrices / attractions.length || 0;
  }

  return (
    <div>
      <h2>Statisztika</h2>
      <table className="table table-bordered table-striped">
        <thead>
        <tr>
          <th>
            Település
          </th>
          <th>
            Látványosságok
          </th>
          <th>
            Átlag ár
          </th>
        </tr>
        </thead>
        <tbody>
        {cities.map((city, index) => (
          <tr key={index}>
            <td>{city}</td>
            <td>{getAttractionCountByCity(city)}</td>
            <td>{statsByCity[city]}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Összegzés</td>
            <td>{attractions.length}</td>
            <td>{getAvgOfAllCities()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Statistics;