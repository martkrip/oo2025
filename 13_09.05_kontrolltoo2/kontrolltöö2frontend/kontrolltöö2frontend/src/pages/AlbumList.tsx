import { useEffect, useState } from 'react';
import { type Album } from '../models/Album';
import { Link } from 'react-router-dom';

function AlbumList() {
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/albums")
        .then(res => res.json())
        .then(data => setAlbums(data));
    }, []);


  return (
    <div>
        <h2>Albums</h2>
        {albums.map(album => (
            <div key={album.id}>
                <Link to={`/albums/${album.id}/photos`}>
                <button>{album.name}</button>
                </Link>
                </div>
        ))}
    </div>
  )
}

export default AlbumList;