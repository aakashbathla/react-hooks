import React, {useState,useEffect,useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';
const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [enteredFilter,setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      if(enteredFilter === inputRef.current.value){
        const query = enteredFilter.length === 0 ? '' : `?orderBy="name"&equalTo="${enteredFilter}"`;
        fetch('https://react-hooks-cb078.firebaseio.com/ingredients.json' + query,{
          method: 'GET',
          headers: {'Content-Type': 'applicaiton/json'}
        }).then(response => {
          return response.json()
        }).then(responseData => {
          const loadedIngredient = [];
          for(const key in responseData){
            loadedIngredient.push({
              id: key,
              name: responseData[key].name,
              amount: responseData[key].amount
            })
          }
          onLoadIngredients(loadedIngredient);
        })
      }
    },500)
  },[enteredFilter,onLoadIngredients,inputRef])
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" ref={inputRef} value={enteredFilter} onChange={event=>setEnteredFilter(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
