import React from 'react'

const FeedCard = ({feed}) => {
    console.log(feed);
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={feed?.imageUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{feed?.firstName}<span>{feed?.age}</span></h2>
    <p>{feed?.about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-primary">Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default FeedCard
