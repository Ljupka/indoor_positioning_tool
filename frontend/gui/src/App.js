import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import axios from 'axios';
import MyCircle from './components/Custom_Circle';
import ImageUpload from './components/image_preview';

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Circle, CircleMarker } from 'react-leaflet';
import { List } from 'antd/lib/form/Form';



var myIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})

var fireExt = L.icon({
  iconUrl: require('./components/fire_extinguisher.png'),
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})

var defibr = L.icon({
  iconUrl: require('./components/defibrillator.png'),
  iconSize: [25, 25],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})

var exit = L.icon({
  iconUrl: require('./components/exit.jpg'),
  iconSize: [25, 25],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
})

/*
const map_bounds = [
  [51.026067, 13.721950],
  [51.024899, 13.723831],
]
*/

// right bounds, spored stranicata find box
const map_bounds = [
  [51.024681, 13.721892], [51.026129, 13.724408]
]


class App extends Component {

  state = {
    selectedFile: null,
    title: '',
    content: '',
    image: null,
    lat: 51.025650,
    lng: 13.723321,
    zoom: 500,
    maxZoom: 600,
    minZoom: 500,
    // prvior e vo fokus toj, okolu koj ke bide krugot
    // ovde da se smeni otkako netz ke predict
    //detected_elements: ['fire_extinguisher', 'exit'],
    detected_elements: ['fire_extinguisher', 'exit'],
    //detected_elements: [],
    imgLoaded: false,
    loadedImg: null,
    specifyElements: false,
    positionUser: false,
    tags: [''],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
    inserted_elements: [],
    clear_map: false,
    imgId: 1,
    nn_detected_elements: [],
    nn_based_positioning: false
  }



  componentDidMount() {



  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    let url = 'http://127.0.0.1:8000/api/indoor_app/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
  };


  handleClick = (e) => {
    this.setState({
      specifyElements: true
    })
  };

  getMapLocation = (e) => {
    this.setState({
      positionUser: true
    })
  };


  /*
  startAgain = (e) => {
    this.setState({
      clear_map: true,
      detected_elements: null,
      inserted_elements: null
    })
  };

  below:
            <button class="button2" onClick={this.startAgain}>
            Start again
         </button>
  */



  // functions for the tag fragment
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());

  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });

    this.setState({ inserted_elements: [...this.state.inserted_elements, inputValue] });

  };

  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  saveEditInputRef = input => {
    this.editInput = input;
  };




  // format list to look nicer 
  lstElements() {


    var lst = [];
    for (var i = 0; i < this.state.detected_elements.length; i++) {

      // do not add coma after last element
      if (i !== this.state.detected_elements.length - 1) {
        lst.push(this.state.detected_elements[i].toString() + ',');
      }
      else {
        lst.push(this.state.detected_elements[i].toString());
      }
    }

    console.log("element ", lst)
    return lst;
  }


  render() {
    const position = [this.state.lat, this.state.lng]

    const position_fireext = [51.025728, 13.722753]
    const position_fireext2 = [51.025192, 13.723450]
    const position_fireext3 = [51.025800, 13.722758]
    //const position_defibr = [51.025192, 13.723170]

    const position_defibr = [51.025273, 13.722934]
    const position_exit = [51.025685, 13.722994]

    const { tags, inputVisible, inputValue, editInputIndex, editInputValue, inserted_elements } = this.state;
    const colors = ["magenta", "red", "volcano", "orange", "gold", "limegreen", "cyan", "blue", "geekblue", "purple"]

    /*in return was
            <Router>
          <CustomLayout>
            <BaseRouter />
          </CustomLayout>
        </Router>
    */

    return (


      <div className="App" class="parentDiv">
        <h1 class="pageTitle">Indoor Positioning System</h1>
        <div class="box">
          <a href="#popup1">
            <img class="imgClass" src={require('./components/question.png')} />
          </a>
        </div>

        <div id="popup1" class="overlay">
          <div class="popup">
            <h2>About the IPS</h2>
            <a class="close" href="#">&times;</a>
            <div class="content">
              The model is able to detect the following elements: fire_extinguisher,  exit, printer, screen, clock, chair, bin. <br />
         For the positioning currently are fire_extinguisher and exit used.   <br /> You can position yourself by taking an image of the aforementioned objects or you can specify the detected objects manually. <br /> You can insert: fire_extinguisher, exit, defibrillator. Please make sure that you use this exact spelling.
        <br /> Restart page to position yourself again.
		</div>
          </div>
        </div>




        <ImageUpload setState={imgLoaded => { this.setState(imgLoaded)}, imgId => { this.setState(imgId) }} elements={this.state.detected_elements} />


        <button class="button" onClick={this.getMapLocation}>
          Position yourself
         </button>

        <button class="button" onClick={this.handleClick}>
          Specify detected objects
         </button>


        {this.state.specifyElements ?
          <div class="tagsBar">
            {tags.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={this.saveEditInputRef}
                    key={tag}
                    size="small"
                    className="tag-input"
                    value={editInputValue}
                    onChange={this.handleEditInputChange}
                    onBlur={this.handleEditInputConfirm}
                    onPressEnter={this.handleEditInputConfirm}
                  />
                );
              }

              const isLongTag = tag.length > 20;

              const tagElem = (
                <Tag
                  className="edit-tag"
                  key={tag}
                  closable={index !== 0}
                  onClose={() => this.handleClose(tag)}
                  color={colors[index]}

                >
                  <span class="new_tag"
                    onDoubleClick={e => {
                      if (index !== 0) {
                        this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                          this.editInput.focus();
                        });
                        e.preventDefault();
                      }
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                  tagElem
                );
            })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                className="tag-input"
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag className="site-tag-plus" onClick={this.showInput}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </div>



          : <h3></h3>
        }





        <div class="map_container">

          <Map className="map" center={position} scrollWheelZoom={false} touchZoom={false} bounds={map_bounds} maxBounds={map_bounds}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position_fireext} icon={fireExt}>
              <Popup>
                Fire extinguisher
          </Popup>
            </Marker>

            <Marker position={position_fireext2} icon={fireExt}>
              <Popup>
                Fire extinguisher
          </Popup>
            </Marker>

            <Marker position={position_defibr} icon={defibr}>
              <Popup>
                Defibrilator
          </Popup>
            </Marker>

            <Marker position={position_exit} icon={exit}>
              <Popup>
                Exit
          </Popup>
            </Marker>

            {this.state.imgLoaded &&  this.state.nn_based_positioning ?
              <MyCircle elements={this.state.detected_elements} fillColor="blue" radius={20} />
              : <h3>Upload image!</h3>
            }

            {this.state.positionUser ?
              <MyCircle elements={this.state.inserted_elements} fillColor="blue" radius={20} />
              : <h4>Insert detected elements manually</h4>
            }



          </Map>
        </div>




      </div >
    );
  }
}

export default App;
