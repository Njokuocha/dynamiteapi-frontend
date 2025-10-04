// import { Header } from "./Home";
const Contact = () => {
return ( 
    <section className='privacy web-container w-full text-white pb-2' style={{height: "calc(100vh - 80px)"}}>
        {/* <Header /> */}
        {/* <section className="web-container"> */}
            <div className="content bg-white rounded-lg text-black 
            flex justify-between gap-3 py-4 px-4 relative overflow-auto noscroll-design
            max-[680px]:flex-col h-full"
            >
                <div className="grow min-h-full gap-4 w-[150px]
                 center max-[680px]:w-full max-[680px]:min-h-fit">
                    <div className="items flex flex-col gap-4 w-[95%] max-[950px]:w-full
                    max-[680px]:flex-row max-[680px]:flex-wrap">
                        <div className="item bg-zinc-200 shadow-md rounded-md py-3 px-3 grow max-[680px]:w-[48%]">
                            <ul className="center gap-5 max-[950px]:flex-col max-[950px]:text-center">
                                <li className="size-[40px] bg-white rounded center">
                                    <i class='bxr  bxs-phone text-xl'></i> 
                                </li>
                                <li className="flex flex-col gap-1 w-[240px] max-[950px]:w-full">
                                    <p><b>Phone Number</b></p>
                                    <p className="opacity-[0.5] break-all">+234 703 5890 768</p>
                                </li>
                            </ul>
                        </div>
                        <div className="item bg-zinc-200 shadow-md rounded-md py-3 px-3 grow max-[680px]:w-[48%]">
                            <ul className="center gap-5 max-[950px]:flex-col max-[950px]:text-center">
                                <li className="size-[40px] bg-white rounded center">
                                    <i className='bxr  bxs-envelope text-xl'></i> 
                                </li>
                                <li className="flex flex-col gap-1 w-[240px] max-[950px]:w-full">
                                    <p><b>Email</b></p>
                                    <p className="opacity-[0.5] break-all">francisnjokuocha@gmail.com</p>
                                </li>
                            </ul>
                        </div>

                        <div className="item bg-zinc-200 shadow-md rounded-md py-3 px-3 grow max-[680px]:w-[48%]">
                            <ul className="center gap-5 max-[950px]:flex-col max-[950px]:text-center">
                                <li className="size-[40px] bg-white rounded center">
                                    <i className='bxr  bxs-location text-xl'  ></i> 
                                </li>
                                <li className="flex flex-col gap-1 w-[240px] max-[950px]:w-full">
                                    <p><b>Location</b></p>
                                    <p className="opacity-[0.5] break-all">#293 Jenny Road, Aba, Abia State.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="form-content mb-3 min-h-full max-[680px]:min-h-fit w-[300px] grow center max-[680px]:w-full">
                    <div className="w-[95%] max-[950px]:w-full">
                        <div>
                            <h1 className="text-2xl font-bold py-1">Send Message</h1>
                            <p>Have a question, need support, or want to learn more about our API services? We’d love to hear from you. Simply fill out the form below and our team will get back to you as soon as possible. </p>
                        </div>
                        <form className="flex gap-3 flex-wrap mt-7" onSubmit={(event) => event.preventDefault()}>
                            <input type="text" name="name" placeholder="Your Name" 
                            className="input grow" required />
                            <input type="email" name="email" placeholder="Email Address" 
                            className="input grow" required />
                            <input type="tel" name="phone_number" placeholder="Phone Number" 
                            className="input grow" />
                            <input type="text" name="subject" placeholder="Subject" 
                            className="input grow" />
                            <textarea name="message" placeholder="Your Message" 
                            className="input grow !h-[90px]" required></textarea> 
                            <button className="btn btn-blue w-full" type="button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        {/* </section> */}
    </section>
);
}
 
export default Contact;