import { Link } from "react-router-dom";
import menuImg from '../images/menu.png';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import logo from '../images/logo.png';
import trademark from '../images/trademark.png';

const Header = () => {
const [checkUser, setCheckUser] = useState(false);
const navigate = useNavigate();

useEffect(() => {
  isUserAuth();
}, []);

const isUserAuth = async () => {
  try{
    let requestParams = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                Accept: "application/json"
            }
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/check`, requestParams);
        // const { data, newsletter, upgrades } = await response.json();
        const data = await response.json();

        if(data.message === 'Unauthenticated.' || !data || !localStorage.getItem('auth_token')){
            // localStorage.removeItem('auth_token');
            return;
        }

        if(data.auth === 'active') setCheckUser(true);

  } catch(err){
    console.log(err.message);
  }
}

// logout
const logout = async () => {
    try{
        let requestParams = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                Accept: "application/json"
            }
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/logout`, requestParams);
        const data = await response.json();
        
        if(data.status === 'success'){
            localStorage.removeItem('auth_token');
            navigate('/login', {replace: true});
            setCheckUser(false);
            closeMobileNav();
        }
    } catch(err){
        console.log(err.message);
    }
}

const closeMobileNav = () => {
  document.querySelector('#mobile-dpn').classList.add('hidden')
}
const toggleMobileNav = () => {
  document.querySelector('#mobile-dpn').classList.toggle('hidden')
}

return(
  <header className="web-container flex justify-between items-center h-[80px] relative z-20 text-white">
      <div className="logo">
        {/* <Link to="/"><h1 className="text-3xl font-bold">DynamiteApi</h1></Link> */}
        <Link to="/"><img src={trademark} className="w-[200px]" alt="logo" /></Link>
      </div>

      <nav>
        <ul className="flex gap-3 max-sm:hidden">
          <Link to="/dashboard?route=doc"><li className="hover:!text-amber-400 transition duration-150">Doc</li></Link>
          <Link to="/privacy"><li className="hover:!text-amber-400 transition duration-150">Privacy</li></Link>
          <Link to="/contact"><li className="hover:!text-amber-400 transition duration-150">Contact Us</li></Link>
        </ul>
      </nav>

      <div className="actions">
        {!checkUser && <div className="actions center gap-4 max-sm:!hidden">
          <Link to="/login" className="btn btn-white">Login</Link>
          <Link to="/signup" className="btn btn-white-outline">Signup</Link>
        </div>}
        
        {checkUser && <div className="flex items-center gap-2 relative group cursor-pointer max-sm:hidden">
          <span>Account</span>
          <i className='bxr  bxs-caret-down mt-1'></i> 
          <div className="dropdown absolute top-[100%] right-0 w-[150px] bg-white rounded-sm px-2 py-2
          text-black text-webcolor hidden group-hover:!block slideUp shadow-sm">
            <ul className="flex flex-col gap-2">
              <Link to="/dashboard"><li className="py-1 hover:bg-zinc-200 cursor-pointer px-2 rounded-[2px] flex justify-between items-center">
                <span>Dashboard</span>
                <i className='bxr  bxs-chevron-right text-xl'  ></i> 
              </li></Link>
              <button className="btn btn-blue !py-1 w-full" onClick={logout}>Logout</button>
            </ul>
          </div>
        </div>}
      </div>

      {/* Menu Icon */}
      <div className="menu min-sm:hidden mt-[5px]"
      onClick={() => toggleMobileNav()}>
        <img src={menuImg} width="30px" alt="menu icon"
        className='mt-2 cursor-pointer' />
      </div>

      <div id='mobile-dpn' className="mobile-dpn w-[300px] max-[320px]:!w-full py-1 px-2 rounded-md web-gradient shadow-lg
      absolute top-[100%] left-[50%] translate-x-[-50%] slideUp hidden min-sm:!hidden"
      >
        <ul className='flex flex-col items-s'>
          <Link to="/dashboard?route=doc" onClick={closeMobileNav}><li className='py-1 px-2 hover:bg-gray-800 cursor-pointer rounded-sm'>Doc</li></Link>
          <Link to="/privacy" onClick={closeMobileNav}><li className='py-1 px-2 hover:bg-gray-800 cursor-pointer rounded-sm'>Privacy</li></Link>
          <Link to="/contact" onClick={closeMobileNav}><li className='py-1 px-2 hover:bg-gray-800 cursor-pointer rounded-sm'>Contact Us</li></Link>
          {checkUser && <Link to="/dashboard" onClick={closeMobileNav}><li className='py-1 px-2 hover:bg-gray-800 cursor-pointer rounded-sm'>Dashboard</li></Link>}
          {!checkUser && <React.Fragment>
            <Link to="/signup" className="btn btn-white-outline my-2 !rounded-full w-full text-center" onClick={closeMobileNav}>Signup</Link>
            <Link to="/login" className="btn btn-white !rounded-full w-full text-center mb-2" onClick={closeMobileNav}>Login</Link>
          </React.Fragment>}
          {checkUser && <button className="btn btn-white !rounded-full w-full text-center my-2" onClick={logout}>Logout</button>}
        </ul>
      </div>
    </header>
)
}

export { Header };

const Home = () => {
return (
  <section className='index web-container text-white center' style={{minHeight: "calc(100vh - 80px)"}}>
    {/* <Header /> */}
    <div className="flex justify-between items-center gap-3 py-4 w-full">
      {/* description */}
      <div className="w-[600px] max-sm:w-full flex flex-col gap-4">
        <div>
          <p className="flex items-center gap-2">
            <i className='bxr bxs-star'></i> <span>Dynamite Resources</span>
          </p>
          <p className="text-amber-300">Access the Past, Power Your Apps</p>
        </div>
        <h1 className="text-5xl  font-bold leading-[1.1]">The Best Api For You!</h1>
        <p>Our platform provides a simple and reliable API for retrieving accurate historic information. Build smarter apps, websites, and projects with verified data — all through a seamless developer-friendly API.</p>
        <Link to="/dashboard" className="btn btn-white w-fit">Get Started</Link>
      </div>

      <div className="size-[550px] bg-white rounded-full center max-md:!hidden"
      style={{color: "dodgerblue"}}>
        <div className="b">
          <h1 className="text-2xl font-bold pb-1">Featuring:</h1>
          <ul>
            <li className="flex items-center gap-2"><i className='bxr  bx-checks'></i> <span>Nation Histories</span></li>
            <li className="flex items-center gap-2"><i className='bxr  bx-checks'></i> <span>Celebrity Biographies</span></li>
            <li className="flex items-center gap-2"><i className='bxr  bx-checks'></i> <span>Richest Countries</span></li>
            <li className="flex items-center gap-2"><i className='bxr  bx-checks'></i> <span>World Records</span></li>
          </ul>
          <p>...and some other wonderful realtime APIs.</p>
        </div>
      </div>
    </div>
  </section>
);
}

export default Home;