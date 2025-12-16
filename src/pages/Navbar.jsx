import React from 'react'

const Navbar = () => {
  return (
   <>
   <div className="h-[5rem] sticky top-0 navbar bg-gradient-to-b from-pink-500 via-red-500 to-orange-500 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-[2rem]">Dev Tinder</a>
  </div>
  <div className="flex justify-center items-center gap-2  w-20 h-20">
    <div className="dropdown dropdown-end w-full">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-full">
        <div className="w-12  rounded-full">
          <img
            alt="profileImage"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

   </>
  )
}

export default Navbar
