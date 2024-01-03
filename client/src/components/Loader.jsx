import React from 'react'
import LoadingGif from "../images/loader.gif"
const Loader = () => {
  return (
    <div className='loader'>
    <div className="loader-image">
        <img src={LoadingGif} alt="gif" />
    </div>
    </div>
  )
}

export default Loader