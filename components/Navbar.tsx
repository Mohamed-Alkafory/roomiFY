import { useOutletContext } from "react-router";
import { Box } from "lucide-react";
import Button from "./ui/Button";

const Navbar = () => {
  const { isSignedIn, userName, signIn, signOut } =
    useOutletContext<AuthContext>();
  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.log(`puter sign out failed : ${e}`);
      }
      return;
    }
    try {
      await signIn();
    } catch (e) {
      console.log(`puter sign in failed : ${e}`);
    }
  };
  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <Box className="logo" />
            <span className="name">RoomiFY</span>
          </div>
          <ul className="links">
            <a href="#">product</a>
            <a href="#">pricing</a>
            <a href="#">community</a>
            <a href="#">Enterprise</a>
          </ul>
        </div>
        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="greeting">
                {userName ? `Hi ${userName}` : "Sign in"}
              </span>
              <Button size="sm" onClick={handleAuthClick} className="btn">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleAuthClick}
                className="login"
                size="sm"
                variant="ghost"
              >
                Log In
              </Button>
              <a href="#upload" className="cta">
                Get started
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
