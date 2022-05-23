

// function get data 
function getData() {
  var dropdown = d3.select("#selectData");
  var dataset = dropdown.property("value");
  buildcharts(dataset)

}
// event lister
d3.selectAll("#selectData").on("change", getData);

// initial page (Home page)
// FUNCTION 1, set init() for dashboard and do dropdown button
function buildcharts(dataset) {

  // function tracie(BankValue) {

  console.log(dataset)


  d3.json(dataset).then((data) => {
     console.log(data)
     console.log(data[0].Name)

    let bankname = data.map(x => x.Name)
    console.log(bankname)

    let close_price = data.map(y => y.close)
    console.log(close_price)

    let banktime = data.map(z => z.date)
    console.log(banktime)

    let bankvolumes = data.map(b => b.volume)
    console.log(bankvolumes)

    let bubblebankvolumes = data.map(b => b.volume / 1000000)
    console.log(bubblebankvolumes)


    let open_price = data.map(i => i.open)
    console.log(open_price)

    let high_price = data.map(g => g.high)
    console.log(high_price)

    let low_price = data.map(h => h.low)
    console.log(low_price)

    var trace1 = {
      x: banktime,
      y: close_price,
      text: bankname,
      type: "scatter",
      marker: { color: "red" }
    }

    var data = [trace1]

    var layout = {
      title: `${bankname[0]} Time Series Plot`,
      xaxis: { title: "Observed time (one-year 2018)" },
      yaxis: { title: "Close Prices" }
    }

    Plotly.newPlot("line", data, layout)


    // create a trace for BUBBLE chart: 


    var bank_bub_values = [{
      x: banktime,
      y: bankvolumes,
      text: bankvolumes,
      mode: "markers",
      marker: {
        color: bankvolumes,
        size: bubblebankvolumes,
        colorscale: "Earth"
      }
    }]

    // Define bubble layout format:   
    var bank_bub_layout = {
      title: `${bankname[0]} Bubble Plot`,
      xaxis: { title: "Bank stocks" },
      yaxis: { title: "Volume" }
    }

    Plotly.newPlot("bubble", bank_bub_values, bank_bub_layout);
    
    
    // Data not available pass this line 

    var trace3 = {
  
      x: banktime, 
      
      close: close_price, 
      
      decreasing: {line: {color: '#7F7F7F'}}, 
      
      high: high_price, 
      
      increasing: {line: {color: '#17BECF'}}, 
      
      line: {color: 'rgba(31,119,180,1)'}, 
      
      low: low_price, 
      
      open: open_price, 
      
      type: 'candlestick', 
      xaxis: 'x', 
      yaxis: 'y'
    };
    
    var data = [trace3];
    
    var layout = {
      dragmode: 'zoom', 
      margin: {
        r: 10, 
        t: 25, 
        b: 40, 
        l: 60
      }, 
      showlegend: false, 
      xaxis: {
        autorange: true, 
        rangeslider: {range: ['2018-01-01 12:00', '2018-02-10 12:00']}, 
        title: 'Date', 
        type: 'date'
      }, 
      yaxis: {
        autorange: true, 
        type: 'linear'
      },
      
      annotations: [
        {
          x: '2018-01-01',
          y: 0.9,
          xref: 'x',
          yref: 'paper',
          text: 'largest movement',
          font: {color: 'magenta'},
          showarrow: true,
          xanchor: 'right',
          ax: -20,
          ay: 0
        }
      ],
      
      shapes: [
          {
              type: 'rect',
              xref: 'x',
              yref: 'paper',
              x0: '2018-01-01',
              y0: 0,
              x1: '2018-02-10',
              y1: 1,
              fillcolor: '#d3d3d3',
              opacity: 0.2,
              line: {
                  width: 0
              }
          }
        ]
  };
    
    Plotly.newPlot('candle', data, layout);











































  });
}

function init() {
  buildcharts("resources/bank30.json");

}
init();

