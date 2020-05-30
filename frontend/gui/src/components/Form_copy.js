import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;

class CustomForm extends React.Component {


    handleFormSubmit = (event) => {
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


    }



    render() {
        return (
            <div>
                <Form>
                    <Form.Item label="Title">
                        <Input name="title" placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Content">
                        <Input name="content" placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div >
        );

    }
};

export default CustomForm;

