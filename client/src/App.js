import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItems";
import { useEffect,useState} from "react";
import Auth from './components/Auth';
import { useCookies } from "react-cookie";

const App = ()=> {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks,setTasks] = useState();

  const getData =async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${userEmail}`)
      const json = await response.json()
      setTasks(json);
    }
    catch(err){
      console.error(err)
    }
  }
  
  useEffect(() => {
    if(authToken)
    {
      getData();
    }
  }, [authToken])

  //Sort by date
  const sortedTasks = tasks?.sort((a,b)=> new Date(a.date) - new Date(b.date))

  return (
    <div className="App">
        {!authToken && <Auth/>}
        {authToken &&
        <>
          <ListHeader listName={"PERN Stack ToDoList App"} getData={getData}/>
          <p className="user-email">Welcome back {userEmail}</p>
          {sortedTasks?.map((task)=><ListItem key={task.id} task={task} getData={getData}/>)}
        </>}
    </div>
  );
}

export default App;
