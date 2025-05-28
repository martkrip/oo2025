import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Athlete } from "../models/Athlete";
import 'bootstrap/dist/css/bootstrap.min.css';

function AthletesPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [athletesPerPage] = useState(5);

  const fetchAthletes = useCallback(() => {
    let url = `http://localhost:8080/athletes?page=${page}&size=${athletesPerPage}`;
    if (selectedCountry) {
      url += `&country=${selectedCountry}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(json => {
        setAthletes(json.content);
        setTotalPages(json.totalPages);
      });
  }, [selectedCountry, page, athletesPerPage]);

  useEffect(() => {
    fetchAthletes();
  }, [fetchAthletes]);

  const addAthlete = () => {
    const newAthlete = {
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value),
      country: countryRef.current?.value,
    };

    fetch("http://localhost:8080/athletes", {
      method: "POST",
      body: JSON.stringify(newAthlete),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => {
        // After adding, reload current page to show updated list
        fetchAthletes();
        if (nameRef.current) nameRef.current.value = "";
        if (ageRef.current) ageRef.current.value = "";
        if (countryRef.current) countryRef.current.value = "";
      });
  };

  return (
    <div>
      <h2>Athletes</h2>
      <div>
        <button onClick={() => setSelectedCountry(null)}>All</button>
        <button onClick={() => setSelectedCountry("Estonia")}>Estonia</button>
        <button onClick={() => setSelectedCountry("Finland")}>Finland</button>
        <button onClick={() => setSelectedCountry("USA")}>USA</button>
        <button onClick={() => setSelectedCountry("Belarus")}>Belarus</button>
        <button onClick={() => setSelectedCountry("Ukraine")}>Ukraine</button>
        <button onClick={() => setSelectedCountry("Sweden")}>Sweden</button>
      </div>

      <div>
        <button onClick={() => setPage(0)} disabled={page === 0}>First</button>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 0}>Prev</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page + 1 >= totalPages}>Next</button>
        <button onClick={() => setPage(totalPages - 1)} disabled={page + 1 >= totalPages}>Last</button>
      </div>

      <div className="mb-4">
        <h4>Add New Athlete</h4>
        <label>Name</label>
        <input type="text" ref={nameRef} className="form-control mb-2" />
        <label>Age</label>
        <input type="number" ref={ageRef} className="form-control mb-2" />
        <label>Country</label>
        <input type="text" ref={countryRef} className="form-control mb-2" />
        <button onClick={addAthlete} className="btn btn-success">Add Athlete</button>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Age</th>
            <th>Total Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map(athlete => (
            <tr key={athlete.id}>
              <td>{athlete.name}</td>
              <td>{athlete.country}</td>
              <td>{athlete.age}</td>
              <td>{athlete.totalPoints}</td>
              <td>
                <Link to={`/edit-athlete/${athlete.id}`}>
                  <button className="btn btn-sm btn-primary">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AthletesPage;