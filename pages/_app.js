import { useEffect, Fragment } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { parseCookies } from 'nookies';
import { AuthProvider } from '../hooks/auth-provider'
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/utils/theme';
import Layout from '../components/layout'

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
            <AuthProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
           </AuthProvider>
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
    if(ctx.pathname === "/posts") {
      redirectUser(ctx, "/login");
    }
  }
  return { pageProps }
}

export default MyApp;