import { useEffect, useState } from "react";
import { data } from "./data";
import "./App.css";

function App() {
	const [dataPost, setDataPost] = useState([]);
	const [dataFilter, setDataFilter] = useState(dataPost);

	useEffect(() => {
		const getPost = async () => {
			const response = await fetch("https://jsonplaceholder.typicode.com/posts")
				.then((resp) => resp.json())
				.then((resp) => {
					setDataPost(resp);
					setDataFilter(resp);
				});
		};
		getPost();
	}, []);

	const filtered = (e) => {
		setDataFilter(
			dataPost.filter((val) => val.title.toLowerCase().includes(e.target.value))
		);
	};

	const totalPrice = data.reduce((total, menu) => {
		return total + menu.price;
	}, 0);

	return (
		<div className="container">
			<div className="section-one">
				<input type="text" placeholder="filter.." onChange={filtered} />

				{dataFilter.map((item, index) => (
					<div className="post" key={index}>
						<p className="post-title">{item.title}</p>
						<p className="post-desc">{item.body}</p>
					</div>
				))}
			</div>
			<div className="section-two">
				<p>Total Harga: Rp {totalPrice}</p>
				{data.map((item, index) => (
					<div className="post" key={index}>
						<p className="post-title">{item.product}</p>
						<p className="post-desc">{item.price}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
