'use client'

import { BarElement,  CategoryScale, Chart, Colors, LinearScale, plugins } from "chart.js"
import { Bar } from "react-chartjs-2"

Chart.register(CategoryScale, LinearScale, BarElement, Colors);
Chart.defaults.color = '#3E63DD'


export const GraphContainer = () => {

    return (
        <section>
            <Bar data={{
                labels: ['title 1', 'title 2', 'title 3'],
                datasets: [{
                    data: [23,33,12],
                    label: 'votos',
                    backgroundColor: "blue"
                    
                }],  
            }}
            options={{
                plugins: {
                    colors: {
                        forceOverride: true,
                        enabled: true
                    }
                },
            }
            }/>
        </section>
    )
}