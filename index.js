// const menuToggle = document.querySelector('.toggle');
// const showcase = document.querySelector('.showcase');
// menuToggle.addEventListener('click', () => {
//         menuToggle.classList.toggle('active');
//         showcase.classList.toggle('active');
// });

$(document).ready(function() {

// $("#member-tab").hide();
// $("#syllabus-tab").hide();
animateDiv();
});
let RATIO = 0.9;
function limitNumberWithinRange(num, min, max){
        const MIN = min || 1;
        const MAX = max || 20;
        const parsed = parseInt(num)
        return Math.min(Math.max(parsed, MIN), MAX)
      }
    
    function makeNewPosition($container, scale, offset) {

        // Get viewport dimensions (remove the dimension of the div)
        //console.log($container.css("left"));
        $container = ($container || $(window))
        var h = $container.height() - 50;
        var w = $container.width() - 50;
        
        var minhw = Math.min(h,w)
        // movement amount
        var nh = Math.floor((Math.random()-0.5)*2 * minhw * scale) ;
        var nw = Math.floor((Math.random()-0.5)*2 * minhw * scale) ;

        var left = $container.css("left");
        var top = $container.css("top");
        var topLen = parseInt("0" + top.substring(0,top.length-2));
        var leftLen = parseInt("0" + left.substring(0,left.length-2));

        var offh = offset.top - topLen;
        var offw = offset.left - leftLen;

        
        var moveh = limitNumberWithinRange(offh+nh, 0, h);
        var movew = limitNumberWithinRange(offw+nw, 0, w);
        // console.log(offset);

        // console.log(topLen);
        return [moveh +topLen, movew + leftLen];
    
    }
    function animateDivSub($target, scale) {

        var newq = makeNewPosition($target.parent(), scale,$target.offset());
        // var offset = $target.parent().offset();
        console.log(newq);
        var oldq = $target.offset();
        var speed = calcSpeed([oldq.top, oldq.left], newq);
        
        $target.animate({
                top: newq[0],
                left: newq[1]
        }, speed, function() {
                animateDivSub($target, scale);
        });
    };

    function animateDiv() {
        $('.butterfly').each (function (){
                var scale = RATIO * Math.random();
                animateDivSub($(this), scale);
                }
        )
    };

//     function animateDiv() {
            
//         var $target = $('.butterfly');
//         var newq = makeNewPosition($target.parent());
//         var offset = $target.parent().offset();
//         console.log(offset);
//         var oldq = $target.offset();
//         var speed = calcSpeed([oldq.top, oldq.left], newq);
    
//         $('.butterfly').animate({
//             top: newq[0],
//             left: newq[1]
//         }, speed, function() {
//             animateDiv();
//         });
    
//     };
    
    function calcSpeed(prev, next) {
        var x = Math.abs(prev[1] - next[1]);
        var y = Math.abs(prev[0] - next[0]);
        var greatest = x > y ? x : y;
        var speedModifier = 0.05;
        var speed = Math.ceil(greatest / speedModifier);
        return speed;
    
    }



var activeTab = 0;
var pages = [0,1,2];

var page_ids = ["#home-tab", "#syllabus-tab", "#member-tab"];

$("#home-button").on('click', function () {
    if(activeTab !== 0){
        var page = page_ids[0];

        for(id of page_ids){
            if(id !== page){
                $(id).hide();
            }else{
                $(id).show();
            }
        }
        activeTab = 0;
    }
    $(".butterfly").show();
});
$("#syllabus-button").on('click', function () {
    if(activeTab !== 1){
        var page = page_ids[1];

        for(id of page_ids){
            if(id !== page){
                $(id).hide();
            }else{
                $(id).show();
            }
        }
        activeTab = 1;
    }
    $(".butterfly").hide();
});
$("#member-button").on('click', function () {
    if(activeTab !== 2){
        var page = page_ids[2];

        for(id of page_ids){
            if(id !== page){
                $(id).hide();
            }else{
                $(id).show();
            }
        }
        activeTab = 2;
    }
    $(".butterfly").hide();
});
// $(".nav-button").on('click', function () {
// var currentPage = location.pathname,
//         idx = pages.indexOf(currentPage),
//         newIndex, failOver;
// if (idx > -1) {
//         newIndex = $(this).hasClass("next") ? ++idx : --idx;
//         failOver = $(this).hasClass("next") ? 0 : 2;
//         location.pathname = pages[newIndex] || pages[failOver];
// }
// document.onmousemove = function(e){
//     var x = e.pageX;
//     var y = e.pageY;
//     e.target.title = "X is "+x+" and Y is "+y;
//     };

// image = new MarvinImage();
// image.load("https://i.imgur.com/eLZVbQG.png", imageLoaded);

// function imageLoaded(){
//     console.log("(0,0): "+(image.getAlphaComponent(0,0) > 0 ? "NOT_TRANSPARENT" : "TRANSPARENT"));
//     console.log("(150,150): "+(image.getAlphaComponent(150,150) > 0 ? "NOT_TRANSPARENT" : "TRANSPARENT"));
// }
// var img = document.getElementById('my-image');
// var canvas = document.createElement('canvas');
// canvas.width = img.width;
// canvas.height = img.height;
// canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
var delay = function (elem, callback) {
    var timeout = null;
    elem.onmouseover = function() {
        // Set timeout to be a timer which will invoke callback after 1s
        timeout = setTimeout(callback, 500);
    };

    // elem.onmouseout = function() {
    //     // Clear any timers set to timeout
    //     clearTimeout(timeout);
    // }
};
var pixelCount = [0,0,0,0,0,0]
$(function() {

    $('.member-img').mousemove(function(e) {
    // delay($('.member-img'), function(e) {
        if(!this.canvas) {
            this.canvas = $('<canvas />')[0];
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
        }
        // console.log(1);
        var pixelData = this.canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
        // console.log('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3]);
        if(pixelData[3] >0) {
            // $('.dialogue')
            if(pixelData[3]===1){
                if(pixelCount[0]<3){
                    pixelCount[0] += 1;
                }else{

                
                const box = document.getElementById('dialogue1');
                box.style.top = "55%";
                box.style.left = "43%";
                $('#dialogue1').show();
                $('#dialogue2').hide();
                $('#dialogue3').hide();
                $('#dialogue4').hide();
                $('#dialogue5').hide();
                $('#dialogue6').hide();
                }
                // $('.dialogue-text').show();
            }else if(pixelData[3]===2){
                if(pixelCount[1]<3){
                    pixelCount[1] += 1;
                }else{
                const box = document.getElementById('dialogue2');
                box.style.top = "50%";
                box.style.left = "50%";
                $('#dialogue2').show();
                $('#dialogue1').hide();
            // $('#dialogue2').hide();
            $('#dialogue3').hide();
            $('#dialogue4').hide();
            $('#dialogue5').hide();
            $('#dialogue6').hide();
                }
                // $('.dialogue-text').show();
            }else if(pixelData[3]===3){
                if(pixelCount[2]<3){
                    pixelCount[2] += 1;
                }else{
                const box = document.getElementById('dialogue3');
                box.style.top = "40%";
                box.style.left = "55%";
                $('#dialogue3').show();
                $('#dialogue1').hide();
            $('#dialogue2').hide();
            // $('#dialogue3').hide();
            $('#dialogue4').hide();
            $('#dialogue5').hide();
            $('#dialogue6').hide();
            }
                // $('.dialogue-text').show();
            }else if(pixelData[3]===4){
                if(pixelCount[3]<3){
                    pixelCount[3] += 1;
                }else{
                const box = document.getElementById('dialogue4');
                box.style.top = "35%";
                box.style.left = "64%";
                $('#dialogue4').show();
                $('#dialogue1').hide();
            $('#dialogue2').hide();
            $('#dialogue3').hide();
            // $('#dialogue4').hide();
            $('#dialogue5').hide();
            $('#dialogue6').hide();
                }
                // $('.dialogue-text').show();
            }else if(pixelData[3]===5){
                if(pixelCount[4]<3){
                    pixelCount[4] += 1;
                }else{
                const box = document.getElementById('dialogue5');
                box.style.top = "10%";
                box.style.left = "70%";
                $('#dialogue5').show();
                $('#dialogue1').hide();
            $('#dialogue2').hide();
            $('#dialogue3').hide();
            $('#dialogue4').hide();
            // $('#dialogue5').hide();
            $('#dialogue6').hide();
            }
        }
            else if(pixelData[3]===6){
                if(pixelCount[5]<3){
                    pixelCount[5] += 1;
                }else{
                const box = document.getElementById('dialogue6');
                box.style.top = "10%";
                box.style.left = "80%";
                $('#dialogue6').show();
                $('#dialogue1').hide();
            $('#dialogue2').hide();
            $('#dialogue3').hide();
            $('#dialogue4').hide();
            $('#dialogue5').hide();
                }
            // $('#dialogue6').hide();
            }

            
            // const box = document.getElementById('dialogue');
            // box.style.top = (e.offsetY -100) +"px";
            // box.style.left = (e.offsetX -100) + "px";
            
        }else{
            pixelCount[0] = 0;
            pixelCount[1] = 0;
            pixelCount[2] = 0;
            pixelCount[3] = 0;
            pixelCount[4] = 0;
            pixelCount[5] = 0;
            $('#dialogue1').hide();
            $('#dialogue2').hide();
            $('#dialogue3').hide();
            $('#dialogue4').hide();
            $('#dialogue5').hide();
            $('#dialogue6').hide();
            $('.dialogue-box').hide();
            // $('.dialogue-text').hide();
        }
        
    }
    
    );
    
    
    
});