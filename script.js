let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;

function main() {
    CANVAS = document.getElementById("myCanvas");
    CONTEXT = CANVAS.getContext("2d");

    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    // ask for permission to use the camera
    let promise = navigator.mediaDevices.getUserMedia({ video: true });

    promise
        .then(function (signal) {
            // create video element
            VIDEO = document.createElement("video");

            // initialize the video element to the signal coming from the camera
            VIDEO.srcObject = signal;

            VIDEO.play();

            // when video data is available, update it on the canvas
            VIDEO.onloadeddata = function () {
                updateCanvas();
            };
        })
        .catch(function (error) {
            alert("Camera error: " + error);
        });
}

function updateCanvas() {
    CONTEXT.drawImage(VIDEO, 0, 0, CANVAS.width, CANVAS.height);

    window.requestAnimationFrame(updateCanvas);
}
