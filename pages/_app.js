import '../styles/globals.css'
import { parseCookies } from 'nookies'

import Router from 'next/router'

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

const redirectUser = (ctx, location) => {
  if(ctx.req) {
    ctx.res.writeHead(302, {Location: location});
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  let jwt = parseCookies(ctx).jwt;
  let pageProps = {};
     
  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  if(!jwt) {
    if(ctx.pathname === "/payed-articles") {
      redirectUser(ctx, "/login");
    }
  }

  return { pageProps }
}

export default MyApp