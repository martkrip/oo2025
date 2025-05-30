import { useEffect, useState } from 'react'
import '../App.css'
import type { Athlete } from "../models/Athlete";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

function AthletesPage() {
    const { t } = useTranslation();
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [athletesPerPage] = useState(5);

    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);

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

  const addAthlete = () => {
  const newAthlete = {
    name: nameRef.current?.value,
    age: Number(ageRef.current?.value),
    country: countryRef.current?.value
  };

  fetch("http://localhost:8080/athletes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAthlete)
  })
    .then(res => res.json())
    .then(() => {
      fetchAthletes(); // refresh list
      if (nameRef.current) nameRef.current.value = "";
      if (ageRef.current) ageRef.current.value = "";
      if (countryRef.current) countryRef.current.value = "";
    });
};

  return (
    <div>
      <h2>{t('athletes.title')}</h2>
    <div>
        <button onClick={() => setSelectedCountry(null)}>{t('countries.all')}</button>
        <button onClick={() => setSelectedCountry("Estonia")}>{t('countries.estonia')}</button>
        <button onClick={() => setSelectedCountry("Finland")}>{t('countries.finland')}</button>
        <button onClick={() => setSelectedCountry("USA")}>{t('countries.usa')}</button>
        <button onClick={() => setSelectedCountry("Belarus")}>{t('countries.belarus')}</button>
        <button onClick={() => setSelectedCountry("Ukraine")}>{t('countries.ukraine')}</button>
        <button onClick={() => setSelectedCountry("Sweden")}>{t('countries.sweden')}</button>
    </div>
    <div>
        <button onClick={() => setPage(0)} disabled={page === 0}>{t('pagination.first')}</button>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 0}>{t('pagination.prev')}</button>
        <span>{t('pagination.page')} {page + 1} {t('pagination.of')} {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page + 1 >= totalPages}>{t('pagination.next')}</button>
        <button onClick={() => setPage(totalPages - 1)} disabled={page + 1 >= totalPages}>{t('pagination.last')}</button>
    </div>
    <div className='mb-4'>
  <h4>{t('athletes.add-new')}</h4>
  <label>{t('form.name')}</label>
  <input type="text" ref={nameRef} className="form-control mb-2" />
  <label>{t('form.age')}</label>
  <input type="number" ref={ageRef} className="form-control mb-2" />
  <label>{t('form.country')}</label>
  <input type="text" ref={countryRef} className="form-control mb-2" />
  <button onClick={addAthlete} className="btn btn-success">{t('athletes.add-button')}</button>
</div>
      <table className='table table-bordered table-striped'>
        <thead>
            <tr>
                <th>{t('table.name')}</th>
                <th>{t('table.country')}</th>
                <th>{t('table.age')}</th>
                <th>{t('table.total-points')}</th>
                <th>{t('table.results')}</th>
                <th>{t('table.edit')}</th>
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
{athlete.results && typeof athlete.results === 'object' && Object.entries(athlete.results).map(([event, points]) => (
  <li key={event}>{event}: {points} pts</li>
              ))}
            </ul>
            </td>
            <td>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => window.location.href = `/athletes/edit/${athlete.id}`}>{t('table.edit')}
                </button>
              </td>
              <td>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default AthletesPage