import { useEffect, useState } from 'react'
import { type Photo } from '../models/Photo.ts';
import {  Link } from 'react-router-dom';

function MainPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0)
    const [sortField, setSortField] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");

    useEffect(() => {
        fetch(`http://localhost:8080/photos/paged?page=${page}&size=5&sort=${sortField},${sortDirection}`)
        .then(res=>res.json())
        .then(data => {
          setPhotos(data.content);
        setTotalPages(data.totalPages);
    })
    }, [page, sortField, sortDirection]);
  return (
  <div>
    <label>Sort by: </label>
    <select value={sortField} onChange={e => setSortField(e.target.value)}>
    <option value="title">Title</option>
    <option value="id">ID</option>
    <option value="albumId">Album ID</option>   
    </select>

    <select value={sortDirection} onChange={e => setSortDirection(e.target.value)}>
      <option value="asc"></option>
      <option value="desc"></option>
    </select>
      {photos.map(photos =>
        <div key={photos.id}>
          <div>{photos.id}</div>
          <div>{photos.albumId}</div>
          <div>{photos.title}</div>
          <div>{photos.url}</div>
          <div>{photos.thumbnailUrl}</div>
          <Link to={"/ManagePhotos"}>
          <button>Manage Photos</button>
          </Link>
          </div>)}
    <div>
      <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>Previous</button>
      <span> Page {page + 1} of {totalPages} </span>
      <button onClick={() => setPage(prev => Math.max(prev + 1, totalPages - 1))} disabled={page >= totalPages - 1}>Next</button>
    </div>
  </div>
  )
}

export default MainPage