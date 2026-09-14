import Link from 'next/link';
import CardCharacter from '../components/CardCharacter';
import { supabase } from "../repositories/supabase"
import Navbar from '../components/Navbar';


export default async function page() {

    //Voy a obtener todos los personas favoritos.
    const {data:favoritos,error} = await supabase.from('favoritos').select('*');


  return (
    <div className="container mx-auto p-4">
        <br></br>
        <Navbar></Navbar> 
        <br></br>
        <Link href='/' className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm py-2.5 px-5 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-200 active:scale-95">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>

        Volver al inicio
        </Link>
        
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xl font-bold text-white truncate">

      {favoritos?.map((personaje) =>{
        return <CardCharacter key={personaje.id} id={personaje.id} nombre={personaje.name} imagen={personaje.image} estado={personaje.status} />

      }
      )}
      </div>

    </div>
  )
}
