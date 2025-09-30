import { Link } from "react-router-dom";
import menuImg from '../images/menu.png';

const Home = () => {
  return (
    <section className='index min-h-screen w-full web-gradient text-white'>
      <nav className="web-container flex justify-between items-center h-[80px] relative">
        <div className="logo">
          <h1 className="text-3xl font-bold">DynamiteApi</h1>
        </div>

        <ul className="flex gap-3 max-sm:hidden">
          <Link to="/dashboard?route=doc"><li className="hover:!text-amber-400 transition duration-150">Doc</li></Link>
          <Link><li className="hover:!text-amber-400 transition duration-150">Privacy</li></Link>
          <Link><li className="hover:!text-amber-400 transition duration-150">Contact Us</li></Link>
        </ul>

        <div className="btns center gap-4 max-sm:!hidden">
          <Link to="/login" className="btn btn-white">Login</Link>
          <Link to="/signup" className="btn btn-white-outline">Signup</Link>
        </div>

        {/* Menu Icon */}
        <div className="menu min-sm:hidden"
        onClick={() => document.querySelector('#mobile-dpn').classList.toggle('hidden')}>
          <img src={menuImg} width="30px" alt="menu icon"
          className='mt-2' />
        </div>

        <div id='mobile-dpn' className="mobile-dpn w-[300px] max-[320px]:!w-full p-1 rounded-md web-gradient shadow-lg
        absolute top-[100%] left-[50%] translate-x-[-50%] slideUp hidden min-sm:!hidden"
        >
          <ul className='flex flex-col items-s'>
            <Link to="/dashboard?route=doc"><li className='py-1 px-2 hover:bg-gray-800 cursor-pointer rounded-sm'>Doc</li></Link>
            <Link><li className='py-1 px-2 hover:bg-gray-800 cursor-pointer rounded-sm'>Privacy</li></Link>
            <Link><li className='py-1 px-2 hover:bg-gray-800 cursor-pointer rounded-sm'>Contact Us</li></Link>
            <Link to="/signup" className="btn btn-white-outline my-2 !rounded-full w-full text-center">Signup</Link>
            <Link to="/login" className="btn btn-white !rounded-full w-full text-center mb-2">Login</Link>
          </ul>
        </div>
      </nav>

      <div className="hero web-container flex justify-between items-center gap-3 py-4" 
      style={{minHeight: "calc(100vh - 80px)"}}>
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