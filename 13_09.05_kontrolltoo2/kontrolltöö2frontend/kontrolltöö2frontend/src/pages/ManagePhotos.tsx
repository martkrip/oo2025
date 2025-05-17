import { useEffect, useState, useRef } from 'react'
import { type Photo } from '../models/Photo.ts';
import { ToastContainer, toast } from 'react-toastify';

function ManagePhotos() {
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/photos")
        .then(res=>res.json())
        .then(json=> setPhotos(json))
    }, []);

      const deletePhotos = (id: number) => {
    fetch(`http://localhost:8080/photos/${id}`, {
      method: "DELETE",
    }).then(() => 
      setPhotos(photos.filter(photos => photos.id !== id)));
      ;
      };
    const albumIdRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const thumbnailUrlRef = useRef<HTMLInputElement>(null);

    const addPhotos = () => {
        const newPhotos = {
            albumId: albumIdRef.current?.value,
            title: titleRef.current?.value,
            url: urlRef.current?.value,
            thumbnailUrl: thumbnailUrlRef.current?.value
        }

        fetch("http://localhost:8080/photos", {
            method: "POST",
            body: JSON.stringify(newPhotos),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(json=> {
            if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
                setPhotos(json);
                toast.success("Uus foto lisatud!");
            } else {
                toast.error(json.message)
            }
        })
    }

  return (
    <div>
        <h2>Manage Photos</h2>

        <label>albumId</label> <br />
        <input ref={albumIdRef} type="text" /> <br />
        <label>Title</label> <br />
        <input ref={titleRef} type="text" /> <br />
        <label>Url</label> <br />
        <input ref={urlRef} type="text" /> <br />
        <label>thumbnailUrl</label> <br />
        <input ref={thumbnailUrlRef} type="text" /> <br />
        <button onClick={() => addPhotos()}>Add product</button>

        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>albumId</th>
                    <th>Title</th>
                    <th>Url</th>
                    <th>thumbnailUrl</th>
                </tr>
            </thead>
            <tbody>
                {photos.map((photo) => (
                    <tr key={photo.id}>
                    <td>{photo.id}</td>
                    <td>{photo.albumId}</td>
                    <td>{photo.title}</td>
                    <td>{photo.url}</td>
                    <td>{photo.thumbnailUrl}</td>
                    <td>
                        <button onClick={() => deletePhotos(photo.id)}>Delete</button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <ToastContainer />
    </div>
  );
}

export default ManagePhotos