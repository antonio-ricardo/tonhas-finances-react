import Cookies, { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

interface RemoveCookiesInput {
  cookieNames: string[];
}

interface SetCookiesInput extends RemoveCookiesInput{
  value: Record<string, any>;
  delayTime?: number;
  options?: CookieSetOptions;
}

export const setCookies = async ({
  cookieNames,
  value,
  options,
  delayTime,
}: SetCookiesInput) => {
  for (const name of cookieNames) {
    cookies.set(name, value[name], options);
  }

  await delay(delayTime ? delayTime : 1.5);
};

export const getCookies = (cookieName: string) => {
  return cookies.get(cookieName);
};

export const removeCookies = async ({
  cookieNames,
}: RemoveCookiesInput) => {
  for (const name of cookieNames) {
    cookies.remove(name);
  }
};


function delay(n: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}
