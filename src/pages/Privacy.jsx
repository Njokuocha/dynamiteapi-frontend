// import { Header } from "./Home";
import femaleWorker from '../images/female_worker.png';
const Privacy = () => {
return ( 
    <section className='privacy web-container w-full text-white pb-2' style={{height: "calc(100vh - 80px)"}}>
        {/* <Header /> */}
        {/* <section className=" bd"> */}
            <div className="content bg-white rounded-lg text-black 
            flex justify-between gap-3 py-4 px-4 relative z-10 h-full">
                <div className="grow h-full overflow-auto flex flex-col gap-4 w-[300px] noscroll-design
                max-lg:w-full">
                    <h1 className="text-3xl font-bold">Privacy Policy - DynamiteApi</h1>
                    <p>At DynamiteApi, we value your privacy and are committed to safeguarding the personal information you share with us. This Privacy Policy explains how we collect, use, and protect data in connection with our API services and payment processes.</p>
                    <p>When you create an account or subscribe to one of our API plans, we collect basic details such as your name, email address, and login credentials. If you upgrade your plan, payment information such as billing details is required. All payments are processed securely through trusted third-party providers; we do not store or handle your sensitive card details directly.</p>
                    <p>In the course of providing our services, we also collect technical information such as API request logs, IP addresses, and device or browser data. This information is used strictly for service delivery, performance monitoring, fraud prevention, and ensuring compliance with our Terms of Service. Cookies and similar technologies may also be used to maintain your sessions and improve your experience on our platform.</p>
                    <p>Your personal information is never sold or rented to third parties. However, it may be shared with payment processors, hosting providers, analytics tools, and other trusted service partners who assist in delivering our services. In some cases, we may disclose information if required by law or to protect the rights and security of DynamiteApi and its users.</p>
                    <p>We implement appropriate security measures, including encryption and access controls, to protect your personal and payment-related data. While no online system can guarantee absolute security, we continuously work to safeguard your information against unauthorized access or misuse.</p>
                    <p>You have the right to access, correct, or delete your account information at any time. You may also opt out of promotional communications, although essential service notifications will continue to be sent. Please note that our services are intended for professional and business use, and we do not knowingly collect data from individuals under 16 years of age.</p>
                    <p>We may update this Privacy Policy periodically to reflect changes in our practices or regulatory requirements. Any updates will be posted on this page with the date of revision clearly indicated.</p>
                    <p>If you have any questions or concerns regarding your privacy or how we handle your information, please contact us at <b className="webcolor">privacy@dynamiteapi.com</b></p>
                </div>

                <div className="img-content h-full w-fit center max-lg:absolute max-lg:top-[50%]
                max-lg:left-[50%] max-lg:translate-y-[-50%] max-lg:translate-x-[-50%] max-lg:opacity-[0.17]
                max-lg:w-full max-lg:-z-10">
                    <img src={femaleWorker}
                    className="w-[500px] max-[500px]:w-[80%]" />
                </div>
            </div>
        {/* </section> */}
    </section>
);
}
 
export default Privacy;