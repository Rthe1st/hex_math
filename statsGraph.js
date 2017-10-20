var plotData;

function drawGraph(stats){
    let yAxis = [];
    let xAxisCorrect = [];
    let xAxisIncorrect = [];
    for(let stat of stats){
        yAxis.push(stat.name);
        xAxisCorrect.push(stat.correct);
        xAxisIncorrect.push(stat.incorrect);
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

function refreshGraph(stats, data) {
    for(let [index, stat] of stats.entries()){
        data[0]['x'][index] = stat.correct;
        data[1]['x'][index] = stat.incorrect;
    }
    Plotly.redraw('tester');
}