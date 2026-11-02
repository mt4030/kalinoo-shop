import { Menu } from "lucide-react";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CategoriesMenu from "./categoriesmenu";

const MegaMenu=()=>{

const [isMenuOpen, setIsMenuOpen] = useState(false)

  const location = useLocation();
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);


return(
   
    
    <div className='relative'
 onMouseEnter={() => setIsMenuOpen(true)}
  onMouseLeave={() => setIsMenuOpen(false)}>
  <div className="relative font-semibold pl-6 after:absolute after:left-0 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:bg-gray-200 after:content-['']">
    
    دسته بندی کالا ها
    <Menu className="inline-block ml-2 align-middle" size={24} />
  </div>
  
   {isMenuOpen && <CategoriesMenu />}
</div>
    
)
}
export default MegaMenu