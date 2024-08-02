'use client'

// chart
import { BarElement,  CategoryScale, Chart, Colors, LinearScale,Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

Chart.register(CategoryScale, LinearScale, BarElement, Colors, Tooltip, Legend);
Chart.defaults.color = '#9E8EE8'

// database: 
import { retrieveStoreToWrite } from "@/app/(utils)/retriveStoreDB";
import { useState, useEffect, useContext } from "react";
import { TRIGGER_CONTEXT } from "@/app/(context)/trigger";

export const GraphContainer = () => {

    const [labels, setLabels] = useState<any>([]);
    const [dataValues, setDataValues] = useState<number[]>([]);

    const trigger = useContext(TRIGGER_CONTEXT);

    if(!trigger) {
        throw new Error("Erro no gráfico");
    };
 
    useEffect(() => {
        const db_set_values = async () => {
            try {
                const db_store = await retrieveStoreToWrite('finances');
                const db_value = db_store.get(2);

                db_value.onsuccess = () => {
                    const db_result = db_value.result;

                    const name_array = db_result.categories.map((item: any) => {
                        return item.nome;
                    });
                    const gastos_array = db_result.categories.map((item: any) => {
                        return item.gastos;
                    });

                    setDataValues(gastos_array);
                    setLabels(name_array);
                }
            } catch (err) {
                console.error("ocorre um erro", err);
            }
        };

        db_set_values();
    }, [trigger.trigger])

    return (
        <section className="px-2 my-5 w-full">
            <Bar data={{
                labels: labels,
                datasets: [{
                    data: dataValues,
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