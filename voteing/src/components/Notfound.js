import React from 'react'
import foundImage from '../assets/404-page.png';
function Notfound() {
    
  return (
    <div>

<img className=''  src={foundImage} alt='notfound'/>
<a href="/"
   class="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent mt-4">
   Back To Home
</a>

    </div>
  )
}

export default Notfound