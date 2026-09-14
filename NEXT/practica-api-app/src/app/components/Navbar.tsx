import Link from "next/link";

export default function Navbar(){
    return (
    <nav>
      <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm select-none">RICKY Y MORTY</h2>
      <Link href='/favoritos'>

      <span className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm py-2.5 px-4 rounded-lg shadow-md transition-all duration-200 active:scale-[0.98]">* Mis Favoritos</span> 
      
      </Link>


      
    </nav>
    )
}