import React from "react";
import { Dropdown } from 'semantic-ui-react';
import { signal, effect } from "@preact/signals-react";


export const priorityDropdownSignal = signal();
let dropdownRef = null;
effect(() => {
    if (priorityDropdownSignal.value && dropdownRef) {
        let value = priorityDropdownSignal.value;
        dropdownRef.current.props['value'] = value;
        dropdownRef.current.props['data-value'] = value;
        dropdownRef.current.setState({ value });
    }
});

/**
 * A Priority Dropdown using semantic-ui-react's {@link Dropdown} component.
 * Values are veryhigh, high, medium, low, verylow.
 */
class PriorityDropdown extends React.Component {
    state = {};
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    handleChange = (e, { value }) => {
        priorityDropdownSignal.value = value;
        this.setState({ value });
    };


    componentDidMount() {
        dropdownRef = this.ref;
    }


    options = [
        { key: 'Very High', value: 'veryhigh', text: 'Very High' },
        { key: 'High', value: 'high', text: 'High' },
        { key: 'Medium', value: 'medium', text: 'Medium' },
        { key: 'Low', value: 'low', text: 'Low' },
        { key: 'Very Low', value: 'verylow', text: 'Very Low' }
    ];

    // I spent at least 15 hours just trying to get this to work with signals.
    // I finally compromised and managed to find a way to get it to work with both states
    // and signals. 
    render() {
        const { value } = this.state;
        return (
            <Dropdown ref={this.ref} onChange={this.handleChange} value={value} data-value={value} name="priority" id="priority" data-send selection options={this.options} />
        );
    }

}

export default PriorityDropdown;