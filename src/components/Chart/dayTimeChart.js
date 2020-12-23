import React from 'react';

import { Line } from 'react-chartjs-2';

const dayTimeChart = props => {
    let lineChart;
    
    lineChart=(
        <Line 
            data={{
                labels: [0, 1, 2, 3, 4, 5, 6],
                datasets: [{
                    data: [0, 0, 1, 2, 1, 0, 0],
                    fill: true,
                    backgroundColor: '#fed8b1',
                    borderColor: 'orange'
                },
            ]             
            }}

            options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        display: false,
                    }],
                    xAxes: [{
                        display: false,
                        
                    }]
                },
                plugins: {
                    filler: {
                        propagate: true
                    }
                },
                legend: {
                    display: false
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }}
        />
    )

    return (
        <>
            <div className="test" style={{ margin: '2rem 0', overflowX: 'hidden' }}>
                {lineChart}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', overflowX: 'hidden' }}>
                <h5>6AM</h5>
                <h5>1PM</h5>
                <h5>8PM</h5>
            </div>
        </>
    )
}

export default dayTimeChart;