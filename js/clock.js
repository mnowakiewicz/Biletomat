var time = moment();
$('.time').text(time.format('LTS'));
setInterval(function () {
    var time = moment();
    $('.time').text(time.format('LTS'));
}, 1000)