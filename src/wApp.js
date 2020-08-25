import React, {useState} from "react";
import './styles/main.css';

class WApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: 'coconut'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	const [inputList, setInputList] = useState([
			{optionTitle: "", lastName: ""}
	]);

	const handleChange = (event, index) => {
		const { name, value } = event.target;

		const list = [...inputList];
		list[index][name] = value;

		setInputList (list);
	}

	const handleChangeOption = (event, index) => {
		const { name, value } = event.target;

		const list = [...inputList];
		list[index][name] = value;

		setInputList (list);
	}

	const handleAddInput = () => {
		const list = [...inputList];
		list.push({optionTitle: "", lastName: ""});
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
			<form className="main-form">
			{inputList.map((item, i) => {
				return (

					<div key={i} className="main-form__item">
						<select className="main-form__select">
							<option
								value="Phone"
								name="optionTitle"
								onClick={event => handleChangeOption (event, i)}
							>Phone</option>
							<option
								value="Email"
								name="optionTitle"
								onClick={event => handleChangeOption (event, i)}
							>Email</option>
							<option
								value="Link"
								name="optionTitle"
								onClick={event => handleChangeOption (event, i)}
							>Link</option>
						</select>

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
			</form>

			<pre>
				{JSON.stringify(inputList, null, 2)}
			</pre>
		</div>
	)
}

export default WApp;