import React, { Component } from 'react';
import { Circle, LeafletConsumer, Popup } from 'react-leaflet';
import CustomForm from './Form';
import { circle } from 'leaflet';



//  <Circle center={position_fireext} fillColor="blue" radius={20} />




const position_fireext = [51.025728, 13.722753]
const position_fireext2 = [51.025192, 13.723450]
const position_fireext3 = [51.025800, 13.722758]
const position_defibr = [51.025273, 13.722934]
const position_exit = [51.025685, 13.722994]

const evacuation_objects = {

    'exit': position_exit,
    'fire_extinguisher1': position_fireext,
    'fire_extinguisher2': position_fireext2,
    'defibrillator': position_defibr
};


// can be stored in a database in the future
//,{ "id": 5, "type": "fire_extinguisher", "coordinates": position_fireext3 }
const evacuation_objects_2 = [
    { "id": 1, "type": "fire_extinguisher", "coordinates": position_fireext },
    { "id": 2, "type": "exit", "coordinates": position_exit },
    { "id": 3, "type": "fire_extinguisher", "coordinates": position_fireext2 },
    { "id": 4, "type": "defibrillator", "coordinates": position_defibr }
]


// should be counted from a database in the future
const nr_fireext = 2
const nr_defibr = 1
const nr_exit = 1



//const detected_objects = ['fire_extinguisher', 'exit'];
//const detected_objects = ['fire_extinguisher'];

//const object_in_focus = detected_objects[0];

const radius = 0.000300;

var certain_position = true
var map_positions = [];
var certainty = 0;



class MyCircle extends Component {

    constructor(props) {
        super(props);
        this.detected_objects = this.props.elements;
        this.object_in_focus = this.detected_objects[0];
        this.state = {};
    }





    componentDidMount() {

        console.log("its mounted")

    }


    isElementInsideCircle(position_of_element, center_of_circle, radius) {

        var x0 = position_of_element[0];
        var y0 = position_of_element[1];
        var x1 = center_of_circle[0];
        var y1 = center_of_circle[1];

        console.log("inside circle, coordinates: ", x0, y0, x1, y1)

        var result = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
        console.log("inside circle, result is ", result)
        if (result < radius) {
            console.log("inside circle!")
            return true;
        }
        else {
            console.log("outside circle")
            return false;
        }


    }

    findPosition() {

        if (this.detected_objects.length === 1) {

            //razmisli kako da se pretstavi ova

            if (this.object_in_focus === "fire_extinguisher") {
                // return uncertainty
                //showDifferentPossibilites();

            }


            if (this.object_in_focus === "defibrillator") {
                return evacuation_objects["defibrillator"];
            }

            if (this.object_in_focus === "exit") {
                return evacuation_objects["exit"];
            }
        }

        else {
            // if detected_objects.length > 1

            for (var obj in evacuation_objects) {

                var objects_inside_circle = [];

                var center = evacuation_objects[obj];
                console.log("center is ", obj)

                for (var obj2 in evacuation_objects) {

                    console.log("obj2 is ", obj2)
                    if (obj2 !== center) {
                        if (this.isElementInsideCircle(evacuation_objects[obj2], center, 0.000300)) {

                            objects_inside_circle.push({ key: obj2, value: evacuation_objects[obj2] })
                        }
                    }
                }
                console.log("objects inside circle are ", objects_inside_circle);

                // check if object inside circle are the same as detected objects
                // if (object_inside_circle.indexOf("exit") > -1 && object_inside_circle.indexOf("fire_extinguisher1") > -1){

                // result object in center
                var result_object = null;

                // format objects_inside_circle
                var formatted_list = []
                for (var i = 0; i < objects_inside_circle.length; i++) {
                    var el = objects_inside_circle[i]
                    console.log("el is ", el.key)
                    if (el.key === "fire_extinguisher1" || el.key === "fire_extinguisher2") {
                        formatted_list.push("fire_extinguisher");
                    }
                    if (el.key === "defibrillator") {
                        formatted_list.push("defibrillator");
                    }
                    if (el.key === "exit") {
                        formatted_list.push("exit");
                    }
                }

                var intersection = this.detected_objects.filter(value => -1 !== formatted_list.indexOf(value));
                console.log("detected objects is ", this.detected_objects)
                console.log("object inside circle ", formatted_list)
                console.log("intersection is ", intersection)



                if (this.checkIfSame(formatted_list, this.detected_objects)) {

                    console.log("objects inside circle final: ", objects_inside_circle);
                    var element_in_focus = this.getCoordinatesOfElementInFocus(objects_inside_circle);
                    console.log("result is ", element_in_focus)
                    return element_in_focus;
                }

            }


        }

    }





    createRanges(r) {

        for (var obj in evacuation_objects_2) {

            var objects_inside_circle = [];

            var center = evacuation_objects_2[obj];
            console.log("center1 is ", evacuation_objects_2[obj])

            for (var obj2 in evacuation_objects_2) {

                console.log("obj2 is ", obj2)
                if (obj2 !== center) {
                    if (this.isElementInsideCircle(evacuation_objects_2[obj2], center, r)) {

                        objects_inside_circle.push({ key: obj2, value: evacuation_objects_2[obj2] })
                    }
                }
            }
            console.log("objects inside circle are ", objects_inside_circle);

            // check if object inside circle are the same as detected objects
            // if (object_inside_circle.indexOf("exit") > -1 && object_inside_circle.indexOf("fire_extinguisher1") > -1){




        }
    }

    findPosition2() {

        if (this.detected_objects.length === 1) {

            //razmisli kako da se pretstavi ova


            if (this.object_in_focus === "fire_extinguisher") {

                // return uncertainty

                // as # fire extinguishers > 1 the position on the map will be uncertain
                certain_position = false;
                this.showDifferentPossibilites("fire_extinguisher");
            }



            if (this.object_in_focus === "defibrillator") {

                var result_elem = null
                for (var i = 0; i < evacuation_objects_2.length; i++) {

                    if (evacuation_objects_2[i].type === "defibrillator") {
                        result_elem = evacuation_objects_2[i].coordinates;
                    }
                }
                return result_elem;
            }

            if (this.object_in_focus === "exit") {

                var result_elem = null
                for (var i = 0; i < evacuation_objects_2.length; i++) {
                    if (evacuation_objects_2[i].type === "exit") {
                        result_elem = evacuation_objects_2[i].coordinates;
                    }
                }
                return result_elem;
            }
        }

        else {
            // if detected_objects.length > 1

            for (var obj in evacuation_objects_2) {

                var objects_inside_circle = [];
                var types_in_circle = [];
                var middle_position = null;


                var center = evacuation_objects_2[obj].coordinates;
                console.log("center is 2 ", obj)

                for (var obj2 in evacuation_objects_2) {

                    console.log("obj2 is  2", obj2)
                    if (obj2 !== center) {
                        if (this.isElementInsideCircle(evacuation_objects_2[obj2].coordinates, center, 0.000300)) {

                            objects_inside_circle.push({ "id": evacuation_objects_2[obj2].id, "type": evacuation_objects_2[obj2].type, "coordinates": evacuation_objects_2[obj2].coordinates })
                        }
                    }
                }

                if (objects_inside_circle.length > 0) {
                    console.log("objects inside circle are 2", objects_inside_circle);

                    // check if object inside circle are the same as detected objects
                    // if (object_inside_circle.indexOf("exit") > -1 && object_inside_circle.indexOf("fire_extinguisher1") > -1){

                    // result object in center
                    var result_object = null;


                    // types in circle da bide globalna V tuka samo push


                    var types_in_circle = []

                    for (var t = 0; t < objects_inside_circle.length; t++) {
                        console.log("elli is ", objects_inside_circle[t].type)
                        types_in_circle.push(objects_inside_circle[t].type)
                    }


                    console.log("solja inside circles are ", objects_inside_circle)


                    var intersection = this.detected_objects.filter(value => -1 !== types_in_circle.indexOf(value));

                    console.log("intersection is 2 ", intersection)


                    console.log("2 objects_inside_circle is ", types_in_circle)
                    console.log("detected obj is ", this.detected_objects)

                    // get middle position
                    var sum_positions = [0, 0]
                    for (var k = 0; k < objects_inside_circle.length; k++) {
                        console.log("coord ", objects_inside_circle[k].coordinates)
                        sum_positions[0] = sum_positions[0] + objects_inside_circle[k].coordinates[0];
                        sum_positions[1] = sum_positions[1] + objects_inside_circle[k].coordinates[1];
                    }

                    console.log("MIDDLE 1 ", objects_inside_circle[0].coordinates)
                    console.log("MIDDLE 2 ", objects_inside_circle[1].coordinates)
                    console.log("MIDDLE IS ", sum_positions)

                    var avg_x = sum_positions[0] / objects_inside_circle.length;
                    var avg_y = sum_positions[1] / objects_inside_circle.length;

                    middle_position = [avg_x, avg_y]
                    console.log("MIDDLE  POSITION IS ", middle_position)




                    if (this.checkIfSame(types_in_circle, this.detected_objects)) {

                        /*
                        console.log("objects inside circle final 2: ", objects_inside_circle);
                        var element_in_focus = this.getCoordinatesOfElementInFocus2(objects_inside_circle);
                        console.log("result is ", element_in_focus)

                        // mesto element_in_focus da returnnam 
                        return element_in_focus;
                        */
                        return middle_position;
                    }

                }

            }


        }

    }


    showDifferentPossibilites(object_type) {
        // count how many objects of this type are there

        var elems_count = this.getNrofElements(object_type);


        for (var i = 0; i < evacuation_objects_2.length; i++) {
            if (evacuation_objects_2[i].type === "fire_extinguisher") {
                map_positions.push(evacuation_objects_2[i].coordinates);
            }
        }

        var position_certainty = 1 / elems_count;

        console.log("position certainty ", elems_count)

        certainty = position_certainty;
    }

    // check if 2 lists contain same elements
    checkIfSame(list1, list2) {
        console.log(" check in same", list1, list2)

        for (var m = 0; m < list1.length; m++) {
            console.log("check o is ", list1[m])
            if (list2.indexOf(list1[m]) > -1) {
                console.log("check in");
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
            console.log("el is ", el)

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
        //const position_fireext2 = [51.025192, 13.723450];
        //const position_exit = [51.025685, 13.722994];

        console.log("in redner")
        // mislam posle ke mora preku komponent da se prenesat...

        //circle_center = this.findPosition();
        circle_center = this.findPosition2();

        // ova bese <div>{this.findPosition()}</div>

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