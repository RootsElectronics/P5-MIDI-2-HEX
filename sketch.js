//Script that will display incoming MIDI notes as their
//relative HEX values.
//5 Values per line



let timer = 0;
let liner = 1;
let MIDIPORT = 1;                 //change this to define your midi input
let currentNote;
var notePos;
var previousnotePos = -1;
let OnOff = false;
let yaxis=0;
let MIDItimer = 0;

function setup() {
  createCanvas(600, 400);
  //frameRate(10);
  background(0);

  ////
  //Setting up MIDI
  ////

  WebMidi.enable(function (err) {      
    //check if WebMidi.js is enabled

    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    }

    //name our visible MIDI input and output ports
    console.log("---");
    console.log("Inputs Ports: ");
    for (i = 0; i < WebMidi.inputs.length; i++) {
      console.log(i + ": " + WebMidi.inputs[i].name);
    }

    console.log("---");
    console.log("Output Ports: ");
    for (i = 0; i < WebMidi.outputs.length; i++) {
      console.log(i + ": " + WebMidi.outputs[i].name);
    }

    //Choose an input port
    inputSoftware = WebMidi.inputs[MIDIPORT]; //This sets the incoming MIDI port

    //listen to all incoming "note on" input events
    inputSoftware.addListener("noteon", "all", function (e) {
      //Show what we are receiving
      
      displayText =
        "Received 'noteon' message (" +
        e.note.name +
        e.note.octave +
        ") " +
        e.note.number +
        ".";

      //yaxis is the note variable
      yaxis = e.note.number;
      OnOff = true;
    });

    inputSoftware.addListener("noteoff", "all", function (e) {
      //Show what we are receiving
    
      OnOff = false;
    }); //end of MIDI setup
    
  });
}

function draw() {
  textSize(20);
  fill(3, 252, 19);

  notePos = map(yaxis, 0, 127, 0, height);                            //function for drawing the hex
  if (notePos != previousnotePos) {
    if (MIDItimer > 380) {                 //this sets the text width constraints
      text("0x" + hex(notePos, 2), (MIDItimer += 55), height - liner);
      MIDItimer = 0;
      liner += 20;
    } else {
      text("0x" + hex(notePos, 2), (MIDItimer += 55), height - liner);
    }
    if (liner > 381) {                    //this sets how many rows
      background(0);
      liner = 1;
      text("0x" + hex(notePos, 2), (MIDItimer += 55), height - liner);
    }
    MIDItimer++;
  }
  previousnotePos = notePos;

  if (frameCount % 60 == 0) {
    timer++;
  }

 
}

function mousePressed() {                                                //fullscreen function
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

