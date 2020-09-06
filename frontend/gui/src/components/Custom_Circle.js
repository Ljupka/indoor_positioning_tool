import React, { Component } from 'react';
import { Circle, Popup } from 'react-leaflet';



//  <Circle center={position_fireext} fillColor="blue" radius={20} />




const position_fireext = [51.025728, 13.722753]
const position_fireext2 = [51.025192, 13.723450]
const position_fireext3 = [51.025800, 13.722758]
const position_defibr = [51.025273, 13.722934]
const position_exit = [51.025685, 13.722994]




// can be stored in a database in the future
//,{ "id": 5, "type": "fire_extinguisher", "coordinates": position_fireext3 }
const evacuation_objects = [
    { "id": 1, "type": "fire_extinguisher", "coordinates": position_fireext },
    { "id": 2, "type": "exit", "coordinates": position_exit },
    { "id": 3, "type": "fire_extinguisher", "coordinates": position_fireext2 },
    { "id": 4, "type": "defibrillator", "coordinates": position_defibr }
]


// should be counted from a database in the future
const nr_fireext = 2
const nr_defibr = 1
const nr_exit = 1



const radius = 0.000300;

var certain_position = true
var map_positions = [];
var certainty = 0;



class MyCircle extends Component {

    constructor(props) {
        super(props);
        this.detected_objects = this.props.elements;
        this.object_in_focus = this.detected_objects[0];
    }





    componentDidMount() {

        console.log("its mounted")

    }


    isElementInsideCircle(position_of_element, center_of_circle, radius) {

        var x0 = position_of_element[0];
        var y0 = position_of_element[1];
        var x1 = center_of_circle[0];
        var y1 = center_of_circle[1];


        var result = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        if (result < radius) {
            return true;
        }
        else {
            return false;
        }


    }

    


    createRanges(r) {

        for (var obj in evacuation_objects) {

            var objects_inside_circle = [];

            var center = evacuation_objects[obj];
            
            for (var obj2 in evacuation_objects) {

             
                if (obj2 !== center) {
                    if (this.isElementInsideCircle(evacuation_objects[obj2], center, r)) {

                        objects_inside_circle.push({ key: obj2, value: evacuation_objects[obj2] })
                    }
                }
            }
            

        }
    }

    //get map position
    findPosition() {


        if (this.detected_objects.length === 1) {

            //razmisli kako da se pretstavi ova


            if (this.object_in_focus === "fire_extinguisher") {

                // return uncertainty

                // if #fire extinguishers > 1 the position on the map will be uncertain
                certain_position = false;
                this.showDifferentPossibilites("fire_extinguisher");
            }



            if (this.object_in_focus === "defibrillator") {

                var result_elem = null
                for (var i = 0; i < evacuation_objects.length; i++) {

                    if (evacuation_objects[i].type === "defibrillator") {
                        result_elem = evacuation_objects[i].coordinates;
                    }
                }
                return result_elem;
            }

            if (this.object_in_focus === "exit") {

                var result_elem = null
                for (var i = 0; i < evacuation_objects.length; i++) {
                    if (evacuation_objects[i].type === "exit") {
                        result_elem = evacuation_objects[i].coordinates;
                    }
                }
                return result_elem;
            }
        }

        else {

            // if detected_objects.length > 1
            for (var obj in evacuation_objects) {

                var objects_inside_circle = [];
                var types_in_circle = [];
                var middle_position = null;


                var center = evacuation_objects[obj].coordinates;


                for (var obj2 in evacuation_objects) {

                    if (obj2 !== center) {
                        if (this.isElementInsideCircle(evacuation_objects[obj2].coordinates, center, 0.000300)) {

                            objects_inside_circle.push({ "id": evacuation_objects[obj2].id, "type": evacuation_objects[obj2].type, "coordinates": evacuation_objects[obj2].coordinates })
                        }
                    }
                }

                if (objects_inside_circle.length > 0) {

                    // check if object inside circle are the same as detected objects
                   
                    var result_object = null;



                    var types_in_circle = []

                    for (var t = 0; t < objects_inside_circle.length; t++) {
                        types_in_circle.push(objects_inside_circle[t].type)
                    }


                    console.log("typskiiiiii  ")
                    console.log(typeof this.detected_objects)
                    var intersection = this.detected_objects.filter(value => -1 !== types_in_circle.indexOf(value));


                    // get middle position
                    var sum_positions = [0, 0]
                    for (var k = 0; k < objects_inside_circle.length; k++) {

                        sum_positions[0] = sum_positions[0] + objects_inside_circle[k].coordinates[0];
                        sum_positions[1] = sum_positions[1] + objects_inside_circle[k].coordinates[1];
                    }



                    var avg_x = sum_positions[0] / objects_inside_circle.length;
                    var avg_y = sum_positions[1] / objects_inside_circle.length;

                    middle_position = [avg_x, avg_y]




                    if (this.checkIfSame(types_in_circle, this.detected_objects)) {

                        return middle_position;
                    }

                }

            }


        }

    }


    showDifferentPossibilites(object_type) {

        // count how many objects of this type there are
        var elems_count = this.getNrofElements(object_type);


        for (var i = 0; i < evacuation_objects.length; i++) {
            if (evacuation_objects[i].type === "fire_extinguisher") {
                map_positions.push(evacuation_objects[i].coordinates);
            }
        }

        var position_certainty = 1 / elems_count;



        certainty = position_certainty;
    }

    // check if 2 lists contain same elements
    checkIfSame(list1, list2) {


        for (var m = 0; m < list1.length; m++) {

            if (list2.indexOf(list1[m]) > -1) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;

    }

    // get number of each of the element of type @object_type on the map
    getNrofElements(object_type) {
        if (object_type === "fire_extinguisher")
            return nr_fireext;

        if (object_type === "exit")
            return nr_exit;

        if (object_type === "defibrillator")
            return nr_defibr;
    }


    // get the coordinates of the element in focus
    getCoordinatesOfElementInFocus(elements_in_circle) {

        var coordinates_of_focus = null;

        for (var i = 0; i < elements_in_circle.length; i++) {

            var el = elements_in_circle[i]
            console.log("el is ", el.key)

            if (this.object_in_focus === "fire_extinguisher") {
                if (el.key === "fire_extinguisher1" || el.key === "fire_extinguisher2") {
                    coordinates_of_focus = el.value;
                    break;
                }
            }
            if (this.object_in_focus === "defibrillator") {

                if (el.key === "defibrillator") {
                    coordinates_of_focus = el.value;
                    break;
                }
            }

            if (this.object_in_focus === "exit") {

                if (el.key === "exit") {
                    coordinates_of_focus = el.value;
                    break;
                }
            }
        }

        return coordinates_of_focus;

    }


    // get the coordinates of the element in focus
    getCoordinatesOfElementInFocus2(elements_in_circle) {

        var coordinates_of_focus = null;

        for (var i = 0; i < elements_in_circle.length; i++) {

            var el = elements_in_circle[i]

            if (this.object_in_focus === "fire_extinguisher") {
                if (el.type === "fire_extinguisher") {
                    coordinates_of_focus = el.coordinates;
                    break;
                }
            }
            if (this.object_in_focus === "defibrillator") {

                if (el.type === "defibrillator") {
                    coordinates_of_focus = el.coordinates;
                    break;
                }
            }

            if (this.object_in_focus === "exit") {

                if (el.type === "exit") {
                    coordinates_of_focus = el.coordinates;
                    break;
                }
            }
        }

        return coordinates_of_focus;

    }

    calculateCertainty() {
        if (this.detected_objects.length === 1) {
            if (this.object_in_focus === "fire_extinguisher") {
                return this.getCoordinatesOfElementInFocus;
            }

            if (this.object_in_focus === "defibrillator") {
                return 1 / nr_defibr;
            }

            if (this.object_in_focus === "exit") {
                return 1 / nr_exit;
            }
        }
    }




    render() {
        var circle_center = null;

      
        circle_center = this.findPosition();

       

        return (


            <div> {
                certain_position ?
                    <div>
                        <Circle center={circle_center} fillColor="blue" radius={20} >
                            <Popup position={circle_center} >
                                You are here.
                        </Popup>
                        </Circle>

                    </div>
                    :
                    <div>

                        {map_positions.map(function (position, i) {
                            return <div>

                                <Circle center={map_positions[i]} fillColor="blue" radius={20} >
                                    <Popup position={map_positions[i]} >
                                        You are here with {certainty} probability.
                                    </Popup>
                                </Circle>
                            </div>;
                        })}

                    </div>

            }
            </div>



        );
    }

}

export default MyCircle;