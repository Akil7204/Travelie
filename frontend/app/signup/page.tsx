import Navbar from "@/components/NavBar";
import Register from "@/components/signup/register";


export default function Signup(){

    return (
        <div className="flex flex-col overflow-x-hidden">
          <Navbar />
          <Register />
        </div>
        
      );
}