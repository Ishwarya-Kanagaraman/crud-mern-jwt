import {Switch,Route} from "react-router-dom";
import Home from "./components/home/home";
import Register from "./pages/Register/Register"
import Login from "./pages/login/Login"
import Movie from "./components/movie/Movie";
import Edit from "./components/edit/Edit";
import Create from "./components/create/Create"
function App() {
 
  return (
    <div className="App">
      <Switch>
      <Route exact path='/'>
          <Home/>
        </Route>
         <Route  path='/movies'>
          <Movie/>
        </Route>
        <Route  path='/edit'>
          <Edit/>
        </Route>
        <Route  path='/create'>
          <Create />
        </Route>
        <Route exact path='/register'>
          <Register/>
        </Route>
        <Route exact path='/login'>
          <Login/>
        </Route>
         
        )}
        
       
      </Switch>
    </div>
  );
}

export default App;
