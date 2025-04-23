# Technical Design Document
This document provides technical details based on the functional design document. 

## System Architecture
BACKEND: 
PHP Rest API, JSON based awners

We want to build the backend in PHP, the backend is then all on the server and the benefit of this is that we don't need all the Questions on the frontend. We link it to the Frontend via a REST API, that allows us to interact with the questions API stuff.. etc...

Awners array, in the array you have all the outcomes for awners is going to be one big array, different awners that gives from the backend the emotion & next question / awnser. 

Three different endpoints, for the A, B, C buttons based on that it is returning a awnser

FRONTEND:
VueJS, Tailwindcss, threejs, scene manager, regular javascript, API interaction service

ThreeJS -> Shader loader, 3D renderer, GLTF Loader & Performance optimized
Scene manager is going to be linked against libraries of threejs, combined with the vue framework, we want to have different views available so we need a way to structure this all.

API Interaction service, to link against the REST API built in PHP

### Technologies & Versions
We want to use the latest versions of all the libraries we need

### Database Diagram
Not needed

## Testing
Tests based on the requirements in the FDD:
Lighthouse, WebTestOrg, feedback form on how the application works, vue devtools

### Deployment
Github pages for frontend, for backend we are serving it on: api.lukevdbroek.nl

