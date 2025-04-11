import { useEffect, useRef, useState } from "react";
import { Category } from "../models/Category";
import { ToastContainer, toast } from 'react-toastify';
function ManageCategories() {
 
const [kategooriad, setKategooriad] = useState<Category[]>([]);
 
useEffect(() => {
  fetch("http://localhost:8080/categories")
      .then(res=>res.json())
      .then(json=> setKategooriad(json))
}, []);
 
const deleteCategory = (id: number) => {
  fetch(`http://localhost:8080/categories/${id}`, {
    method: "DELETE",
  }).then(res=>res.json())
  .then(json=> {
    if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
      setKategooriad(json);
    toast.success("Kategooria kustutatud");
  } else {
    toast.error(json.message);
  }
})
};

const nameRef = useRef<HTMLInputElement>(null);
const activeRef = useRef<HTMLInputElement>(null);

const addCategory = () => {
  const newCategory = {name: nameRef.current?.value, active: activeRef.current?.checked}
  fetch("http://localhost:8080/categories", {
    method: "POST",
    body: JSON.stringify(newCategory),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res=>res.json())
  .then(json=> {
    if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
      setKategooriad(json);
    toast.success("Uus kategooria lisatud");
    if (nameRef.current && activeRef.current) {
      nameRef.current.value = "";
      activeRef.current.checked = false;
    }
  } else {
    toast.error(json.message);
  }
})

}
 
return (
 
  <div>
    <h2>Manage Categories</h2>
    <label>Name</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <label>Active</label> <br />
    <input ref={activeRef} type="checkbox" /> <br />
    <button onClick={() => addCategory()}>Add</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {kategooriad.map((kategooria) => (
          <tr key={kategooria.id}>
            <td>{kategooria.id}</td>
            <td>{kategooria.name}</td>
            <td>{kategooria.active ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => deleteCategory(kategooria.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <ToastContainer />
  </div>
);
}
 
export default ManageCategories