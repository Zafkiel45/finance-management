'use client'

import { BarElement,  CategoryScale, Chart, Colors, LinearScale,Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

Chart.register(CategoryScale, LinearScale, BarElement, Colors, Tooltip, Legend);
Chart.defaults.color = '#9E8EE8'


export const GraphContainer = () => {

    return (
        <section className="px-2 my-5 w-full">
            <Bar data={{
                labels: ['title 1', 'title 2', 'title 3'],
                datasets: [{
                    data: [23,33,12],
                    label: 'votos',
                    backgroundColor: "blue",
                    borderWidth: 1
                }],  
            }}
            options={{
                plugins: {
                    colors: {
                        forceOverride: true,
                        enabled: true
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                    },
                    y: {
                        grid: {
                            display: false 
                        }
                    }
                }
            }
            }/>
        </section>
    )
}