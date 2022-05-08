// const menuToggle = document.querySelector('.toggle');
// const showcase = document.querySelector('.showcase');
// menuToggle.addEventListener('click', () => {
//         menuToggle.classList.toggle('active');
//         showcase.classList.toggle('active');
// });

$(document).ready(function() {
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