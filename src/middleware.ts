import { auth } from "@/auth"
//  Routes
import { NextResponse } from "next/server";
import { 
  auth_routes, 
  api_route, 
  public_routes,
  admin_route
} from "./lib/helper";

export default auth((req) => {
  const { nextUrl } = req;
  const userLogin = !!req.auth;
  const user = req.auth?.user

  // if middleware is in api auth route
  const isApiAuth = nextUrl.pathname.startsWith(api_route);
  // if middleware is in public routes
  const isPublic = public_routes.includes(nextUrl.pathname);
  // if middleware is in signin and signup(when user is signin but trying to access the login)
  const isAuth = auth_routes.includes(nextUrl.pathname);
  // if is in admin page and not admin
  const isAdmin = nextUrl.pathname.startsWith(admin_route)

  // accessible to everyone
  if(isApiAuth){
    return;
  }
  // if user is in auth route but is signin
  if(isAuth){
    if(userLogin){
      return NextResponse.redirect(new URL("/", nextUrl))
    }
    return;
  }
  // If user is in protected routes but he/she not login
  if(!userLogin && !isPublic){
    return NextResponse.redirect(new URL("/signin", nextUrl));
  }

  // if user is not admin
  if(user?.role !== "ADMIN" && isAdmin){
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  // if user is admin and went to user page
  if(user?.role === "ADMIN" && !isAdmin){
    return NextResponse.redirect(new URL("/admin?query=", nextUrl));
  }

  return;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}