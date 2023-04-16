import * as React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as kf from 'kalman-filter';

const config = {
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  }
};

// Our input frames will come from here.
const videoElement = document.getElementsByClassName(
  "input_video"
)[0] as HTMLVideoElement;
const canvasElement = document.getElementsByClassName(
  "output_canvas"
)[0] as HTMLCanvasElement;
const controlsElement = document.getElementsByClassName(
  "control-panel"
)[0] as HTMLDivElement;

/**
 * Solution options.
 */
const solutionOptions = {
  selfieMode: true,
  enableFaceGeometry: true,
  maxNumFaces: 1,
  refineLandmarks: false,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.8
};

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new controls.FPS();

// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector(".loading")! as HTMLDivElement;
spinner.ontransitionend = () => {
  spinner.style.display = "none";
};


const smoothingFactor = (te, cutoff) => {
  const r = 2 * Math.PI * cutoff * te;
  return r / (r+1);
}

const exponentialSmoothing = (a, x, xPrev) => {
  return a * x + (1 - a) * xPrev;
}

class OneEuroFilter {
  constructor({minCutOff, beta}) {
    this.minCutOff = minCutOff;
    this.beta = beta;
    this.dCutOff = 0.001; // period in milliseconds, so default to 0.001 = 1Hz

    this.xPrev = null;
    this.dxPrev = null;
    this.tPrev = null;
    this.initialized = false;
  }

  reset() {
    this.initialized = false;
  }

  filter(t, x) {
    if (!this.initialized) {
      this.initialized = true;
      this.xPrev = x;
      this.dxPrev = x.map(() => 0);
      this.tPrev = t;
      return x;
    }

    const {xPrev, tPrev, dxPrev} = this;

    //console.log("filter", x, xPrev, x.map((xx, i) => x[i] - xPrev[i]));

    const te = t - tPrev;

    const ad = smoothingFactor(te, this.dCutOff);

    const dx = [];
    const dxHat = [];
    const xHat = [];
    for (let i = 0; i < x.length; i++) {
      // The filtered derivative of the signal.
      dx[i] = (x[i] - x)
