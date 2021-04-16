import {useEffect, Fragment} from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './utils/theme';
import { parseCookies } from 'nookies';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
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

export default MyApp;