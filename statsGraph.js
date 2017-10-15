var plotData;

function drawGraph(){
    let yAxis = [];
    let xAxisCorrect = [];
    let xAxisIncorrect = [];
    for(let technique of techniques){
        yAxis.push(technique.name);
        xAxisCorrect.push(technique.correct);
        xAxisIncorrect.push(technique.incorrect);
    }
    var trace1 = {
        x: xAxisCorrect,
        y: yAxis,
        name: 'Correct',
        type: 'bar',
        orientation: 'h'
    };

    var trace2 = {
        x: xAxisIncorrect,
        y: yAxis,
        name: 'Wrong',
        type: 'bar',
        orientation: 'h'
    };

    var data = [trace1, trace2];

    plotData = data;
    var layout = {
        barmode: 'stack',
        xaxis: {
            rangemode: "tozero",
            autorange: true,
            gridwidth: 1
        }
    };

    Plotly.newPlot('tester', data, layout);
}

function refreshGraph(data) {
    for(let [index, entry] of techniques.entries()){
        let [correct, incorrect] = entry.windowStats();
        data[0]['x'][index] = correct;
        data[1]['x'][index] = incorrect;
    }
    Plotly.redraw('tester');
}