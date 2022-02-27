import {useState, useEffect} from 'react';
import db from './firebase/db';
import {collection, getDocs} from "firebase/firestore";
import Statistics from './components/Statistics';
import { deleteDocument, simpleQuery } from './firebase/firebaseFunctions';
import { Link } from 'react-router-dom';
import Filters from './components/Filters';

export default function Attractions() {
  const [attractions, setAttractions] = useState([]);
  const [cities, setCities] = useState([]);
  const [restaurantFilter, setRestaurantFilter] = useState(false);
  const [settlementFilter, setSettlementFilter] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (restaurantFilter) {
      simpleQuery('attractions', 'category', '==', 'étterem').then((result) =>
        setAttractions(result)
      );
    } else {
      refreshData();
    }
  }, [restaurantFilter]);
  
  useEffect(() => {
    if (settlementFilter) {
      simpleQuery('attractions', 'settlement', '==', settlementFilter).then((result) =>
        setAttractions(result)
      );
    } else {
      refreshData();
    }
  }, [settlementFilter]);

  console.log(attractions);

  function refreshData() {
    getData()
    .then((attractionList) => {
      setAttractions(attractionList);
      getCities(attractionList);
    });
  }

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "attractions"));
    const attractionList = querySnapshot.docs.map((doc) => {
      return  {...doc.data(), id: doc.id};
    })
    return attractionList;
  }

  function getCities (attractions) {
    let cities = [];
    attractions.forEach(attraction => {
      if (!cities.includes(attraction.settlement)) {
        cities.push(attraction.settlement);
      }
    });
    setCities(cities);
  }

  function handleDelete(docId) {
    deleteDocument('attractions', docId)
    .then(() => refreshData());
  }
  
  return (
    <main className={"container"}>
      <h1>Látványosságok</h1>
      <Filters setRestaurantFilter={setRestaurantFilter} setSettlementFilter={setSettlementFilter} cities={cities}/>
      <Link className="btn btn-primary mb-3" to={"/attraction/new"}>Felvitel</Link>
      <table className="table table-bordered table-striped">
        <thead>
        <tr>
          <th>
            Megnevezés
          </th>
          <th>
            Település
          </th>
          <th>
            Cím
          </th>
          <th>
            Kategória
          </th>
          <th>
            Ár
          </th>
          <th>
            Megjegyzés
          </th>
          <th>
            Műveletek
          </th>
        </tr>
        </thead>
        <tbody>
        {attractions.map((attraction, index) => (
          <tr key={index}>
            <td>{attraction.name}</td>
            <td>{attraction.settlement}</td>
            <td>{attraction.address}</td>
            <td>{attraction.category}</td>
            <td>{attraction.price}</td>
            <td>{attraction.note}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(attraction.id) }
                id={"delete-" + attraction.id}
                >
                  Törlés
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Statistics attractions={attractions} cities={cities}/>
    </main>
  );
}
