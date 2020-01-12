import React,{useState,useEffect,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  const [userIngredients,setUserIngredients] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(()=>{
    console.log('RENDERING INGREDIENTS',userIngredients);
  },[userIngredients])

  const filteredIngredientHandler = useCallback(filterIngredients => {
    setUserIngredients(filterIngredients);
  },[])

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-cb078.firebaseio.com/ingredients.json',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(ingredient)
    }).then(response => {
      setIsLoading(false);
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
    setIsLoading(true)
    fetch(`https://react-hooks-cb078.firebaseio.com/ingredients/${ingredientId}.json`,{
        method: 'DELETE',
        headers: {'Content-Type':'application/json'}
    }).then((response)=>{
      setIsLoading(false)
      setUserIngredients(prevIngredients=>
        prevIngredients.filter(ingredient=>ingredient.id !== ingredientId)
      )
    }).catch((error)=>{
      setError('Something Went Wrong!');
    })
  }
  const clearError = () => {
    setError(null);
    setIsLoading(false);
  }
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient = {addIngredientHandler} loading = {isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients = {userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
