import {useState, useEffect} from 'react';
import db from './firebase/db';
import {collection, getDocs} from "firebase/firestore";

export default function Attractions() {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "attractions"));
      const attractionList = querySnapshot.docs.map((doc) => {
        return  {...doc.data(), id: doc.id};
      })
      setAttractions(attractionList);
    }

    getData();
  }, [])

  return (
    <main className={"container"}>
      <h1>Látványosságok</h1>
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
          </tr>
        ))}
        </tbody>
      </table>
    </main>
  );
}
