import React,{useEffect, useState}from 'react';
import Recipe from './Recipe';
import NotFounds from './NotFounds';
//import RecipDetail from './RecipeDetail';
import './App.scss';

// import { Hint } from 'react-autocomplete-hint';
const App = ()=> {

  const APP_ID = '34eca261';
  const APP_KEY = 'b6e1b43d6dc1f4a11b34915a349581fa';

  //const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken')
  
  //const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
   getRecipes();
  },[query]);
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value)
    //console.log(search);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');

  }

  

  
  

  return(
    <div className="App">
    <div className="jumbotron jumbotron-fluid">COOKING RECIPE </div>
      <form onSubmit ={getSearch} autoComplete="off" className="search-form form-inline">
          <input placeholder="Search..." className="form-control  input-group lg-3"  type="text" value={search} onChange={updateSearch} />
          
          <button type="submit" className=" searching btn btn-primary btn-md " > 
          <i className="glyphicon glyphicon-search"></i> Search 
          </button>
          
      </form>
      
      
      {
        recipes.map(recipe => (
          recipe.recipe.label.length <= 0 ?
          <NotFounds />
         :
          <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            dishType={recipe.recipe.dishType}
            mealType={recipe.recipe.mealType}
            calories={recipe.recipe.calories}
            totalTime={recipe.recipe.totalTime}
            url={recipe.recipe.url}
            /> 
            
              
        ))
        
      }
     
    </div>
  )
}

export default App;
