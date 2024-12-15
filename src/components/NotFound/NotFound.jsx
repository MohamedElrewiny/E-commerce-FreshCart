import React from 'react'
import Style from './NotFound.module.css'
import image from '../../Assets/images/error.svg'

export default function NotFound() {
  return <>
  <div className="d-flex flex-column align-items-center justify-content-center py-3">
    <img src={image} alt="Error 404 => PAge Not Found" />
    <div className='fs-2 fw-bolder text-main my-5'>Page Not Found</div>
  </div>

  </>
}
