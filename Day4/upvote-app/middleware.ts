import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  let serverUrl = "http://localhost:3000";
  if (request.url.includes("localhost")) {
    serverUrl = "http://localhost:3000";
  } else {
    serverUrl = "https://upvote-app-abikmushyakho.vercel.app";
  }
  const cookie = request.cookies.get("loggedInUser");

  const url = request.nextUrl.clone();

  if (typeof cookie === "string") {
    const gotCookie = JSON.parse(cookie);

    if (url.pathname === `${serverUrl}/login` && gotCookie?.loggedIn) {
      console.log("redirecting dashboard");
      return NextResponse.redirect(`${serverUrl}/dashboard/upvotes`);
    }
  } else {
    if (url.pathname.includes(`/dashboard`) && cookie === undefined) {
      console.log(cookie);
      console.log("redirecting login");
      return NextResponse.redirect(`${serverUrl}/login`);
    }
  }
}
