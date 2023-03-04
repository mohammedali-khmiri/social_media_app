import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  //TEMPORARY
  const posts = [
    {
      id: 1,
      name: "Emna Kh",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "posts/coffee.jpg",
    },
    {
      id: 2,
      name: "ALA KH",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/7180878/pexels-photo-7180878.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis temporibus commodi ratione corporis ipsum adipisci aliquid vitae architecto fugiat delectus!",
      img: "posts/man_woman.jpeg",
    },
    {
      id: 3,
      name: "Hazem Kh",
      userId: 3,
      profilePic:
        "https://images.pexels.com/photos/12242014/pexels-photo-12242014.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      desc: "💙",
      img: "posts/camp.jpg",
    },
  ];

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
