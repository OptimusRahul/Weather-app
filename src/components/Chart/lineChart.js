import React from 'react';
import { Line } from 'react-chartjs-2';

const lineChart = props => {
    let lineChart;
    
    let today = new Date(1608577200 * 1000).toDateString();

    let error = false;

    if(props.date !== null) {
        let propsDate = new Date(props.date * 1000).getDate();
        let maxDate = new Date(props.location.hourly[47].dt * 1000).getDate();

        if(propsDate > maxDate) {
            error = true;
        } else {
            today = new Date(props.date * 1000).toDateString();
        }
    }

    if(!error) {
        const data = [];

        props.location.hourly.map((item) => {
            const currentDate = new Date(item.dt * 1000).toDateString();
            if(today === currentDate) {
                data.push(item);
            }
        })

        if(data.length === 1) {
            data.push(props.location.hourly[1]);
        }

        lineChart=(
            <Line
                height={200}
                width={900}
                data={{
                    labels: data.map(item => new Date(item.dt * 1000).getHours()),
                    datasets: [{
                        data: data.map(item => item.temp),
                        fill: false,
                        backgroundColor: 'blue',
                        borderColor: 'blue'
                    }]                
                }}

                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            display: false,
                        }],
                        xAxes: [{
                        display: true, 
                        stacked: true,                                   
                        }]
                    },
                    legend: {
                        display: false
                    }
                }}
            />
        )
    } else {
        lineChart = "OOPS!! No data to plot"
    }

    return (
        <div className="chartAreaWrapper">
            {lineChart}
        </div>
    )
}

export default lineChart;