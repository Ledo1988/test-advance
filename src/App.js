import React from "react";
import 'fontsource-roboto';
import {Button, Input, Select, MenuItem} from "@material-ui/core";
import "./styles/main.css";

const inputTypeArray = [
	{value: "phone", type: "tel"},
	{value: "email", type: "email"},
	{value: "link", type: "url"},
]

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{id: 0, type: "phone", value: "", inputType: "tel", pattern: "^[0-9-+\\s()]*$"},
			]
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleAddInput = this.handleAddInput.bind(this);
		this.handleRemoveInput = this.handleRemoveInput.bind(this);
	}

	handleChange(event, i) {
		const itemValue = event.target.value;
		const data = [...this.state.data];

		let currentInputType = inputTypeArray.find(item => (item.value === itemValue) ? item.type: false);
		currentInputType = currentInputType.type;

		let item = data.find(item => item.id === i);
		item.type = itemValue;
		item.inputType = currentInputType;
		(currentInputType === 'tel') ? item.pattern = "^[0-9-+\\s()]*$" : item.pattern = "";

		this.setState({data});
	}

	handleInput(event, i) {
		const data = [...this.state.data];

		let item = data.find(item => item.id === i);
		item.value = event.target.value;

		this.setState({data});
	}

	handleAddInput (i) {
		const data = [...this.state.data];

		data.forEach(item => (item.id > i) ? item.id++ : false);
		data.push({id: i + 1, type: "phone", value: "", inputType: "tel", pattern: "^[0-9-+\\s()]*$"});
		data.sort(function (a, b) {
			if (a.id > b.id) {
				return 1;
			}
			if (a.id < b.id) {
				return -1;
			}
			return 0;
		});

		this.setState({data});
	}

	handleRemoveInput (i) {
		const data = [...this.state.data];

		data.forEach(item => (item.id > i ) ? item.id-- : false);
		if (i > 0) {
			data.splice(i, 1);
		}

		this.setState({data});
	}

	handleSubmit(event) {

		event.preventDefault();

		let data = [...this.state.data];
		data = data.filter(item => item.value !== "");

		const dataType = data.map(item => item.type);
		const dataValue = data.map(item => item.value);

		const newObject = new getFormValues(dataType, dataValue);
		const result = convertArrayToObject (newObject);

		function getFormValues(type, value) {
			this.type = type;
			this.value = value;
		}

		function convertArrayToObject (object) {

			let resultArray = Object.keys(object).reduce(function (items, key) {
				object[key].forEach(function (a, i) {
					items[i] = items[i] || {};
					items[i][key] = a;
				});
				return items;
			}, []);

			return resultArray;
		}

		alert("Форма заполнена" + "  getFormValues:  " + JSON.stringify(newObject) + "  convertArrayToObject:  " + JSON.stringify(result))

		data = []
		data.push({id: 0, type: "phone", value: "", inputType: "tel", pattern: "^[0-9-+\\s()]*$"})
		this.setState({data});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} method="POST" action="/" className="main-form">
				{this.state.data.map((item, i) => {
					return (
					<div key={i} className="main-form__item">
						<Select
							value={item.type}
							onChange={event => this.handleChange(event, i)}
							displayEmpty
							className="main-form__select"
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem value="phone"
									  className="main-form__option">Phone</MenuItem>
							<MenuItem value="email"
									  className="main-form__option">Email</MenuItem>
							<MenuItem value="link"
									  className="main-form__option">Link</MenuItem>
						</Select>
						{(item.pattern !== "")
							? <Input inputProps={{ 'aria-label': 'description', 'pattern': `${item.pattern}`}}
									 className="main-form__input"
									 type={item.inputType}
									 name="inputInfo"
									 value={item.value}
									 onChange={event => this.handleInput (event, i)}/>

							: <Input defaultValue=""
									 inputProps={{ 'aria-label': 'description' }}
									 className="main-form__input"
									 type={item.inputType}
									 name="inputInfo"
									 value={item.value}
									 onChange={event => this.handleInput (event, i)}/>
						}
						{item.value !== "" || item.id === 0 || item.id !== this.state.data.length - 1
							? <Button variant="contained"
										 color="secondary"
										 type="button"
										 className="main-form__btn main-form__btn-add"
										 onClick={() => this.handleAddInput(i)}>
							+</Button>
							: false
						}<Button variant="contained"
								 color="primary"
								 type="button"
								 className="main-form__btn main-form__btn-remove"
								 onClick={() => this.handleRemoveInput(i)}>
						-</Button>
					</div>)})}
				<Button variant="contained"
						color="primary"
						type="submit"
						className="main-form__submit">
					Submit
				</Button>
			</form>

		);
	}
}

export default App;