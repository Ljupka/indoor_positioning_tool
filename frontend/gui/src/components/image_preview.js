import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'antd';


class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = { file: '', imagePreviewUrl: '', showAlert: false, 'myloadedimg': null};
    }

    _handleSubmit(e) {
        e.preventDefault();
        console.log("state in handle submit", this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.file, this.state.file.name);
        console.log("form data is ", this.state.file)
        
        /*
        let url = 'http://127.0.0.1:8000/indoor_app/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log("AFTER POST " , res.data);

                this.setState({ showAlert: true })
                this.props.setState({ imgId:  res.data.id });

            })
            .catch(err => console.log(err))
        */

        //let img_name = res.data.image;
        let url = 'http://127.0.0.1:8000/indoor_app/';
        axios.post(url, form_data)
            .then(res => {
                console.log("Posted data " , res);

            })
            .catch(err => console.log(err))

          
            let im = this.state.file.name;
            console.log("THE PROPS ARE ", this.props)
            this.props.setState({ imgLoaded: true});
            this.setState({myloadedimg: {im}});
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


  getDetections = (e) => {
    let url = 'http://127.0.0.1:8000/indoor_app/';

  axios.get(url).then(resp => {

  
    console.log(" in getDetections, loadedImg ", this.state.myloadedimg)
    
 
    console.log("in getDet ", resp.data[0].image)

    // filter data to get the loadedImg
    //...resp.data.filter(item => item.image=== this.state.loadedImg)

    var json_data = JSON.stringify(resp.data)
    let img = this.state.myloadedimg.im;
    console.log(" Loded ", img)
    var result_image = JSON.parse(json_data).filter(function (entry) {

    let formatted_entry = entry.image.split("/")

    // exract image name
    let img_name_ext = formatted_entry[formatted_entry.length - 1] 
    console.log("loded list ", formatted_entry)
    console.log("loded img_name_ext ", img_name_ext)
    return img_name_ext === img });
    

    console.log("getDet result ", result_image)

    // split path to get image name
    let detections = result_image[0].detected_objects
    let detections_list = detections.split(",")

    //remove quotations
    for (var el in detections_list){
        el.replace(/['"]+/g, '')
    }

    console.log("DETE ", detections_list)
  
    this.props.setState({detected_elements: detections_list });
    this.setState({ showAlert: true});
    });
  };


  positionUser = (e) => {

        this.props.setState({nn_based_positioning: true})
    
  };


    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        let alert_box = null;

        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an image </div>);
        }

        if (this.state.showAlert === true) {
            console.log("its true")
            alert_box = (<Alert showAlert={this.state.showAlert} message={"Detected objects are: " + this.props.elements} type="success" />);
        }
        else { console.log("its false") }





        return (
            <div className="previewComponent">

                <div class="alertBox">
                    {alert_box}
                </div>

                <form class="formStyle" onSubmit={(e) => this._handleSubmit(e)}>
                    <input className="fileInput"
                        type="file"
                        onChange={(e) => this._handleImageChange(e)} />
                    <button className="submitButton"
                        type="submit"
                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
                </form>
               <button class='button' onClick={this.getDetections}>
                    Get Detections
                </button>

               <button class='button' onClick={this.positionUser}>
                    Position yourself on map
                </button>
                <div className="imgPreview">
                    {$imagePreview}
                </div>

            </div>
        )

    }
}


export default ImageUpload;