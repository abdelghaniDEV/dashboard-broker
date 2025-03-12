import { NextResponse } from "next/server";

export function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // Middleware 1: إعادة توجيه من `/` إلى `/dashboard`
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Middleware 2: حماية المسارات التي تبدأ بـ `/d/:path*`
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token-001")?.value;

    // إذا لم يكن هناك Token، يتم إعادة التوجيه إلى الصفحة الرئيسية (`/`)
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // إذا لم يتم تطبيق أي Middleware، يتم الاستمرار في الطلب
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/s/:path*"], // تطبيق Middleware على `/` و `/d/:path*`
};
