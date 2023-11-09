let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
// specify how much of the screen space the video should take up
let SCALER = 0.8;
let SIZE = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

function main() {
    CANVAS = document.getElementById("myCanvas");
    CONTEXT = CANVAS.getContext("2d");

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
                handleResize();
                // window.addEventListener("resize", handleResize);

                updateCanvas();
            };
        })
        .catch(function (error) {
            alert("Camera error: " + error);
        });
}

function handleResize() {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    // find the minimum ratio between screen size & video size
    let resizer =
        SCALER *
        Math.min(
            window.innerWidth / VIDEO.videoWidth,
            window.innerHeight / VIDEO.videoHeight
        );

    // set the SIZE attribute accordingly
    SIZE.width = VIDEO.videoWidth * resizer;
    SIZE.height = VIDEO.videoHeight * resizer;
    SIZE.x = (window.innerWidth - SIZE.width) / 2;
    SIZE.y = (window.innerHeight - SIZE.height) / 2;
}

function updateCanvas() {
    CONTEXT.drawImage(VIDEO, SIZE.x, SIZE.y, SIZE.width, SIZE.height);

    window.requestAnimationFrame(updateCanvas);
}
