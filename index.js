let mainObj = {
    apple:25,
    banana:36,
    apricot:44,
    milk:55
}

let translatedObj = {
    apple:"խնձոր",
    banana:"բանան",
    apricot:"ծիրան",
    milk:"կաթ"
}



let createChart=(main,translated)=>{
    const colors = ["red","green","yellow","black"]


let keysArr = [];
let valueArr = [];

for(let [key,val] of Object.entries(main)){
    valueArr.push(val)
}

for(let [key,val] of Object.entries(translated)){
    keysArr.push(val)
}

let valueProcent = [];
let sum = 0

valueArr.forEach(el=>{
    sum+=el
})
valueArr.forEach(el=>{
    valueProcent.push(Math.round(el/sum*100))
})

const dataLengthColors = []



for(let i =0;i<valueProcent.length;i++){
    dataLengthColors.push(colors[i])

}


// console.log(dataLengthColors)

const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: keysArr,
        datasets: [{
            backgroundColor:dataLengthColors,
            data: valueArr
        }]
    },
    options:{
       
        legend:{
            padding: 20,
            position:'right',
            legendText :['Current','Vs last week/month/year','% Change'],

            labels:{
                fontSize:40,
                boxWidth:30,
                generateLabels:function(chart){
                    let items = [] ;
                    let count =0 ;
                    for (let [key,val] of Object.entries(chart.data)){
                        if (key ==='labels'){
                            items.push({
                                text:val[count]
                            })
                            count+=1
                            console.log(count)
                        }
                    }
                    // chart.data.datasets.forEach((dataset,i)=>{
                    //     console.log(i)
                    //     items.push({
                    //         text:chart.data.labels[i],
                    //     });
                    // });
                    console.log(items)
                    return items


                   
                }
                
            }
            
        },
        // legend:false,
        responsive: true,
        tooltips:{
            bodyFontSize:30,
            backgroundColor: "#6F6B6A",
            position:"average",
            footerFontSize:10,
            bodyFontColor	:"#0C0B0A",
            displayColors:false,
            callbacks: {
                label: function(tooltipItem, data) {
                  //get the concerned dataset
                  var dataset = data.datasets[tooltipItem.datasetIndex];                  //calculate the total of this data set
                  var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                    return previousValue + currentValue;
                  });
                  //get the current items value
                  var currentValue = dataset.data[tooltipItem.index];
                  //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                  var percentage = Math.floor(((currentValue/total) * 100)+0.5);
                  return data.labels[tooltipItem.index] + ":" + percentage + "%";
                }
              }
            // callbacks: {
            //     label: function(tooltipItem,datasets) {
            //         console.log(datasets)
            //         return tooltipItem + " and so worth it !";
            //     }
            // }
        }
        // },legendCallback: function(chart) {
        //     let div = document.getElementById("legendPart")
        //     let ul = document.createElement("ul")
        //     div.appendChild(ul);
        //     let item = chart.data.datasets[0];
        //     for(let i = 0; i<item.data.length;i++){
        //         let li = document.createElement("li");
        //         let span1 = document.createElement("span");
        //         span1.setAttribute("class","chart-legend")
        //         span1.style.backgroundColor = item.backgroundColor[i]
        //         let span2 = document.createElement("span");
        //         span1.setAttribute("class","chart-legend-label-text")
        //         let forSpan2 = document.createTextNode(item.data[i])
        //         li.appendChild(span1);
        //         li.appendChild(span2);
        //         ul.appendChild(li);
        //     }
            



            // let legendHtml = [];
            // legendHtml.push('<ul>');
            // let item = chart.data.datasets[0];
            // for (var i=0; i < item.data.length; i++) {
            //     legendHtml.push('<li>');
            //     legendHtml.push('<span class="chart-legend" style="background-color:' + item.backgroundColor[i] +'"></span>');
            //     legendHtml.push('<span class="chart-legend-label-text">' + item.data[i] + ' person - '+chart.data.labels[i]+' times</span>');
            //     legendHtml.push('</li>');
            // }

            // legendHtml.push('</ul>');
            // console.log(legendHtml.join(""))
            // return legendHtml.join("");
        }
        
    })

document.getElementById("myChart").style.width = "800px"
document.getElementById("myChart").style.height = "500px"

}
createChart(mainObj,translatedObj)
