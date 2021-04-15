import { parseCookies } from 'nookies'

const PayedArticles = ({posts}) => {
    console.log(posts);
    return (<div><h1>Payed articles</h1>
        {posts.map(post => (<div key={post.id}><p>{post.title}</p><p>{post.content}</p></div>))}
    </div>)

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