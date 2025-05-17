import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Photo } from '../models/Photo';

function AlbumPhotos() {
    const { albumId } = useParams();
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/albums/${albumId}/photos`)
            .then(res => res.json())
            .then(data => setPhotos(data));
    }, [albumId]);

    return (
        <div>
            <h2>Photos in Album {albumId}</h2>
            {photos.map(photo => (
                <div key={photo.id}>
                    <div>{photo.title}</div>
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                </div>
            ))}
        </div>
    );
}

export default AlbumPhotos;
