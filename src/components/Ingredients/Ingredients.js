import React,{useState,useEffect,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients,setUserIngredients] = useState([]);
  // useEffect(()=> {
  //   fetch('https://react-hooks-cb078.firebaseio.com/ingredients.json',{
  //     method: 'GET',
  //     headers: {'Content-Type': 'applicaiton/json'}
  //   }).then(response => {
  //     return response.json()
  //   }).then(responseData => {
  //     const loadedIngredient = [];
  //     for(const key in responseData){
  //       loadedIngredient.push({
  //         id: key,
  //         name: responseData[key].name,
  //         amount: responseData[key].amount
  //       })
  //     }
  //     setUserIngredients(loadedIngredient);
  //   })
  // },[]);

  useEffect(()=>{
    console.log('RENDERING INGREDIENTS',userIngredients);
  },[userIngredients])

  const filteredIngredientHandler = useCallback(filterIngredients => {
    setUserIngredients(filterIngredients);
  },[])

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

  const removeIngredientHandler = ingredientId => {
    fetch(`https://react-hooks-cb078.firebaseio.com/ingredients/${ingredientId}.json`,{
        method: 'DELETE',
        headers: {'Content-Type':'application/json'}
    }).then((response)=>{
      debugger
      setUserIngredients(prevIngredients=>
        prevIngredients.filter(ingredient=>ingredient.id !== ingredientId)
      )
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients = {userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
