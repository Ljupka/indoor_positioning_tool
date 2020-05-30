import React, { Component } from 'react';
import axios from 'axios';

import Articles from '../components/Article';
import CustomForm from '../components/Form';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}


class ArticleList extends Component {

    state = {
        articles: []
    }

    // when component ArticleList is mounted this will be called
    componentDidMount() {

        console.log("Component did mount")
        axios.get('http://127.0.0.1:8000/api/indoor_app/')
            .then(res => {
                this.setState({
                    articles: res.data
                });
                console.log(res.data);
            })
    }

    // it was listData
    render() {
        return (
            <div>
                <Articles data={this.state.articles} />
                <br />
                <h2>Create an article</h2>
                <CustomForm articles={this.state.articles} />
            </div>


        )
    }
}

export default ArticleList;