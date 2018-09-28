/*
 * Copyright 2015-2017 WorldWind Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Illustrates how to display and pick Placemarks.
 */
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        /**
         * Added imagery layers.
         */
        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Define the images we'll use for the placemarks.
        var images = [
            "plain-black.png",
            "plain-blue.png",
            "plain-brown.png",
            "plain-gray.png",
            "plain-green.png",
            "plain-orange.png",
            "plain-purple.png",
            "plain-red.png",
            "plain-teal.png",
            "plain-white.png",
            "plain-yellow.png",
            "castshadow-black.png",
            "castshadow-blue.png",
            "castshadow-brown.png",
            "castshadow-gray.png",
            "castshadow-green.png",
            "castshadow-orange.png",
            "castshadow-purple.png",
            "castshadow-red.png",
            "castshadow-teal.png",
            "castshadow-white.png"
        ];

        var infobox = [
            {
                siteid: 1,
                sitename:"TangHuLu",
                sitedesc: "delicious candied hawthorn fruit skewers!",
                image: "Blue Pin.png"
            },
            {
                siteid: 2,
                sitename: "Orange Starburst",
                sitedesc: "sour-sweet candy with a citric gush!",
                image: "Red-pin.png"
            }];


        var pinLibrary = WorldWind.configuration.baseUrl + "images/pushpins/", // location of the image files
            placemark,
            placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
            highlightAttributes,
            placemarkLayer = new WorldWind.RenderableLayer("Placemarks"),
            latitude = 47.684444,
            longitude = -121.129722;

        // Set up the common placemark attributes.
        placemarkAttributes.imageScale = 1;
        placemarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.3,
            WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

        // For each placemark image, create a placemark with a label.
        for (var i = 0, len = images.length; i < len; i++) {
            // Create the placemark and its label.
            placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude + i, 1e2), true, null);
            placemark.label = "Placemark" + i.toString() + "\n"
                + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n"
                + "Lon " + placemark.position.longitude.toPrecision(5).toString();
            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

            // Create the placemark attributes for this placemark. Note that the attributes differ only by their
            // image URL.
            placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            placemarkAttributes.imageSource = pinLibrary + images[i];
            placemark.attributes = placemarkAttributes;

            // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
            // the default highlight attributes so that all properties are identical except the image scale. You could
            // instead vary the color, image, or other property to control the highlight representation.
            highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            highlightAttributes.imageScale = 1.2;
            placemark.highlightAttributes = highlightAttributes;

            // Add the placemark to the layer.
            placemarkLayer.addRenderable(placemark);
        }

        // Add the placemarks layer to the WorldWindow's layer list.
        wwd.addLayer(placemarkLayer);


        var newLibrary = WorldWind.configuration.baseUrl + "images/pushpins/", // location of the image files
            newmark,
            newmarkAttributes = new WorldWind.PlacemarkAttributes(null),
            newhighlightAttributes,
            newmarkLayer = new WorldWind.RenderableLayer("New Placemark"),
            newlatitude = 50,
            newlongitude = -120;


        // Set up the common bowmark attributes.
        newmarkAttributes.imageScale = 0.3;
        newmarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.3,
            WorldWind.OFFSET_FRACTION, 0.0);
        newmarkAttributes.imageColor = WorldWind.Color.WHITE;
        newmarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);
        newmarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        newmarkAttributes.drawLeaderLine = true;
        newmarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

        // For each place mark image, create a place mark with a label.
        for (var j = 0, totalamount = infobox.length; j < totalamount; j++) {
            // Create the place mark and its label.
            newmark = new WorldWind.Placemark(new WorldWind.Position(newlatitude, newlongitude + j * 10, 1e2), true, null);
            newmark.label = infobox[j].siteid;
            //     + "Lat " + newmark.position.latitude.toPrecision(4).toString() + "\n"
            //     + "Lon " + newmark.position.longitude.toPrecision(5).toString();
            newmark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

            // Create the newmark attributes for this place mark. Note that the attributes differ only by their
            // image URL.
            newmarkAttributes = new WorldWind.PlacemarkAttributes(newmarkAttributes);
            newmarkAttributes.imageSource = newLibrary + infobox[j].image;
            newmark.attributes = newmarkAttributes;

            // Create the highlight attributes for this place mark. Note that the normal attributes are specified as
            // the default highlight attributes so that all properties are identical except the image scale. You could
            // instead vary the color, image, or other property to control the highlight representation.
            newhighlightAttributes = new WorldWind.PlacemarkAttributes(newmarkAttributes);
            newhighlightAttributes.imageScale = 0.5;
            newmark.highlightAttributes = newhighlightAttributes;

            // Add the place mark to the layer.
            newmarkLayer.addRenderable(newmark);
        }

        // Add the place marks layer to the WorldWindow's layer list.
        wwd.addLayer(newmarkLayer);

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);

        // Now set up to handle picking.

        var highlightedItems = [];

        // The common pick-handling function.
        var handlePick = function (o) {
            // alert("ttyy");
            // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
            // the mouse or tap location.
            var x = o.clientX,
                y = o.clientY;

            var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

            // De-highlight any previously highlighted placemarks.
            for (var h = 0; h < highlightedItems.length; h++) {
                highlightedItems[h].highlighted = false;
            }
            highlightedItems = [];

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
            if (pickList.objects.length > 0) {
                redrawRequired = true;
            }

            // Highlight the items picked by simply setting their highlight flag to true.
            if (pickList.objects.length > 0) {
                for (var p = 0; p < pickList.objects.length; p++) {
                    pickList.objects[p].userObject.highlighted = true;

                    // Keep track of highlighted items in order to de-highlight them later.
                    highlightedItems.push(pickList.objects[p].userObject);

                    // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                    // If instead the user picked the placemark's image, the "labelPicked" property is false.
                    // Applications might use this information to determine whether the user wants to edit the label
                    // or is merely picking the placemark as a whole.
                    if (pickList.objects[p].labelPicked) {
                        console.log("Label picked");
                    }
                }
            }

            // Update the window if we changed anything.
            if (redrawRequired) {
                wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
            }
        };
        var handleMouseCLK = function (a) {
            var x = a.clientX,
                y = a.clientY;
            var pickListCLK = [];
            pickListCLK = wwd.pick(wwd.canvasCoordinates(x, y));
            for (var m = 0; m < pickListCLK.objects.length; m++) {
                var pickedPM = pickListCLK.objects[m].userObject;
                if (pickedPM instanceof WorldWind.Placemark) {

                    // sitePopUp(pickedPM.label);
                    alert(pickedPM.label);
                    sitePopUp(pickedPM.label);


                    $(document).ready(function () {

                        var modal = document.getElementById('popupBox');
                        var span = document.getElementById('closeIt');

                        modal.style.display = "block";


                        span.onclick = function () {
                            modal.style.display = "none";

                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";

                                }
                            }
                        }
                    });
                }
            }


        };

        var sitePopUp = function (id) {
            var popupBodyItem = $("#popupBody");


            for (var k = 0, lengths = infobox.length; k < lengths; k++) {

                    if (infobox[k].siteid === id) {

                    popupBodyItem.children().remove();
                    // alert(infobox[k].sitename);
                    var popupBodyName = $('<p class="site-name"><h4>' + infobox[k].sitename + '</h4></p>');
                    var popupBodyDesc = $('<p class="site-description">' + infobox[k].sitedesc + '</p><br>');

                    popupBodyItem.append(popupBodyName);
                    popupBodyItem.append(popupBodyDesc);
                    // break
                }
             }
        };



        // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
        wwd.addEventListener("mousemove", handlePick);

        // wwd.addEventListener("click", sitePopUp);

        wwd.addEventListener("click", handleMouseCLK);

        // Listen for taps on mobile devices and highlight the placemarks that the user taps.
        // var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);

    });



