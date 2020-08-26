import React from "react";
import "./styles/main.css";

const inputTypeArray = [
	{value: "Phone", type: "tel"},
	{value: "Mail", type: "email"},
	{value: "Link", type: "url"},
]

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{id: 0, type: "Phone", value: "", inputType: "tel"},
			]
		};

		//this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event, i) {
		const itemValue = event.target.value;
		const itemId = i;
		const data = [...this.state.data];

		let currentInputType = inputTypeArray.find(item => (item.value === event.target.value) ? item.type: false);
		currentInputType = currentInputType.type;

		let item = data.find(item => item.id === itemId);
		item.type = itemValue;
		item.value = "";
		item.inputType = currentInputType;

		this.setState({data});
	}

	handleInput(event, i) {
		const inputValue = event.target.value;
		const inputId = i;
		const data = [...this.state.data];

		let item = data.find(item => item.id === inputId);
		item.value = inputValue;

		this.setState({data});
	}

	handleAddInput (i) {
		const data = [...this.state.data];
		data.push({id: i + 1, type: "Phone", value: "", inputType: "tel"});
		this.setState({data});
	}

	handleRemoveInput (index) {
		const data = [...this.state.data];
		data.splice(index, 1);
		this.setState({data});
	}

	handleSubmit(event) {
		alert("Your choice: " + this.state.data.type + " " + this.state.data.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} method="POST">
				{this.state.data.map((item, i) => {
					return (
					<div key={i} className="main-form__item">
						<label>
							<select value={item.type}
									onChange={event => this.handleChange(event, i)}
									className="main-form__select">
								<option value="Phone"
										className="main-form__option">Phone</option>
								<option value="Mail"
										className="main-form__option">Mail</option>
								<option value="Link"
										className="main-form__option">Link</option>
							</select>
						</label>
						<input
							type={item.inputType}
							name="inputInfo"
							value={item.value}
							onChange={event => this.handleInput (event, i)}
						/>
						<input
							type="button"
							value="+"
							onClick={() => this.handleAddInput(i)}
						/>
						<input
							type="button"
							value="-"
							onClick={() => this.handleRemoveInput(i)}
						/>
					</div>)})};
				<br/><br/><br/>
				<input type="submit" value="Submit" />
				<pre>
					{JSON.stringify(this.state, null, 2)}
				</pre>
			</form>

		);
	}
}

export default App;