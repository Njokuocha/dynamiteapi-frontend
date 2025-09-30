import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import googleIcon from '../images/google.png';

const Signup = () => {
return ( 
    <section className="signup h-screen w-full flex">
        <section className="intro h-full grow web-gradient text-white center
        max-[850px]:!hidden">
            <div className="text-center">
                <h1 className="text-3xl font-bold">DynamiteApi</h1>
                <p className="py-2">Giving you the historical resources for your apps...</p>
            </div>
        </section>

        <section className="auth h-full mx-auto w-[500px] max-lg:w-[450px] bg-white px-4 py-4 overflow-auto center">
            <div className="w-[400px] mx-auto flex flex-col gap-8">
                <h1 className='text-3xl font-bold webcolor'>Create an account</h1>
                <GoogleLoginButton />
                <div className='flex gap-2 items-center'>
                    <input type="checkbox" id='newsletter'
                    className='size-[40px] cusor-pointer' />
                    <label htmlFor="newsletter" className='cursor-pointer'>I do not wish to receive news and promotions from DynamiteApi by email.</label>
                </div>
                <p className='text-center'>By continuing, you agree to DynamiteApi Terms of Use and Privacy Policy.</p>
                <p className='text-center'>Already have an account? <Link to="/login" className='webcolor'><b>Log in</b></Link></p>
            </div>
        </section>
    </section>
);
}
const Login = () => {
return ( 
    <section className="signup h-screen w-full flex">
        <section className="intro h-full grow web-gradient text-white center
        max-[850px]:!hidden">
            <div className="text-center">
                <h1 className="text-3xl font-bold">DynamiteApi</h1>
                <p className="py-2">Giving you the historical resources for your apps...</p>
            </div>
        </section>

        <section className="auth h-full mx-auto w-[500px] max-lg:w-[450px] bg-white px-4 py-4 overflow-auto center">
            <div className="w-[400px] mx-auto flex flex-col gap-8">
                <h1 className='text-3xl font-bold webcolor text-center'>Log in</h1>
                <GoogleLoginButton />
                <p className='text-center'>Don't have an account? <Link to="/signup" className='webcolor'><b>Sign up</b></Link></p>
            </div>
        </section>
    </section>
);
}

export { Signup, Login };

// Google Login Button
const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    // Call Laravel API endpoint to start OAuth flow
    window.location.href = process.env.REACT_APP_GOOGLE_REDIRECT;
  };

  return (
    <button 
      onClick={handleGoogleLogin} 
      className="text-black px-4 py-2 rounded cursor-pointer
      w-full border border-gray-300
      flex justify-between items-center"
    >
        <span className=''>Continue with Google</span>
        <img src={googleIcon} width="20px" />
    </button>
  );
};

// Auth callback handler
const AuthCallBack = () => {
const [searchParams] = useSearchParams();
const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("auth_token", token);
      navigate("/dashboard"); // redirect to dashboard
    }
  }, [searchParams]);

return (
    <section className="auth-callback h-screen w-full center">
        <p className="webcolor font-bold text-lg">Signing you in...</p>
    </section>
);
}
 
export default AuthCallBack;