import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import starBgImg from '../images/start-blue-bg.jpeg';
import MyChart from "./Chart";
import PayButton from "../tools/Paystack";

import emailWatermarkImg from '../images/email-watermark.png';
import newsletterImg from '../images/newsletter.png';
import emailMarketingImg from '../images/email-marketing.png';
import userImg from '../images/user.png';
import hamburgerImg from '../images/hamburger.png';
import envelopeImg from '../images/envelope.png';
import badgeOneImg from '../images/premium-badge-1.png';
import badgeTwoImg from '../images/premium-badge-2.png';
import badgeThreeImg from '../images/premium-badge-3.png';
import badgePremiumImg from '../images/premium-badge.png';
import badgeFreeImg from '../images/premium-badge-free.png';

const Dashboard = () => {
const [user, setUser] = useState(null);
const [apiKey, setApiKey] = useState(null);
const [requestFig, setRequestFig] = useState(0);
const [newsSubStatus, setNewsSubStatus] = useState(false);
const [alertStatus, setAlertStatus] = useState(false);
const [loaderStatus, setLoaderStatus] = useState(false);
const [msg, setMsg] = useState("");
const [emailInput, setEmailInput] = useState("");
const [upgradePlans, setUpgradePlans] = useState([]);
const [upgradeListDisplay, setUpgradeListDisplay] = useState();
const [planColor, setPlanColor] = useState();
const navigate = useNavigate();
const location = useLocation();
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

let upgradeList = [
    {tier_name: "Tier 1/3K", tier_id: "#tier1", tier_bg: "bg-webaquabg", tier_img: badgeOneImg},
    {tier_name: "Tier 2/5K", tier_id: "#tier2", tier_bg: "bg-amber-500", tier_img: badgeTwoImg},
    {tier_name: "Tier 3/7.5K", tier_id: "#tier3", tier_bg: "bg-purple-500", tier_img: badgeThreeImg},
    {tier_name: "Tier 4/Unlimited", tier_id: "#tier4", tier_bg: "bg-black", tier_img: badgePremiumImg},
];

useEffect(() => {
    (async () => {
        await getUser();
    })();

}, []);

// get user 
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
        // const { data, newsletter, upgrades } = await response.json();
        const data = await response.json();

        if(data.message === 'Unauthenticated.' || !data || !localStorage.getItem('auth_token')){
            localStorage.removeItem('auth_token');
            navigate('/login', {replace: true});
            return;
        }
        // console.log({
        //     data,
        //     newsletter,
        //     upgrades
        // });
        setUser(data);
        setApiKey(data.data.apiKey);
        setRequestFig(data.data.rfig);

        // upgrade plans class color representation
        switch (data.data.rlimit){
            case "unlimited": {
                setPlanColor({bg: 'bg-black', color: 'text-black'});
            } break;
            case "500": {
                setPlanColor({bg: 'bg-webcolor', color: 'text-webcolor'});
            } break;
            case "3000": {
                setPlanColor({bg: 'bg-webaquabg', color: 'text-webaquabg'});
            } break;
            case "5000": {
                setPlanColor({bg: 'bg-amber-500', color: 'text-amber-500'});
            } break;
            case "7500": {
                setPlanColor({bg: 'bg-purple-500', color: 'text-purple-500'});
            }
        }

        if(data.upgrades !== null){
            let plans = [];
            data.upgrades?.forEach((plan) => {
                plans.push(plan.plan_id);
            });
            let purchasedPlan = upgradeList.filter(item => plans.includes(item.tier_id));
            purchasedPlan.unshift({tier_name: "Free Plan/500", tier_id: "#free", tier_bg: "web-bg", tier_img: badgeFreeImg});
            setUpgradeListDisplay(purchasedPlan);
            setUpgradePlans(plans);
        }
        
        if(data?.newsletter?.status === 'active'){
            setNewsSubStatus(true);
            // console.log('Subscribed');
        }
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
            openAlert('Text Copied!');
        }).catch(err => console.error("Failed to copy: ", err.message));
}
// close alert
const closeAlert = () => {
    setAlertStatus(false);
    setMsg("");
}
// open alert
const openAlert = (txt) => {
    setAlertStatus(true);
    setMsg(txt);
}
// open loader
const openLoader = () => {
    setLoaderStatus(true);
}
// close loader
const closeLoader = () => {
    setLoaderStatus(false);
}
// newsletter subscription
const newsletterSubscription = async (event) => {
    event.preventDefault();
    openLoader();
    let emailData = new FormData(event.currentTarget);

    try{
        let requestParams = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                Accept: "application/json"
            },
            body: emailData,
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/newsletter_subscription`, requestParams);
        const data = await response.json();
        
        if(data.status === 'success') {
            setEmailInput("");
            closeLoader(); 
            openAlert(data.message);
            setNewsSubStatus(true);
        } else if(data.status === "subscribed"){
            closeLoader();
            openAlert(data.message);
        }
    } catch(err){
        console.log(err.message);
    }

    setTimeout(() => closeLoader(), 5000);
}
// newsletter unsubscription
const newsletterUnsubscription = async (event) => {
    event.preventDefault();
    openLoader();

    try{
        let requestParams = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                Accept: "application/json"
            },
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/newsletter_unsubscription`, requestParams);
        const data = await response.json();
        
        // console.log(data);
        if(data.status === 'success'){
            closeLoader();
            openAlert(data.message);
            setNewsSubStatus(false);
        }
    } catch(err){
        console.log(err.message);
    }

    setTimeout(() => closeLoader(), 5000);
}
// close sidebar
const closeSidebar = () => {
    document.querySelector('.sidebar').classList.add('max-md:hidden');
}
// toggle sidebar
const toggleSidebar = () => {
    document.querySelector('.sidebar').classList.toggle('max-md:hidden');
}
// close sidebar on mobile mode
const closeMobileSidebar = () => {
    if(window.screen.width < 768) closeSidebar();
}

return (
user &&
<section className="dashboard h-screen w-full">
<div className="wrapper web-container h-full py-4 flex flex-col gap-3">
    {/* Dashboard Header ........ */}
    <header className="h-[60px] text-white rounded-md py-3 px-2 flex justify-between items-center">
        <Link to="/"><h1 className="text-3xl max-[480px]:text-2xl max-[350px]:text-xl font-bold" >Dashboard</h1></Link>
        <nav>
            <ul className="flex gap-6">
                <Link to="?route=doc"><li onClick={closeMobileSidebar}><b>Doc</b></li></Link>
                <Link to="?route=blog"><li onClick={closeMobileSidebar}><b>Blog</b></li></Link>
                <img src={hamburgerImg} className="w-[25px] min-md:!hidden cursor-pointer" 
                onClick={() => toggleSidebar()}/>
            </ul>
        </nav>
    </header>

    {/* Dashboard Content ........ */}
    <div className="content flex gap-4"
    style={{height: 'calc(100% - 60px)'}}>

        {/* Dashboard Content > Sidebar Navigation ........ */}
        <div className="sidebar w-[250px] h-full bg-white rounded-md p-3 overflow-auto
        flex flex-col gap-4
        max-md:fixed max-md:top-0 max-md:left-0 max-md:z-20 max-md:h-screen max-md:rounded-[0]
        max-md:hidden max-md:animate-(--sidebarAnimate) transition-all transition-200" 
        id="sidebar">
            <div className="close-btn flex justify-end min-md:hidden">
                <i className='bxr  bxs-x' 
                onClick={closeSidebar }></i> 
            </div>
            <div className="user">
                <figure className="center flex-col gap-1">
                    <img src={user?.data.avatar} alt="user image" 
                    className="size-[50px] rounded-full"
                    onError={(e) => e.currentTarget.src = userImg} />
                    <figcaption className="text-center">
                        <h1 className="text-md font-bold">{user?.data.name}</h1>
                        <p className="opacity-50 mt-[2px] text-[11px]">{user?.data.email}</p>
                    </figcaption>
                </figure>
            </div>
            <nav className="text-[15px] grow overflow-auto">
                <ul>
                    {/* <li className="py-1 px-2 rounded-sm hover:bg-gray-200 cursor-pointer">Credentials</li> */}
                    <Link to="?route=upgrade">
                        <li className="py-1 px-2 rounded-sm hover:bg-gray-200 cursor-pointer" 
                        onClick={closeMobileSidebar}>Upgrade</li>
                    </Link>
                    <Link to="?route=newsletter"
                    onClick={closeMobileSidebar}>
                        <li className="py-1 px-2 rounded-sm hover:bg-gray-200 cursor-pointer">Newsletter</li>
                    </Link>
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

        {/* Dashboard Content > Main Content ........ */}
        <section className="grow w-[600px] h-full overflow-y-auto scroll-design rounded-md">
        {/* mobile screen credential */}
        <div className="credentials w-full h-fit bg-white rounded-md p-3 overflow-y-auto
        min-[920px]:!hidden">
            <div className="content flex gap-2 max-[480px]:flex-col">
                <div className="h-full grow">
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

                    {/* Request Tracker */}
                    <div className="requests mt-4">
                        <div className="title pb-3">
                            <p className="text-md opacity-50">Requests Tracker</p>
                        </div>

                        <div>
                            <div className="w-full h-[8px] rounded-[2px] b-amber-600 flex" style={{backgroundColor: "#4caf50"}}>
                                <span className={`h-full rounded-[2px] relative ${planColor.bg}`}
                                style={{width: `calc(${user?.data.rlimit !== 'unlimited' ? (requestFig/user?.data.rlimit * 100) : (100 - 0)}%)`}}>
                                    <i className={`bxr  bxs-water-drop absolute bottom-[100%] right-[-7px] text-[14px] rotate-180 ${planColor.color}`}></i> 
                                </span>
                            </div>
                            <p className="opacity-[0.5] py-1 text-[14px]">{requestFig} out of {user?.data.rlimit}</p>
                        </div>
                    </div>
                </div>

                <div className="h-full w-[200px] max-[480px]:w-full">
                    {/* Purchased Plan Display */}
                    <div className="upgrades-display mt-2">
                        <div className="items flex flex-col gap-2 max-[480px]:flex-row max-[480px]:justify-center
                        max-[480px]:text-center flex-wrap">
                        {
                        upgradeListDisplay?.map((item,key) => (
                            <div className="item" key={key}>
                                <figure className="flex justify-between items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <img src={item.tier_img} 
                                        className="w-[20px]" />
                                        <figcaption>
                                            <p className="text-[13px] opacity-[0.7]">{item.tier_name}</p>
                                        </figcaption>
                                    </div>
                                    <span className={`size-[7px] rounded-full ${item.tier_bg}`}></span>
                                </figure>
                            </div>
                        ))
                        }
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        {/* main content - display unit */}
        <div className="main bg-white overflow-auto h-full rounded-md px-3 pt-3 pb-6 scroll-design 
        max-[920px]:mt-3 max-[920px]:!h-fit">
        {/* doc */}
            {(params.get('route') === 'doc' || params.get('route') == null)
            && <div className="flex flex-col gap-8">
                {/* Endpoint */}
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold">Endpoint</p>
                    <div className="py-3 px-3 rounded-md shadow-md
                    border border-gray-200 flex flex-col">
                        <p>https://dynamiteapi-main-zfujzh.laravel.cloud/api/</p>
                        <i className='bxr  bx-copy cursor-pointer self-end pt-2' 
                        onClick={(event) => copyText(event)}></i> 
                    </div>
                    <p className="opacity-75">The url base to different available resources.</p>
                </div>

                {/* /countries */}
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold">/countries</p>
                    <div className="py-3 px-3 rounded-md shadow-md
                    border border-gray-200 flex flex-col">
                        <p className="break-all">https://dynamiteapi-main-zfujzh.laravel.cloud/api/countries</p>
                        <i className='bxr  bx-copy cursor-pointer self-end pt-2'
                        onClick={(event) => copyText(event)}></i> 
                    </div>
                    <p className="opacity-75">List of all countries and their corresponding code.</p>
                </div>

                {/* /presidents */}
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold">/presidents</p>
                    <div className="py-3 px-3 rounded-md shadow-md
                    border border-gray-200 flex flex-col">
                        <p className="break-all">https://dynamiteapi-main-zfujzh.laravel.cloud/api/presidents</p>
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
                        <p className="break-all">https://dynamiteapi-main-zfujzh.laravel.cloud/api/presidents/us_presidents</p>
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
                            <p className="break-all">https://dynamiteapi-main-zfujzh.laravel.cloud/api/presidents?limit=10</p>
                            <i className='bxr  bx-copy cursor-pointer self-end pt-2'
                            onClick={(event) => copyText(event)}></i> 
                        </div>
                        <div className="py-3 px-3 rounded-md shadow-md bg-zinc-200
                        border border-gray-200 flex flex-col mt-3">
                            <p className="break-all">https://dynamiteapi-main-zfujzh.laravel.cloud/api/presidents/us_presidents?limit=25</p>
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
                            <p className="break-all">https://dynamiteapi-main-zfujzh.laravel.cloud/api/presidents?random=true&limit=10</p>
                            <i className='bxr  bx-copy cursor-pointer self-end pt-2'
                            onClick={(event) => copyText(event)}></i> 
                        </div>
                        <div className="py-3 px-3 rounded-md shadow-md bg-zinc-200
                        border border-gray-200 flex flex-col mt-3">
                            <p className="break-all">https://dynamiteapi-main-zfujzh.laravel.cloud/api/presidents/us_presidents?random=false&limit=25</p>
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
                    <div className="items flex items-center text-center justify-center gap-x-9 gap-y-4 text-[14px] flex-wrap">
                        <div className="item flex flex-col gap-1">
                            <p>Ratings</p>
                            <div className="flex gap-2 items-center justify-center">
                                <i className='bxr  bxs-star text-amber-400'></i> 
                                <i className='bxr  bxs-star text-amber-400'></i> 
                                <i className='bxr  bxs-star text-amber-400'></i> 
                                <i className='bxr  bxs-star text-amber-400'></i> 
                                <i className='bxr  bx-star text-amber-400'></i> 
                            </div>
                            <p>Over 267,000 ratings</p>
                        </div>

                        <div className="item flex flex-col gap-1 items-center">
                            <p className="flex gap-2"><i className='bxr  bxs-message-star text-xl webaqua'></i> <span>Comments</span></p>
                            <p>About <span className="webaqua font-bold">1500</span> comments</p>
                        </div>

                        <div className="item flex flex-col gap-1">
                            <p>Partnership</p>
                            <div className="flex gap-2 items-center justify-center">
                                <i className='bxr  bx-medal-star-alt text-sky-400'></i> 
                                <i className='bxr  bx-medal-star-alt text-sky-400'></i> 
                                <i className='bxr  bx-medal-star-alt text-sky-400'></i> 
                            </div>
                            <p className="font-bold"><span>3+</span> Partnerships</p>
                        </div>

                        <div className="item flex flex-col items-center gap-1">
                            <i className='bxr  bxs-solar-panel text-xl text-teal-800'></i> 
                            <p>More APIs <br /> In Development</p>
                        </div>

                        <div className="item flex flex-col items-center gap-1">
                            <i className='bxr  bxs-pulse text-xl text-teal-800'></i> 
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
                    <article className="comment flex gap-2" key={key}>
                        <i className='bxr  bxs-user'></i> 
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
                {/* newsletter subscription */}
                {!newsSubStatus && <div className="w-[500px]">
                    <figure className="flex flex-col items-center gap-2 text-center">
                        <img src={newsletterImg}
                        className="w-[80px]" />
                        <figcaption>
                            <p className="text-lg">Subscribe to Our Newsletter</p>
                        </figcaption>
                    </figure>

                    <div className="flex flex-col gap-3 mt-2">
                        <p className="text-center">Get the latest updates, feature releases, and API tips delivered straight to your inbox. Subscribe to our newsletter and never miss important announcements or developer insights.</p>
                        <form onSubmit={(event) => newsletterSubscription(event)}>
                            <div className="flex gap-2 max-[430px]:flex-col">
                                <input type="email" name="email" placeholder="Attach Email"
                                className="grow border border-zinc-600 rounded-sm px-2 max-[430px]:h-[40px] outline-none" 
                                onChange={(event) => setEmailInput(event.target.value)} 
                                value={emailInput} required/>
                                <button type="submit" className="btn btn-blue">Subscribe</button>
                            </div>
                        </form>
                    </div>

                    <div className="newsletter-watermark absolute bottom-0 left-[50%]
                    translate-x-[-50%] -z-10">
                        <img src={emailWatermarkImg}
                        className="w-[200px] opacity-[0.2]" />
                    </div>
                </div>}

                {/* newsletter unsubscription */}
                {newsSubStatus && <div className="w-[400px] flex flex-col gap-3 text-center items-center">
                    <h1><b>Thanks for Subscribing to our Newsletter</b></h1>
                    <p>Stay tuned for updates; Build More, Attract More!</p>
                    <form onSubmit={(event) => newsletterUnsubscription(event)}>
                        <button className="btn btn-black">Unsubscribe</button>
                    </form>

                    <div className="newsletter-watermark absolute top-[30%] left-[50%]
                    translate-y-[-50%] translate-x-[-50%] -z-10">
                        <img src={envelopeImg}
                        className="w-[200px] opacity-[0.2]" />
                    </div>
                </div>}
            </div>}

        {/* upgrade */}
            {params.get('route') === 'upgrade' && <div className="upgrade">
                <h1 className="text-2xl font-bold pb-8">Upgrade</h1>
                <div className="items flex gap-x-3 gap-y-7 flex-wrap">
                        {/* Free plan */}
                    <div className="item grow w-[250px] border border-gray-400 rounded-sm
                    h-[300px] p-3 flex flex-col justify-between items-center gap-4">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold webcolor">Free Plan</h1>
                            <p className="text-xl font-bold pt-1">&#8358;0.00</p>
                        </div>
                        <div className="mt-2 w-full">
                            <p>Gain Access To:</p>
                            <ul className="flex flex-col gap-1 text-[15px]">
                                <li className="flex gap-2 items-center">
                                    <i className='bxr  bxs-checks'></i> 
                                    <span>30 Calls Per minute</span>
                                </li>
                                <li className="flex gap-2 items-center">
                                    <i className='bxr  bxs-checks'></i> 
                                    <span>500 Limited Trials</span>
                                </li>
                            </ul>
                            
                        </div>
                        <button className="btn btn-blue w-full" 
                        onClick={() => openAlert("This is the default plan, upgrade to gain access to more features.")}>In use</button>
                        <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                    </div>
                        {/* Upgrade 1 */}
                    <div className="item grow w-[250px] border border-gray-400 rounded-sm
                    h-[300px] p-3 flex flex-col justify-between items-center gap-4 relative">
                        {upgradePlans?.includes('#tier1') && <div className="badge absolute top-[-15px] right-0">
                            <img src={badgeOneImg} 
                            className="w-[50px]" />
                        </div>}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold webaqua">Tier 1</h1>
                            <p className="text-xl font-bold pt-1">&#8358;1200/Month</p>
                        </div>
                        <div className="mt-2 w-full">
                            <p>Gain Access To:</p>
                            <ul className="flex flex-col gap-1 text-[15px]">
                                <li className="flex gap-2 items-center">
                                    <i className='bxr  bxs-checks'></i> 
                                    <span>100 Calls Per minute</span>
                                </li>
                                <li className="flex gap-2 items-center">
                                    <i className='bxr  bxs-checks'></i> 
                                    <span>3000 Requests Per Month</span>
                                </li>
                            </ul>
                            
                        </div>
                        {/* <button className="btn webaquabg text-white w-full">Upgrade</button> */}
                        <PayButton tier={1} bg="bg-webaquabg hover:!bg-black hover:disabled:!bg-webaquabg" upgradestatus={upgradePlans?.includes('#tier1') ? true : false}
                        openLoader={() => openLoader()} closeLoader={() => closeLoader()}
                        openAlert={openAlert}  getUser={async () => await getUser()} />
                        <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                    </div>
                        {/* Upgrade 2 */}
                    <div className="item grow w-[250px] border border-gray-400 rounded-sm
                    h-[300px] p-3 flex flex-col justify-between items-center gap-4 relative">
                        {upgradePlans?.includes('#tier2') && <div className="badge absolute top-[-15px] right-0">
                            <img src={badgeTwoImg} 
                            className="w-[50px]" />
                        </div>}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-amber-500">Tier 2</h1>
                            <p className="text-xl font-bold pt-1">&#8358;5400/Month</p>
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
                                    <span>5000 Requests Per Month</span>
                                </li>
                            </ul>
                            
                        </div>
                        <PayButton tier={2} bg="bg-amber-500 hover:!bg-black hover:disabled:!bg-amber-500" upgradestatus={upgradePlans?.includes('#tier2') ? true : false}
                        openLoader={() => openLoader()} closeLoader={() => closeLoader()}
                        openAlert={openAlert} getUser={async () => await getUser()} />
                        <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                    </div>
                        {/* Upgrade 3 */}
                    <div className="item grow w-[250px] border border-gray-400 rounded-sm
                    h-[300px] p-3 flex flex-col justify-between items-center gap-4 relative">
                        {upgradePlans?.includes('#tier3') && <div className="badge absolute top-[-15px] right-0">
                            <img src={badgeThreeImg} 
                            className="w-[50px]" />
                        </div>}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-purple-500">Tier 3</h1>
                            <p className="text-xl font-bold pt-1">&#8358;11,500/Month</p>
                        </div>
                        <div className="mt-2 w-full">
                            <p>Gain Access To:</p>
                            <ul className="flex flex-col gap-1 text-[15px]">
                                <li className="flex gap-2 items-center">
                                    <i className='bxr  bxs-checks'></i> 
                                    <span>1K Calls Per minute</span>
                                </li>
                                <li className="flex gap-2 items-center">
                                    <i className='bxr  bxs-checks'></i> 
                                    <span>7500 Requests Per Month</span>
                                </li>
                            </ul>
                            
                        </div>
                        <PayButton tier={3} bg="bg-purple-500 hover:!bg-black hover:disabled:!bg-purple-500" upgradestatus={upgradePlans?.includes('#tier3') ? true : false}
                        openLoader={() => openLoader()} closeLoader={() => closeLoader()}
                        openAlert={openAlert} getUser={async () => await getUser()} />
                        <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                    </div>
                        {/* Upgrade 4 */}
                    <div className="item grow w-[250px] border border-gray-400 rounded-sm
                    h-[300px] p-3 flex flex-col justify-between items-center gap-4 relative">
                        {upgradePlans?.includes('#tier4') && <div className="badge absolute top-[-15px] right-0">
                            <img src={badgePremiumImg} 
                            className="w-[50px]" />
                        </div>}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold ">Tier 4</h1>
                            <p className="text-xl font-bold pt-1">&#8358;15,000/Month</p>
                        </div>
                        <div className="mt-2 w-full">
                            <p>Gain Access To:</p>
                            <ul className="flex flex-col gap-1 text-[15px]">
                                <li className="flex gap-2 items-center">
                                    <i className='bxr  bxs-checks'></i> 
                                    <span>11K Calls Per minute</span>
                                </li>
                                <li className="flex gap-2 items-center">
                                    <i className='bxr  bxs-checks'></i> 
                                    <span>Unlimited Requests</span>
                                </li>
                            </ul>
                            
                        </div>
                        {/* <button className="btn bg-black text-white w-full">Upgrade</button> */}
                        <PayButton tier={4} bg="bg-black" upgradestatus={upgradePlans?.includes('#tier4') ? true : false}
                        openLoader={() => openLoader()} closeLoader={() => closeLoader()}
                        openAlert={openAlert} getUser={async () => await getUser()} />
                        <p className="text-[14px]">Powered by DynamiteApi Inc.</p>
                    </div>
                </div>
            </div>}
        </div>
        </section>

        {/* Dashboard Content > Sidebar Credentials */}
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
                        <i className='bxr  bx-copy cursor-pointer self-end' 
                        onClick={(event) => copyText(event)}></i>    
                    </div>

                    <div className="btn-wrapper mt-3">
                        <button className="btn bg-amber-500 text-white w-full" onClick={generateKey}>Re-generate</button>
                    </div>
                </div>

            {/* Request Tracker */}
                <div className="requests mt-4">
                    <div className="title pb-3">
                        <p className="text-md opacity-50">Requests Tracker</p>
                    </div>

                    <div>
                        <div className="w-full h-[8px] rounded-[2px] b-amber-600 flex" style={{backgroundColor: "#4caf50"}}>
                            <span className={`h-full rounded-[2px] relative ${planColor.bg}`}
                            style={{width: `calc(${user?.data.rlimit !== 'unlimited' ? (requestFig/user?.data.rlimit * 100) : (100 - 0)}%)`}}>
                                <i className={`bxr  bxs-water-drop absolute bottom-[100%] right-[-7px] text-[14px] rotate-180 ${planColor.color}`}></i> 
                            </span>
                        </div>
                        <p className="opacity-[0.5] py-1 text-[14px]">{requestFig} out of {user?.data.rlimit}</p>
                    </div>
                </div>

            {/* Purchased Plan Display */}
                <div className="upgrades-display mt-2">
                    <div className="items flex flex-col gap-2">
                    {
                    upgradeListDisplay?.map((item,key) => (
                        <div className="item" key={key}>
                            <figure className="flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <img src={item.tier_img} 
                                    className="w-[20px]" />
                                    <figcaption>
                                        <p className="text-[13px] opacity-[0.7]">{item.tier_name}</p>
                                    </figcaption>
                                </div>
                                <span className={`size-[7px] rounded-full ${item.tier_bg}`}></span>
                            </figure>
                        </div>
                    ))
                    }
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>

{/* Alert Box */}
{alertStatus && <div className="alert h-screen w-full center fixed top-0 left-0 z-30" style={{backgroundColor: "rgba(0,0,0,0.3)"}}
onClick={() => closeAlert()}>
<div className="p-3 bg-white rounded-md w-[350px] max-[480px]:w-[90%] min-h-[150px] max-h-[400px] overflow-auto scroll-design
center fadeIn" onClick={(event) => event.stopPropagation()}>
    {/* <div className="btn-close pb-2"><i class='bxr  bxs-x'  ></i> </div> */}
    <div className="flex flex-col gap-4">
        <p className="text-center px-2">{msg}</p>
        <button className="btn !rounded-full w-full" style={{backgroundColor: "#f3f3f3"}}
        onClick={() => closeAlert()}>Ok</button>
    </div>
</div>
</div>}

{/* Loader box */}
{loaderStatus && <div className="alert h-screen w-full center fixed top-0 left-0 z-30" style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
<i className="fa-solid fa-spinner fa-pulse text-white text-2xl"></i>
</div>}
</section>
);
}
 
export default Dashboard;