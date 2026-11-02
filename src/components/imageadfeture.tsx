import a from '../assets/feture-1.webp'
import b from '../assets/feture-2.webp'
import c from '../assets/feture-3.webp'
import d from '../assets/feture-4.webp'

const Imageadfeture =()=>{



    return(
        <div className="grid gap-2    grid-cols-2 md:grid-cols-4">
            <div>
<img src={a} alt="" />
            </div>
            <div>
<img src={b} alt="" />
            </div>
            <div>
<img src={c} alt="" />
            </div>
            <div>
                <img src={d} alt="" />
            </div>
        </div>
    )
}

export default Imageadfeture 