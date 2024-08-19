import React, { useEffect, useState } from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats=[
  {"name": "Все"},
  {"name": "Море"},
  {"name": "Горы"},
  {"name": "Архитектура"},
  {"name": "Города"}
];

function App() {
const [categoryId, setCategoryId] =useState(0);
const [page, setPage] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const [searchValue, setSearchValue]= useState('');
const [collections, setCollections]=useState([]);

useEffect(()=>{
  setIsLoading(true);
  fetch(`https://66bdbe9f74dfc195586d7348.mockapi.io/photos_collection?${categoryId ? `category=${categoryId}`: ''}`,)
  .then((res)=>res.json())
  .then((json)=>{
    setCollections(json);
  }).catch((err)=>{
    console.warn(err);
    alert('Error')
  }).finally(()=> setIsLoading(false))
}, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (<li onClick={()=> setCategoryId(i)} className={categoryId === i ? 'active' : '' } key={obj.name}>{obj.name}</li>
          ))}
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
       {isLoading ? (<h2>Loading..</h2>):(
         collections.filter((obj)=>{
          return obj.name.toLowerCase().includes(searchValue.toLowerCase());
        }).map ((obj, index) => (
          <Collection key={index} name={obj.name} images={obj.photos}/>
        ))
       )}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
