import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const cookie = Cookies.get("loggedInUser");
  let parsedCookie = null;
  if (typeof cookie === "string") {
    parsedCookie = JSON.parse(cookie);
  }

  const handleLogout = () => {
    Cookies.remove("loggedInUser");
    router.push("/login");
  };

  return (
    <>
      {parsedCookie !== null && (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap:"10px"
          }}
        >
          <h6>You are logged in as {parsedCookie.user.username}</h6>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Header;
