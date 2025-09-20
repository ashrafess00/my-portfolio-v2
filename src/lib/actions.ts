"use server";
import { cookies } from "next/headers";

export const setCookie = async (name: string, value: string) => {
  (await cookies()).set(name, value || "en");
};

export const getCookie = async (name: string) => {
  return (await cookies()).get(name)?.value || "en";
};
