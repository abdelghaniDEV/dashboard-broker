import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Middleware 1: إعادة توجيه من `/` إلى `/dashboard`
  if (pathname === "/" ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }


  // Middleware 2: حماية المسارات التي تبدأ بـ `/admin/:path*`
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
  matcher: ["/", "/:path" , "/admin/:path*"], // تطبيق Middleware على `/` و `/admin/:path*`
};