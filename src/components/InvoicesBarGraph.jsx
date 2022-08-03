import React from "react";

import { Grid } from "@material-ui/core";
import { Bar } from "react-chartjs-2";

const InvoicesBarGraph = ({ data, label }) => {
    const barData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: "Total Invoicing Amount",
                data: Object.values(data),
                backgroundColor: ["rgba(244, 67, 54, 0.5)"],
            },
        ],
    };
    return (
        <div style={{ margin: "30px auto", padding: "10px 20px 20px 20px" }}>
            <div>
                <Grid
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    style={{ margin: "15px 0 10px 20px", fontSize: "20px", lineHeight: "32px", fontWeight: "500" }}
                >
                    {label}
                </Grid>
                <Bar
                    height={100}
                    data={barData}
                    options={{
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        precision: 0,
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default InvoicesBarGraph;
