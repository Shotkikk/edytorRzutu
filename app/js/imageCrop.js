$(function cropit() {
    $('.image-editor').cropit({
        smallImage: 'allow',
        exportZoom: 2,
        minZoom: 'fit',
        imageBackground: true,
        allowDragNDrop: false,
        imageState: {
            src: 'http://lorempixel.com/500/400/'
        }
    });

    $('.rotate-cw').click(function () {
        $('.image-editor').cropit('rotateCW');
    });

    $('.rotate-ccw').click(function () {
        $('.image-editor').cropit('rotateCCW');
    });

    $('.export').click(function () {
        var imageData = $('.image-editor').cropit('export');
        localStorage.setItem("croppedImage", imageData);
        window.location.href = "planeEditor.min.html";
    });
});