
const ctx = document.getElementById("scatterPlot").getContext("2d");
const scatterPlot = new Chart(ctx, {
    type: "scatter",
    data: {
        datasets: [
            {
                label: "Scatter Dataset",
                data: [
                    { x: 5, y: 7 },
                    { x: 3, y: 2 },
                    { x: 8, y: 6 },
                    { x: 2, y: 4 },
                    { x: 7, y: 3 },
                    { x: 1, y: 8 },
                    { x: 6, y: 5 },
                    { x: 4, y: 9 },
                    { x: 9, y: 1 },
                    { x: 0, y: 0 }
                ],
                backgroundColor: "rgb(0, 0, 0)",
            },
        ],
    },
    options: {
        scales: {
            x: {
                type: "linear",
                position: "bottom",
                title: {
                    display: true,
                    text: "X Axis",
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Y Axis",
                }
            }
        },
    },
})