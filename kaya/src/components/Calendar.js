import React, { Component } from 'react'

export default class Calendar extends Component {
    render() {

        const {name} = this.props;

        return (
            <div>
                I am {name} calendar
            </div>
        )
    }
}
