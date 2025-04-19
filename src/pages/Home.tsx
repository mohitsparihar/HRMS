import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex gap-2 justify-center items-center">
      <NavLink to="/login">
        <Button variant="secondary" className="cursor-pointer">Login</Button>
      </NavLink>
      <NavLink to="/register">
        <Button className="cursor-pointer">Register</Button>
      </NavLink>
    </div>
  );
};

export default Home;
