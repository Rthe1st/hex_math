function refreshHelp(){
    let css = questionDetail.technique.cssName;
    let helpDiv = document.querySelector('#help > [name="' + css + '"]');
    let allHelpDivs = document.querySelectorAll('#help > *');
    allHelpDivs.forEach(function(element){
        element.setAttribute("hidden", true);
    });
    helpDiv.removeAttribute("hidden");

}

function numberLine(start, end, showGuess){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;
    let lowest = start - (start % baseConversion("10"));
    let highest = end + (baseConversion("10") - (end % baseConversion("10")));
    let spacing = canvas.width/(highest-lowest);
    with(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lineWidth = 2;
        strokeStyle = '#000';
        for(var i = 0;i <= highest-lowest; i++) {
            beginPath();
            strokeStyle = '#000';
            lineWidth = 2;
            let x = (i + 1) * spacing;
            moveTo(x, h/2 - 20);
            lineTo(x, h/2 + 20);
            if(start === i){
                fillStyle = '#0f0';
                strokeStyle = '#0f0';
            }else if(end === i){
                fillStyle = '#f00';
                strokeStyle = '#f00';
            }else{
                fillStyle = '#000';
                strokeStyle = '#000';
            }
            fillText((lowest + i).toString(base()), x - 5, h/2 + 35);
            fill();
            stroke();
        }
        beginPath();
        strokeStyle = '#f00';
        fillStyle = '#f00';
        let startPosition = (start - lowest + 1)*spacing;
        ctx.moveTo(startPosition,h/2);
        let endPosition = (end - lowest + 1)*spacing;
        let midPoint = startPosition + (endPosition - startPosition)/2;
        ctx.quadraticCurveTo(midPoint,h*0.25,endPosition,h/2);
        let text = start + "+" + (end-start).toString(base());
        ctx.fillText(text,midPoint,h/2*0.5-10);
        ctx.stroke();
    }
}