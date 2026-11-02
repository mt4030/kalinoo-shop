import SearchInput from '@/features/search/components/Search';
import logo from '../../../assets/text-logo.webp'
import AboveNavImg from './aboveNavImg';
import HeaderNav from './HeaderNav';
import HeaderTop from './HeaderTop';

import MobileBottomNav from './mobilenav';
import { useLocation } from 'react-router-dom';
export default function Header(){
const location=useLocation()
const isProductPage = location.pathname.startsWith("/product/")

return(
   <> 
   
<AboveNavImg/>

<div className={`sm:hidden ${isProductPage ? "relative top-4" : ""}`}>
  <SearchInput />
</div>


<MobileBottomNav/>
<nav className="flex relative z-50 flex-col p-2 px-40 border-b border-zinc-200 hidden sm:block">
   
<HeaderTop logo={logo}/>

<div className='flex gap-5'>
   
</div>
<HeaderNav />

</nav>
   </>
   
   
)

}
