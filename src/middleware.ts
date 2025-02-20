import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = "user" | "admin"; 

const authRoutes = ["/login", "/create-shop"];
const roleBasedPrivateRoutes: Record<Role, RegExp[]> = {
    
    user: [/^\/user/, /^\/user\/create-shop/],
    admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const userInfo = await getCurrentUser();

    // If the user is not logged in
    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next(); // Allow access to auth routes
        } else {
            return NextResponse.redirect(
                new URL(`http://localhost:3000/login?redirectPath=${pathname}`, request.url)
            );
        }
    }

    // If the user is logged in and has a role
    if (userInfo?.role && roleBasedPrivateRoutes[userInfo.role as Role]) {
        const routes = roleBasedPrivateRoutes[userInfo.role as Role]; // Ensuring type safety
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next(); // Allow access to role-based routes
        } else {
            return NextResponse.redirect(new URL("/", request.url)); // Redirect if access is not allowed
        }
    }

    // Default case
    return NextResponse.next();
};

export const config = {
    matcher: ["/login", "/create-shop", "/user","/user:page", "/admin","admin/:page"], // Add additional routes here if needed
};
