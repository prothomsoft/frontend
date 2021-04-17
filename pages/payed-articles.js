import { parseCookies } from 'nookies'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAuth } from "./hooks/auth-hook";
import Link from 'next/link'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const PayedArticles = ({posts}) => {
    const {logout, authState} = useAuth();
    const classes = useStyles();
    return (
    <div>
       <Link href="/">
        <a>Home</a>
      </Link>
      <button type="button" onClick = {e => logout('/login')}>Logout</button>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{authState.token} {authState.username}</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.title}>
                <TableCell component="th" scope="row">
                  {post.title}
                </TableCell>
                <TableCell align="right">{post.id}</TableCell>
                <TableCell align="right">{post.title}</TableCell>
                <TableCell align="right">{post.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    )

}

export default PayedArticles;

export const server = 'http://localhost:5000';

export async function getServerSideProps(ctx) {

    let jwt = parseCookies(ctx).jwt;

    const res = await fetch(`${server}/posts`,
    {
        method: "GET",
        headers: {
          Accept: "application/json; charset=UTF-8",
          Authorization: jwt
        },
    })

    const posts = await res.json();
    
    if (!posts) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {
          posts: posts
      }
    }
  }  