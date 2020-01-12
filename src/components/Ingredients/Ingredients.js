import React,{useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients,setUserIngredients] = useState([])
  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-cb078.firebaseio.com/ingredients.json',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(ingredient)
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        {id: responseData.name,
        ...ingredient}
      ])
    })
    // setUserIngredients(prevIngredients => [...prevIngredients,{id: Math.random().toString(),...ingredient}])
  };
  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientHandler}/>

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients = {userIngredients} onRemoveItem={() => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
