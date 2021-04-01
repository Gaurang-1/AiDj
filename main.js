song="";

leftWristX=0;
leftWristY=0;

rightWristx=0;
rightWristy=0;

scoreLeftWrist="";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotPoses);
}

function modalLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[0].score;
        console.log("score left wrist"+scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist x ="+leftWristX+"left wrist y ="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right Wrist x ="+rightWristX+"right wrist y ="+rightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY=Number(leftWristY);
        remove_decimals=floor(InNumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume"+volume;
        song.setVolume(volume);
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}