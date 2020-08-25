import React, {useState} from "react";
import './styles/main.css';

const App = () => {

	const [inputList, setInputList] = useState([
			{firstName: "test", lastName: "last name"}
	]);

	const handleChange = (event, index) => {
		const { name, value } = event.target;

		const list = [...inputList];
		list[index][name] = value;

		setInputList (list);
	}

	const handleAddInput = () => {
		const list = [...inputList];
		list.push({firstName: "", lastName: ""});
		setInputList(list);
	}

	const handleRemoveInput = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);

	}

	return (
		<div className="App">
			Hello
			{inputList.map((item, i) => {
				return (
					<div key={i} className="box">
						<input
							type="text"
							name="firstName"
							placeholder="First Name"
							value={item.firstName}
							onChange={event => handleChange (event, i)}
						/>
						<input
							type="text"
							name="lastName"
							placeholder="Last Name"
							value={item.lastName}
							onChange={event => handleChange (event, i)}
						/>
						<input
							type="button"
							value="+"
							onClick={handleAddInput}
						/>
						<input
							type="button"
							value="-"
							onClick={() => handleRemoveInput(i)}
						/>
					</div>
				)
			})};


			<pre>
				{JSON.stringify(inputList, null, 2)}
			</pre>
		</div>
	)
}

export default App;