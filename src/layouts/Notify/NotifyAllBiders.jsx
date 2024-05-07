import React from 'react'

export default function NotifyAllBiders() {
  return (
    <>
    <div className=' card-body container'>
        <div className=' mt-3'>
            <div className=' h3 mt-2'></div>
        </div>
        <hr />
        <div className=' col-6'>
            <p className=' mt-2 '> Aution Name : {} </p>
            <p className=' mt-2 text-success'> The Aution was Closed</p>
            <p className=' mt-2'> The Heghest Bid Was {} </p>
        </div>
    </div>

    </>
  )
}
