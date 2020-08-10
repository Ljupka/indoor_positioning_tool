import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'antd';


class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: '', showAlert: false };
    }

    _handleSubmit(e) {
        e.preventDefault();
        console.log("state in handle submit", this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.file, this.state.file.name);
        console.log("form data is ", this.state.file)
        let url = 'http://127.0.0.1:8000/api/indoor_app/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res.data);

                this.setState({ showAlert: true })
            })
            .catch(err => console.log(err))

    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        let alert_box = null;

        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        if (this.state.showAlert === true) {
            console.log("its true")
            alert_box = (<Alert showAlert={this.state.showAlert} message={"Detected objects are: " + this.props.elements} type="success" />);
        }
        else { console.log("its false") }


        return (
            <div className="previewComponent">

                <div>
                    {alert_box}
                </div>
                <form onSubmit={(e) => this._handleSubmit(e)}>
                    <input className="fileInput"
                        type="file"
                        onChange={(e) => this._handleImageChange(e)} />
                    <button className="submitButton"
                        type="submit"
                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>

            </div>
        )

    }
}


export default ImageUpload;