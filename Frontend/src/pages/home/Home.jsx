import Posts from "../../posts/Posts";
import Stories from "../../stories/Stories";
import "./home.scss";

const Home = () => {
	return (
		<div className="home">
			<Stories />
			<Posts />
		</div>
	);
};

export default Home;
