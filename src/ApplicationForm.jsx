import React from "react";

const appdata=[];

export default class ApplicationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "First Name",
            lastName: "Last Name",
            dob: "dob",
            sex: "U", //default selection value
            email: "Email",
            phone: "Phone"
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) { //from React Website
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        appdata.push(this.state)

        //print app
        let text = "First name:" + this.state.firstName + " | Last name:" + this.state.lastName +
            " | Date of Birth:" + this.state.dob + " | Sex Marker:" + this.state.sex + " | Email:" + this.state.email +
            " | Phone:" + this.state.phone + " | Thank you! Applications submitted: " + appdata.length;

        alert(text);
    }


    render() {
        return (
            <div>
                <form className="flex one two-600" onSubmit={this.handleSubmit}>
                    <div className="flex one two-600">
                        <h3 className="full">Patient Basic Information</h3>
                        <label className="full fifth-600" htmlFor="firstName">
                            First Name:
                        </label>
                        <input
                            className="full four-fifth-600"
                            type="text"
                            onChange={this.handleInputChange}
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            required="required"
                            aria-describedby="first-name-input"
                        />
                        <label className="full fifth-600" htmlFor="lastName">
                            Last Name:
                        </label>
                        <input
                            className="full four-fifth-600"
                            type="text"
                            onChange={this.handleInputChange}
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            required="required"
                            aria-describedby="last-name-input"
                        />
                        <label className="full fifth-600" htmlFor="dob">
                            Date of birth:
                        </label>
                        <input
                            className="full four-fifth-600"
                            type="date"
                            onChange={this.handleInputChange}
                            id="dob"
                            name="dob"
                            required="required"
                            aria-describedby="date-of-birth-input"
                        />
                        <label className="full fifth-600" htmlFor="sex">
                            Sex on Record:
                        </label>
                        <select
                            className="full four-fifth-600"
                            onChange={this.handleInputChange}
                            id="sex"
                            name="sex"
                            required="required"
                            aria-describedby="sex-marker-selection"
                        >
                            <option>U</option>
                            <option>F</option>
                            <option>M</option>
                            <option>X</option>
                        </select>
                        <h3 className="full">Patient Contact Information</h3>
                        <label className="full fifth-600" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="full four-fifth-600"
                            type="email"
                            onChange={this.handleInputChange}
                            id="email"
                            name="email"
                            placeholder="vrmc@example.com"
                            required="required"
                            aria-describedby="email-input"
                        />
                        <label className="full fifth-600" htmlFor="phone">
                            Phone Number:
                        </label>
                        <input
                            className="full four-fifth-600"
                            type="tel"
                            onChange={this.handleInputChange}
                            pattern="[0-9]{10}"
                            id="phone"
                            name="phone"
                            placeholder="1112223344"
                            required="required"
                            aria-describedby="phone-number-input"
                        />
                        <button className="full" type="submit" id="submitBtn">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}