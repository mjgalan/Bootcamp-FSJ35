import Image from "next/image";
import CardCharacter from "./components/CardCharacter";
import Navbar from "./components/Navbar";

type Character={
    id: number;
    name:string;
    image:string;
    status:string;
}

export default async function Home() {

  
    //Llevar a Fetch a llevar nuestros personajes.
    const resultado = await fetch('https://rickandmortyapi.com/api/character');
    const data = await resultado.json();

    console.log(data);

    const personajes = data.results;
    //const personajes : {name:string} [] = data.results;
   
 

  return (
   

    <div className="container mx-auto p-4 ">
     <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm select-none">Holiwis</h1> 

     <Navbar/>  
     
     <br></br> 
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xl font-bold text-white truncate">
     {personajes.map( ( personaje : Character) => {
      return <CardCharacter key={personaje.id} id={personaje.id} nombre={personaje.name} imagen={personaje.image} estado={personaje.status}  />
    })}
    </div>

    </div>
  );
}


