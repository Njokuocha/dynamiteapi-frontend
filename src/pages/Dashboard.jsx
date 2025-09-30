import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import starBgImg from '../images/start-blue-bg.jpeg';
import MyChart from "./Chart";

import emailWatermarkImg from '../images/email-watermark.png';
import newsletterImg from '../images/newsletter.png';
import emailMarketingImg from '../images/email-marketing.png';
import userImg from '../images/user.png';
import hamburgerImg from '../images/hamburger.png';

const Dashboard = () => {
const [user, setUser] = useState();
const [apiKey, setApiKey] = useState();
const [requestFig, setRequestFig] = useState(0);
const navigate = useNavigate();
const [params] = useSearchParams();


let comments = [
    {
        name: "Sarah Johnson - Lead Software Engineer at TechCore Solutions",
        comment: "DynamiteApi has completely streamlined how we access historical data. The API is fast, secure, and easy to integrate — perfect for production apps."
    },
    {
        name: "Michael Lee - Product Manager at DataBridge Inc.",
        comment: "The documentation is clear, and the response times are impressive. DynamiteApi saved our team weeks of development."
    },
    {
        name: "Priya Desai - Full-Stack Developer at CloudWorks",
        comment: "I love how seamless the Google authentication integration is. Our users can log in securely with no friction"
    },
    {
        name: "David Kim - CTO at Insight Analytics",
        comment: "We needed a reliable source for historical data, and DynamiteApi delivered. The support team is also very responsive."
    },
    {
        name: "Amelia Roberts - EdTech Founder at LearnSphere",
        comment: "Clean, well-structured, and secure — DynamiteApi is exactly what we needed for our educational platform."
    },
    {
        name: "Carlos Mendes - Senior Backend Engineer at NovaTech",
        comment: "Integrating DynamiteApi into our app was effortless. The API endpoints are consistent and developer-friendly."
    },
    {
        name: "Sophia Nguyen - Project Lead at HistoriX Labs",
        comment: "Our project needed accurate historical data, and DynamiteApi provided it with excellent uptime and speed."
    },
    {
        name: "James O’Connor - DevOps Engineer at ScalePoint",
        comment: "The rate limiting is well-balanced, ensuring performance without service abuse — a sign of great API design"
    },
    {
        name: "Lara Smith - CEO at ChronoApps",
        comment: "DynamiteApi is a must-have for any developer looking to build history-focused apps quickly and securely."
    }
]

useEffect(() => {
    const getUser = async () => {
        try{
            let requestParams = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                    Accept: "application/json"
                }
            }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/user`, requestParams);
            const data = await response.json();
            // console.log(response);
            // console.log(data);
            if(data.message === 'Unauthenticated.' || !data){
                localStorage.removeItem('auth_token');
                navigate('/login', {replace: true});
                return;
            }
            setUser(data);
            setApiKey(data.apiKey);
            setRequestFig(data.rfig);
        } catch(err){
            console.log(err.message);
        }
    }
    getUser();
}, []);

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
        
        console.log(data);
        if(data.status === 'success'){
            localStorage.removeItem('auth_token');
            navigate('/login', {replace: true});
        }
    } catch(err){
        console.log(err.message);
    }
}

// get new apiKey
const generateKey = async () => {
    try{
        let requestParams = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                Accept: "application/json"
            }
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/newApikey`, requestParams);
        const data = await response.json();
        
        setApiKey(data.key);
    } catch(err){
        console.log(err.message);
    }
}

// copy text to clipboard
const copyText = (event) => {
    navigator.clipboard.writeText(event.currentTarget.previousElementSibling.innerText)
        .then(() => {
            alert("Text copied");
        }).catch(err => console.error("Failed to copy: ", err.message));
}

return (
    user &&
    <section className="dashboard h-screen w-full web-gradient">
        <div className="wrapper web-container h-full py-4 flex flex-col gap-3">
            <header className="h-[60px] text-white rounded-md py-3 px-2 flex justify-between items-center">
                <h1 className="text-3xl max-[480px]:text-2xl font-bold" >Dashboard</h1>
                <nav>
                    <ul className="flex gap-6">
                        <Link to="?route=doc"><li><b>Doc</b></li></Link>
                        <Link to="?route=blog"><li><b>Blog</b></li></Link>
                        <img src={hamburgerImg} className="w-[25px] min-md:!hidden cursor-pointer" 
                        onClick={() => document.querySelector('.sidebar').classList.toggle('max-md:hidden')}/>
                    </ul>
                </nav>
            </header>
            <div className="content flex gap-4"
            style={{height: 'calc(100% - 60px)'}}>

{/* ******************************************** */}
{/* ******************************************** */}
{/* ******************************************** */}
                {/* Sidebar */}
                <div className="sidebar w-[250px] h-full bg-white rounded-md p-3 overflow-auto
                flex flex-col gap-4
                max-md:fixed max-md:top-0 max-md:left-0 max-md:z-20 max-md:h-screen max-md:rounded-[0]
                max-md:hidden" id="sidebar">
                    <div className="close-btn flex justify-end min-md:hidden">
                        <i className='bxr  bxs-x' 
                        onClick={() => document.querySelector('.sidebar').classList.add('max-md:hidden')}></i> 
                    </div>
                    <div className="user">
                        <figure className="center flex-col gap-1">
                            <img src={user?.avatar} alt="user image" 
                            className="size-[50px] rounded-full"
                            onError={(e) => e.currentTarget.src = userImg} />
                            <figcaption className="text-center">
                                <h1 className="text-md font-bold">{user?.name}</h1>
                                <p className="opacity-50 mt-[2px] text-[11px]">{user?.email}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <nav className="text-[15px] grow overflow-auto">
                        <ul>
                            {/* <li className="py-1 px-2 rounded-sm hover:bg-gray-200 cursor-pointer">Credentials</li> */}
                            <Link to="?route=upgrade"><li className="py-1 px-2 rounded-sm hover:bg-gray-200 cursor-pointer">Upgrade</li></Link>
                            <Link to="?route=newsletter"><li className="py-1 px-2 rounded-sm hover:bg-gray-200 cursor-pointer">Newsletter</li></Link>
                        </ul>
                    </nav>

                    <div className="logout">
                        <button className="btn center gap-1 text-white w-full" 
                        style={{backgroundColor: "rgb(45, 127, 127)"}}
                        onClick={logout}>
                            <i className='bx  bx-arrow-out-up-right-square'  ></i> 
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

{/* ******************************************** */}
{/* ******************************************** */}
{/* ******************************************** */}
                {/* Content */}
                <section className="grow w-[600px] h-full overflow-y-auto scroll-design rounded-md">
                <div className="credentials w-full h-fit bg-white rounded-md p-3 overflow-y-auto
                min-[920px]:!hidden">
                    <div className="content">
                        {/* Api Credentials */}
                        <div className="apiKey">
                            <div className="title pb-3">
                                <h1 className="text-2xl font-bold webcolor text-center">Credentials</h1>
                            </div>
                            <p className="small-caps">Api Key:</p>
                            <div className="py-3 px-3 rounded-md shadow-md
                            border border-gray-200 flex flex-col gap-3">
                                <p className="text-sm break-all">{apiKey ?? "Key not present"}</p>
                            {/* <div className="flex justify-end pt-1"> */}
                                <i className='bxr  bx-copy cursor-pointer self-end' 
                                onClick={(event) => copyText(event)}></i>    
                            {/* </div>  */}
                            </div>

                            <div className="btn-wrapper mt-3">
                                <button className="btn bg-amber-500 text-white w-full" onClick={generateKey}>Re-generate</button>
                            </div>
                        </div>

                        <div className="requests mt-4">
                            <div className="title pb-3">
                                <p className="text-md opacity-50">Requests Tracker</p>
                            </div>

                            <div>
                                <div className="w-full h-[8px] rounded-[2px] bg-amber-600 flex">
                                    <span className="h-full web-bg rounded-[2px]"
                                    style={{width: `calc(${(requestFig/user?.rlimit * 100)}%)`}}></span>
                                </div>
                                <p className="opacity-[0.5] py-1 text-[14px]">{requestFig} out of {user?.rlimit}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="main bg-white rounded-md px-3 pt-3 pb-6 scroll-design max-[920px]:mt-3">
                    {/* doc */}
                    {(params.get('route') === 'doc' || params.get('route') == null)
                    && <div className="flex flex-col gap-8">
                        {/* Endpoint */}
                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-bold">Endpoint</p>
                            <div className="py-3 px-3 rounded-md shadow-md
                            border border-gray-200 flex flex-col">
                                <p>http://dynamiteapi.test/api/</p>
                                <i className='bxr  bx-copy cursor-pointer self-end pt-2' 
                                onClick={(event) => copyText(event)}></i> 
                            </div>
                            <p className="opacity-75">The url base to different available resources.</p>
                        </div>

                        {/* /presidents */}
                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-bold">/presidents</p>
                            <div className="py-3 px-3 rounded-md shadow-md
                            border border-gray-200 flex flex-col">
                                <p className="break-all">http://dynamiteapi.test/api/presidents</p>
                                <i className='bxr  bx-copy cursor-pointer self-end pt-2'
                                onClick={(event) => copyText(event)}></i> 
                            </div>
                            <p className="opacity-75">List of current world presidents according to countries name alphabetically.</p>
                        </div>

                        {/* /presidents/country_presidents */}
                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-bold break-all">/presidents/&#123;country_presidents&#125;</p>
                            <div className="py-3 px-3 rounded-md shadow-md
                            border border-gray-200 flex flex-col">
                                <p className="break-all">http://dynamiteapi.test/api/presidents/us_presidents</p>
                                <i className='bxr  bx-copy cursor-pointer self-end pt-2'
                                onClick={(event) => copyText(event)}></i> 
                            </div>
                            <p className="opacity-75">List of a specific country's ever serving presidents.</p>
                        </div>

                        {/* query parameter */}
                        <div className="flex flex-col gap-4">
                            <p className="text-xl">Query Parameters</p>
                            {/* ?limit */}
                            <div>
                                <p className="text-xl font-bold">?limit=&#123;number&#125;</p>
                                <p className="opacity-75">Creates a limit or maximum number for a record.</p>
                                <p className="text-lg py-1">Examples</p>
                                <div className="py-3 px-3 rounded-md shadow-md bg-zinc-200
                                border border-gray-200 flex flex-col">
                                    <p className="break-all">http://dynamiteapi.test/api/presidents?limit=10</p>
                                    <i className='bxr  bx-copy cursor-pointer self-end pt-2'
                                    onClick={(event) => copyText(event)}></i> 
                                </div>
                                <div className="py-3 px-3 rounded-md shadow-md bg-zinc-200
                                border border-gray-200 flex flex-col mt-3">
                                    <p className="break-all">http://dynamiteapi.test/api/presidents/us_presidents?limit=25</p>
                                    <i className='bxr  bx-copy cursor-pointer self-end pt-2'
                                    onClick={(event) => copyText(event)}></i> 
                                </div>
                                <p className="opacity-75 flex gap-2 py-2">
                                    <i className='bxr  bx-info-octagon mt-2'  ></i> 
                                    <span>Limit must not exceed the total number of records available.
                                    Anyways, gets ignored if applied.</span>
                                </p>
                            </div>
                            {/* ?random */}
                            <div>
                                <p className="text-xl font-bold">?random=&#123;boolean&#125;</p>
                                <p className="opacity-75">Shuffles a record in random order</p>
                                <p className="text-lg py-1">Examples</p>
                                <div className="py-3 px-3 rounded-md shadow-md bg-zinc-200
                                border border-gray-200 flex flex-col">
                                    <p className="break-all">http://dynamiteapi.test/api/presidents?random=true&limit=10</p>
                                    <i className='bxr  bx-copy cursor-pointer self-end pt-2'
                                    onClick={(event) => copyText(event)}></i> 
                                </div>
                                <div className="py-3 px-3 rounded-md shadow-md bg-zinc-200
                                border border-gray-200 flex flex-col mt-3">
                                    <p className="break-all">http://dynamiteapi.test/api/presidents/us_presidents?random=false&limit=25</p>
                                    <i className='bxr  bx-copy cursor-pointer self-end pt-2'
                                    onClick={(event) => copyText(event)}></i> 
                                </div>
                            </div>
                        </div>
                    </div>}
                    
                    {/* blog */}
                    {params.get('route') === 'blog' && <div className="blog">
                        <div className="intro-bg h-[200px] w-full rounded-md center"
                        style={{
                            backgroundImage: `url(${starBgImg})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "bottom center",
                            backgroundColor: "rgba(0,0,0,0.3)",
                            backgroundBlendMode: "darken"
                        }}><h1 className="text-2xl font-bold text-white">DynamiteApi</h1></div>

                        {/* Achievements */}
                        <div className="achievements mt-2">
                            <div className="items flex items-center justify-center gap-x-9 gap-y-4 text-[14px] flex-wrap">
                                <div className="item">
                                    <p>Ratings</p>
                                    <div className="flex gap-2 items-center">
                                        <i className='bxr  bxs-star text-amber-400'></i> 
                                        <i className='bxr  bxs-star text-amber-400'></i> 
                                        <i className='bxr  bxs-star text-amber-400'></i> 
                                        <i className='bxr  bxs-star text-amber-400'></i> 
                                        <i className='bxr  bx-star text-amber-400'></i> 
                                    </div>
                                    <p>Over 267,000 ratings</p>
                                </div>

                                <div className="item">
                                    <p className="flex gap-2"><i className='bxr  bxs-message-star text-xl webaqua'></i> <span>Comments</span></p>
                                    <p>About <span className="webaqua font-bold">1500</span> comments</p>
                                </div>

                                <div className="item flex flex-col gap-1">
                                    <p>Partnership</p>
                                    <div className="flex gap-2 items-center">
                                        <i className='bxr  bx-medal-star-alt text-sky-400'></i> 
                                        <i className='bxr  bx-medal-star-alt text-sky-400'></i> 
                                        <i className='bxr  bx-medal-star-alt text-sky-400'></i> 
                                    </div>
                                    <p className="font-bold"><span>3+</span> Partnerships</p>
                                </div>

                                <div className="item flex flex-col items-center text-center gap-1">
                                    <i class='bxr  bxs-solar-panel text-xl text-teal-800'></i> 
                                    <p>More APIs <br /> In Development</p>
                                </div>

                                <div className="item flex flex-col items-center text-center gap-1">
                                    <i class='bxr  bxs-pulse text-xl text-teal-800'></i> 
                                    <p>Realtime APIs</p>
                                </div>
                            </div>
                        </div>

                        <section className="flex gap-3 mt-6 max-lg:flex-col-reverse max-lg:items-center">
                        {/* Comments */}
                        <div className="comments w-[350px] h-[400px] overflow-auto flex flex-col gap-3 scroll-design px-2
                        max-lg:w-full max-lg:h-fit">
                        <h1 className="text-md pb-2 font-bold">Top Comments</h1>
                        {
                            comments.map((item, key) => (
                            <article className="comment flex gap-2">
                                <i class='bxr  bxs-user'></i> 
                                <div>
                                    <div className="rounded-sm p-2 bg-zinc-300 text-[13px] grow">
                                        <p>{item.comment}</p>
                                    </div>
                                    <p className="text-[12px]">{item.name}</p>
                                </div>
                            </article>
                            ))
                        }
                        </div>

                        <div className="grow w-[250px] max-lg:w-[70%] max-[480px]:!w-[85%]">
                            <MyChart />
                            <div className="py-3 px-3 web-gradient text-white text-center rounded-md my-3">
                                <p>Top 5 APIs - Top Request</p>
                            </div>
                        </div>
                        </section>
                    </div>}

                    {/* newsletter */}
                    {params.get('route') === 'newsletter' && <div className="newsletter w-full h-full center relative z-10">
                        <div className="w-[500px]">
                            <figure className="flex flex-col items-center gap-2 text-center">
                                <img src={newsletterImg}
                                className="w-[80px]" />
                                <figcaption>
                                    <p className="text-lg">Subscribe to Our Newsletter</p>
                                </figcaption>
                            </figure>

                            <div className="flex flex-col gap-3 mt-2">
                                <p className="text-center">Get the latest updates, feature releases, and API tips delivered straight to your inbox. Subscribe to our newsletter and never miss important announcements or developer insights.</p>
                                <form>
                                    <div className="flex gap-1 max-[340px]:flex-col">
                                        <input type="email" name="email" placeholder="Attach Email"
                                        className="grow border border-zinc-600 rounded-sm px-2 max-[340px]:h-[40px] outline-none" />
                                        <button className="btn btn-blue">Subscribe</button>
                                    </div>
                                </form>
                            </div>

                            <div className="newsletter-watermark absolute bottom-0 left-[50%]
                            translate-x-[-50%] -z-10">
                                <img src={emailWatermarkImg}
                                className="w-[200px] opacity-[0.2]" />
                            </div>
                        </div>
                    </div>}

                    {/* upgrade */}
                    {params.get('route') === 'upgrade' && <div className="upgrade">
                        <h1 className="text-2xl font-bold pb-8">Upgrade</h1>
                        <div className="items flex gap-3 flex-wrap">
                            <div className="item grow w-[300px] border border-gray-400 rounded-sm
                            h-[300px] p-3 flex flex-col justify-between items-center gap-4">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold webcolor">Free Plan</h1>
                                    <p className="text-xl font-bold pt-1">$0.00</p>
                                </div>
                                <div className="mt-2 w-full">
                                    <p>Gain Access To:</p>
                                    <ul className="flex flex-col gap-1 text-[15px]">
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>30 Calls for Per minute</span>
                                        </li>
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>500 Limited Trials</span>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <button className="btn btn-blue w-full">In use</button>
                                <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                            </div>

                            <div className="item grow w-[300px] border border-gray-400 rounded-sm
                            h-[300px] p-3 flex flex-col justify-between items-center gap-4">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold webaqua">Tier 1</h1>
                                    <p className="text-xl font-bold pt-1">$9.00/Month</p>
                                </div>
                                <div className="mt-2 w-full">
                                    <p>Gain Access To:</p>
                                    <ul className="flex flex-col gap-1 text-[15px]">
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>100 Calls for Per minute</span>
                                        </li>
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>1200 Limited Trials</span>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <button className="btn webaquabg text-white w-full">Upgrade</button>
                                <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                            </div>

                            <div className="item grow w-[300px] border border-gray-400 rounded-sm
                            h-[300px] p-3 flex flex-col justify-between items-center gap-4">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-amber-500">Tier 2</h1>
                                    <p className="text-xl font-bold pt-1">$23.00/Month</p>
                                </div>
                                <div className="mt-2 w-full">
                                    <p>Gain Access To:</p>
                                    <ul className="flex flex-col gap-1 text-[15px]">
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>450 Calls for Per minute</span>
                                        </li>
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>2000 Limited Trials</span>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <button className="btn bg-amber-500 text-white w-full">Upgrade</button>
                                <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                            </div>

                            <div className="item grow w-[300px] border border-gray-400 rounded-sm
                            h-[300px] p-3 flex flex-col justify-between items-center gap-4">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-purple-500">Tier 3</h1>
                                    <p className="text-xl font-bold pt-1">$45.00/Month</p>
                                </div>
                                <div className="mt-2 w-full">
                                    <p>Gain Access To:</p>
                                    <ul className="flex flex-col gap-1 text-[15px]">
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>1K Calls for Per minute</span>
                                        </li>
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>5000 Limited Trials</span>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <button className="btn bg-purple-500 text-white w-full">Upgrade</button>
                                <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                            </div>

                            <div className="item grow w-[300px] border border-gray-400 rounded-sm
                            h-[300px] p-3 flex flex-col justify-between items-center gap-4">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold ">Tier 5</h1>
                                    <p className="text-xl font-bold pt-1">$95.00/Month</p>
                                </div>
                                <div className="mt-2 w-full">
                                    <p>Gain Access To:</p>
                                    <ul className="flex flex-col gap-1 text-[15px]">
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>5K Calls for Per minute</span>
                                        </li>
                                        <li className="flex gap-2 items-center">
                                            <i className='bxr  bxs-checks'></i> 
                                            <span>Unlimited Trials</span>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <button className="btn bg-black text-white w-full">Upgrade</button>
                                <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                            </div>
                        </div>
                    </div>}
                </div>
                </section>

{/* ******************************************** */}
{/* ******************************************** */}
{/* ******************************************** */}
                {/* Credentials */}
                <div className="credentials w-[250px] h-full bg-white rounded-md p-3 overflow-y-auto
                max-[920px]:!hidden">
                    <div className="content">
                        {/* Api Credentials */}
                        <div className="apiKey">
                            <div className="title pb-3">
                                <h1 className="text-2xl font-bold webcolor text-center">Credentials</h1>
                            </div>
                            <p className="small-caps">Api Key:</p>
                            <div className="py-3 px-3 rounded-md shadow-md
                            border border-gray-200 flex flex-col gap-3">
                                <p className="text-sm break-all">{apiKey ?? "Key not present"}</p>
                            {/* <div className="flex justify-end pt-1"> */}
                                <i className='bxr  bx-copy cursor-pointer self-end' 
                                onClick={(event) => copyText(event)}></i>    
                            {/* </div>  */}
                            </div>

                            <div className="btn-wrapper mt-3">
                                <button className="btn bg-amber-500 text-white w-full" onClick={generateKey}>Re-generate</button>
                            </div>
                        </div>

                        <div className="requests mt-4">
                            <div className="title pb-3">
                                <p className="text-md opacity-50">Requests Tracker</p>
                            </div>

                            <div>
                                <div className="w-full h-[8px] rounded-[2px] bg-amber-600 flex">
                                    <span className="h-full web-bg rounded-[2px]"
                                    style={{width: `calc(${(requestFig/user?.rlimit * 100)}%)`}}></span>
                                </div>
                                <p className="opacity-[0.5] py-1 text-[14px]">{requestFig} out of {user?.rlimit}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
);
}
 
export default Dashboard;