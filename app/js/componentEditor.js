$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

var componentIdNumber = 0;
var componentAttributes = [];

$('#workspaceBackground').css('background-image', 'url(' + localStorage.croppedImage + ')');

interact('.draggable')
    .draggable({
        inertia: true,
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: true,
        snap: {
            targets: [
                interact.createSnapGrid({ x: 9.5, y: 9.5 })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
        },

        onmove: dragMoveListener,
        onend: function (e) {
            var textEl = e.target.querySelector('p');

            textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(Math.pow(e.pageX - e.x0, 2) +
                Math.pow(e.pageY - e.y0, 2) | 0))
                    .toFixed(2) + 'px');
        }
    });

function dragMoveListener (e) {
    var target = e.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;

    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    $('#' + componentAttributes['PanelId'] + ' .component-info-x').html(x);
    $('#' + componentAttributes['PanelId'] + ' .component-info-y').html(y);
}

window.dragMoveListener = dragMoveListener;

$('.component-add').on('click', function() {
    $('#workspace').append('<div id="component-id-' + componentIdNumber + '" class="draggable circle-component" title="' + $(this).attr('title') + '"><i class="fas fa' + $(this).attr('id') + '"></i></div>');
    $('.right-panel > .row').append('<div id="panel-id-' + componentIdNumber + '" class="col-md-12 right-panel-section edit-panel-section"><h5 class="component-info-name"></h5><div class="w-100 h-100"><button class="swipe-button btn btn-round-lg btn-outline-danger scale-button component-delete" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><span class="component-info-icon"><i class="fas fa-minus fa-fw"></i></span><div class="icon"><i class="fas fa-minus fa-fw"></i></div></button><div class="float-left"><ul><li>Id: <span class="component-info-id"></span></li><li>Czy grupa: <span class="component-info-group"></span></li><li>X: <span class="component-info-x"></span></li><li>Y: <span class="component-info-y"></span></li><li>Wysokość: <span class="component-info-height"></span></li></ul></div></div></div>');
    $('.right-panel > .row').append('<div id="panel-id-' + componentIdNumber + '" class="col-md-12 right-panel-section edit-panel-section"><h5 class="component-info-name"></h5><div class="w-100 h-100"><button class="swipe-button btn btn-round-lg btn-outline-danger scale-button component-delete" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><span class="component-info-icon"><i class="fas fa-minus fa-fw"></i></span><div class="icon"><i class="fas fa-minus fa-fw"></i></div></button><div class="float-left"><ul><li>Id: <span class="component-info-id"></span></li><li>Czy grupa: <span class="component-info-group"></span></li><li>X: <span class="component-info-x"></span></li><li>Y: <span class="component-info-y"></span></li><li>Wysokość: <span class="component-info-height"></span></li></ul></div></div></div>');
    componentIdNumber++;
});

$('svg').on('click', function() {
    console.log($(this));
});

$('#workspace').on('mousedown', 'div', function() {

    componentAttributes['CurrentId'] = $(this).attr('id');
    componentAttributes['CurrentIdNumber'] = componentAttributes['CurrentId'].replace(/\D/g,'');
    componentAttributes['PanelId'] = 'panel-id-' + componentAttributes['CurrentIdNumber'];
    componentAttributes['Name'] = $(this).attr('title');
    componentAttributes['Icon'] = $(this).find('svg').attr('data-icon');

    $('.edit-panel-section').css('display', 'none');
    $('#' + componentAttributes['PanelId']).css('display', 'block');
    $('#' + componentAttributes['PanelId'] + ' .component-info-id').html(componentAttributes['CurrentIdNumber']);
    $('#' + componentAttributes['PanelId'] + ' .component-info-name').html(componentAttributes['Name']);
    $('#' + componentAttributes['PanelId'] + ' .component-info-icon').html('<i class="fas fa-' + componentAttributes["Icon"] + ' fa-fw"></i>');
});

$(document).on('click', '.component-delete', function() {
    $('#' + componentAttributes['CurrentId']).remove();
    $('#' + componentAttributes['PanelId']).remove();
})