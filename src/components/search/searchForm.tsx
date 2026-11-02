import { Search } from "lucide-react";
import { ArrowRight } from "lucide-react"

const Searchform=({setInput,handleSubmit,handelfocus,input,setIsSearchOpen,isSearchOpen})=>{


    return(
        <form onSubmit={handleSubmit } className=" relative z-50">
            
         
        <Search className="absolute top-2 right-2 hidden sm:block" /> 
         
           
      <input type="text"
       className="bg-gray-100 p-2 z-49  w-full max-w-4xl rounded-2xl text-right pr-10  cursor-pointer " 
       placeholder="جستجو در کالینو شاپ" 
        onChange={(e) => setInput(e.target.value)}
       onFocus={handelfocus}
       value={input}
      
       />  

{isSearchOpen ? (
  <button
    type="button"
    className="absolute right-2 top-2 z-50 sm:hidden"
    onMouseDown={() => setIsSearchOpen(false)}
  >
    <ArrowRight />
  </button>
) : (
  <Search className="absolute right-2 top-2 sm:hidden" />
)}


    </form>
    )
}

export default Searchform