import { useEffect, useState } from 'react'
import '../App.css'
import type { Athlete } from "../models/Athlete";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback } from 'react';

function AthletesPage() {
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
    }, [fetchAthletes])
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
      <table className='table table-bordered table-striped'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Age</th>
                <th>Total Points</th>
                <th>Results</th>
            </tr>
        </thead>
      <tbody>
        {athletes.map(athlete => (
          <tr key={athlete.id} style={{ marginBottom: "1em" }}>
            <td>{athlete.name}</td>
            <td>{athlete.country}</td>
            <td>{athlete.age}</td>
            <td>{athlete.totalPoints}</td>
            <td>
                <ul>
                {Object.entries(athlete.results).map(([event, points]) => (
                    <li key={event}>{event}: {points} pts</li>
              ))}
            </ul>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default AthletesPage