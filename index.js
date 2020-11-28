//document.body.style.background = 'black'

navigator.webkitGetUserMedia({video: true, audio: false}, function(stream) {

    var Peer = require('simple-peer')
    var peer = new Peer({
        initiator: location.hash === '#getMyID', // localhost:9966/#getMyID makes it true
        trickle: false, 
        stream: stream
    })

    //Passing myID to my text area
    peer.on('signal', function (data) {
        document.getElementById('myId').value = JSON.stringify(data)
    })

    //Button Connect click
    document.getElementById('connect').addEventListener('click', function () {
        var guyId = JSON.parse(document.getElementById('guyId').value)
        peer.signal(guyId)
    })

    //Button Send click
    document.getElementById('send').addEventListener('click', function () {
        var myMessage = document.getElementById('myMessage').value
        peer.send(myMessage)
    })

    peer.on('data', function (data) {
        document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream', function (stream) {
        var video = document.createElement('video')
        document.body.appendChild(video)
        video.srcObject = stream
        video.play()
    })

}, function(err) {
    if (err === PERMISSION_DENIED) {
        alert("You have to agree!")
    }
    console.error(err) 
})