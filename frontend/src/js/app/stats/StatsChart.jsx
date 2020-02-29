import React from 'react';
import Chart from "chart.js";

export class StatsChart extends React.Component {
    chartRef = React.createRef();

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {
        const {data} = this.props;
        if (!data) return null;

        const lbls = data.map(rec => rec.date);
        const vals = data.map(rec => rec.day);
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: lbls,
                datasets: [
                    {
                        label: "За день",
                        data: vals,
                    }
                ]
            },
            options: { }
        });
    }

    render() {


        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }

}
