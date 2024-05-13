import Search from "./Buscador"
import  BanderaChile  from "../assets/images/chile.png"
const MiApi = () =>{
  return(
    <>
    <div className="titulo">

      <h1>Clima de Chile<span> <img src={ BanderaChile } alt="" /></span></h1>
    </div>
    <div className="mi-app">
    <Search />
    </div>
  
    
    </>
  )
}

export default MiApi