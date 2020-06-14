import React, { Component } from 'react';
import { Circle } from 'react-leaflet';
import CustomForm from './Form';
import { circle } from 'leaflet';


//  <Circle center={position_fireext} fillColor="blue" radius={20} />


const nr_fireext = 2
const nr_defibr = 1
const nr_exit = 1

const position_fireext = [51.025728, 13.722753]
const position_fireext2 = [51.025192, 13.723450]
const position_defibr = [51.025273, 13.722934]
const position_exit = [51.025685, 13.722994]

const evacuation_objects = {

    'exit': position_exit,
    'fire_extinguisher1': position_fireext,
    'fire_extinguisher2': position_fireext2,
    'defibrillator': position_defibr
};

//const detected_objects = ['fire_extinguisher', 'exit'];
const detected_objects = ['defibrillator'];

const object_in_focus = detected_objects[0];



class MyCircle extends Component {



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

        if (detected_objects.length === 1) {

            //razmisli kako da se pretstavi ova
            /*
            if (object_in_focus === "fire_extinguisher") {
                // return uncertainty
                return 
            }
            */

            if (object_in_focus === "defibrillator") {
                return evacuation_objects["defibrillator"];
            }

            if (object_in_focus === "exit") {
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

                var intersection = detected_objects.filter(value => -1 !== formatted_list.indexOf(value));
                console.log("detected objects is ", detected_objects)
                console.log("object inside circle ", formatted_list)
                console.log("intersection is ", intersection)



                if (this.checkIfSame(formatted_list, detected_objects)) {

                    console.log("objects inside circle final: ", objects_inside_circle);
                    var element_in_focus = this.getCoordinatesOfElementInFocus(objects_inside_circle);
                    console.log("result is ", element_in_focus)
                    return element_in_focus;
                }

            }


        }

    }

    // check if 2 lists contain same elements
    checkIfSame(list1, list2) {
        console.log(" check in same", list1)

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


    // get the coordinates of the element in focus
    getCoordinatesOfElementInFocus(elements_in_circle) {

        var coordinates_of_focus = null;

        for (var i = 0; i < elements_in_circle.length; i++) {

            var el = elements_in_circle[i]
            console.log("el is ", el.key)

            if (object_in_focus === "fire_extinguisher") {
                if (el.key === "fire_extinguisher1" || el.key === "fire_extinguisher2") {
                    coordinates_of_focus = el.value;
                    break;
                }
            }
            if (object_in_focus === "defibrillator") {

                if (el.key === "defibrillator") {
                    coordinates_of_focus = el.value;
                    break;
                }
            }

            if (object_in_focus === "exit") {

                if (el.key === "exit") {
                    coordinates_of_focus = el.value;
                    break;
                }
            }
        }

        return coordinates_of_focus;

    }

    calculateCertainty() {
        if (detected_objects.length === 1) {
            if (object_in_focus === "fire_extinguisher") {
                return this.getCoordinatesOfElementInFocus;
            }

            if (object_in_focus === "defibrillator") {
                return 1 / nr_defibr;
            }

            if (object_in_focus === "exit") {
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
        const detected_objects = this.props.elements;

        circle_center = this.findPosition();



        return (
            <div>
                <Circle center={circle_center} fillColor="blue" radius={20} />
                <div>{this.findPosition()}</div>
            </div>

        );
    }

}

export default MyCircle;