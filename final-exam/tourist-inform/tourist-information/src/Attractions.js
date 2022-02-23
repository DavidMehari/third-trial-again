import {useState, useEffect} from 'react';
import db from './firebase/db';

export default function Attractions() {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    db.collection('attractions').get().then(ref => {
      ref.docs.forEach(doc => {
        const attraction = doc.data();
        setAttractions((previousAttractions) => [...previousAttractions, attraction]);
      });
    });
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
