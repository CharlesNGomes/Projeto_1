import logo from './logo.svg';
import { Component } from 'react'
import './App.css';
import { render } from 'react-dom';
import { PostCart } from './components/PostCard';

class App extends Component {
  state = {
    posts: [],
    image: []

  }
  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    const [posts, image] = await Promise.all([postsResponse, photosResponse])

    const postJson = await posts.json()
    const imageJson = await image.json()

    const postAndImage = postJson.map((post, index) => {
      return { ...post, cover: imageJson[index].url }
    })

    this.setState({ posts: postAndImage })
  }

  render() {
    const { posts, } = this.state;
    return (

      <section className="container">
        <div className="posts">
          {posts.map(posts => (
            <PostCart
              key={posts.id}
              title={posts.title}
              cover={posts.cover}
              body={posts.body}
            />
          ))}
        </div>
      </section>

    );
  }
}



export default App;
