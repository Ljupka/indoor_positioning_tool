import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class CustomForm extends React.Component {


    handleFormSubmit = (event) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;

        console.log("here")
        console.log(title, content)

        axios.post('http://127.0.0.1:8000/api/indoor_app/', {
            title: title,
            content: content
        })
            .then(res => console.log(res))
            .catch(error => console.error(error));

        console.log("props are in child: ", this.props)

    }





    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <p>
                        <input type="text" placeholder='Title' id='title' />
                    </p>
                    <p>
                        <input type="text" placeholder='Content' id='content' />

                    </p>

                    <input type="submit" />
                </form>
            </div >
        );

    }
};

export default CustomForm;

