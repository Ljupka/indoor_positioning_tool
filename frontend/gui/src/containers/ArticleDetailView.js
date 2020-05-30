import React, { Component } from 'react';
import axios from 'axios';

import { Card } from 'antd';


class ArticleDetail extends Component {

    state = {
        article: {}
    }

    // when component ArticleList is mounted this will be called
    componentDidMount() {
        // ova match params zema brojkata so ke se stavi vo url
        const articleID = this.props.match.params.articleID;
        console.log("article id is ", articleID)
        console.log("Component did mount article detail!")

        axios.get('http://127.0.0.1:8000/api/indoor_app/' + articleID)
            .then(res => {
                this.setState({
                    article: res.data
                });
                console.log(res.data);
            })
    }

    // it was listData
    render() {
        return (
            <Card title={this.state.article.title} >
                <p>{this.state.article.content}</p>
                <img
                    width={272}
                    alt="logo"
                    src={this.state.article.image}
                />
            </Card>


        )
    }
}

export default ArticleDetail;