import { parseCookies } from "nookies";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getPosts } from "../api/api";

const Posts = ({ posts }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Title</TableCell>
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
  );
};

export default Posts;

export async function getServerSideProps(ctx) {
  let jwt = parseCookies(ctx).jwt;
  const auth = {
    headers: { Authorization: jwt },
  };

  const response = await getPosts(auth);

  if (!response.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: response.data,
    },
  };
}
