import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function middleware(req: Request) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;

  if (!lang) {
    const acceptLang = req.headers.get("accept-language") || "";
    console.log(acceptLang);
    const userLang = acceptLang.split(",")[0].split("-")[0];
    const locale = ["en", "es", "fr", "de", "ar"].includes(userLang)
      ? userLang
      : "en";

    const res = NextResponse.next();
    res.cookies.set("lang", locale, { path: "/" });
    return res;
  }
  return NextResponse.next();
}
