import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import { useApi } from "@/service/api-service";
import { useRouter } from "next/router";
interface DashboardData {
    labels: string[];
    values: number[];
}

const DashboardScreen: React.FC = () => {
    const chartRef = useRef<Chart | null>(null);
    const { apiGet } = useApi();
    const [turmas, setTurmas] = useState<[any]>();
    const router = useRouter();
    const { id } = router.query;

    async function listaTurmas() {
        const { data } = await apiGet("/escola/falta/" + id);
        setTurmas(data);
    }
    useEffect(() => {
        listaTurmas();
        turmas?.forEach((turma: any) => {
            fetchData(turma.codigo);
        });

    }, []);
    async function fetchData(codigo: any) {
        try {
            const response = await apiGet('/escola/turma/' + codigo);

            const data = await response.data.json();

            const labels = data['TotalConcluidas'];
            const values = data['TotalConcluidas'];

            const chartData: ChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Dashboard do Grafana',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ],
            };

            const chartOptions: ChartOptions = {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            };

            if (chartRef.current) {
                chartRef.current.data = chartData;
                chartRef.current.options = chartOptions;
                chartRef.current.update();
            } else {
                chartRef.current = new Chart('chart', {
                    type: 'bar',
                    data: chartData,
                    options: chartOptions,
                });
            }
        } catch (error) {
            console.error('Erro ao buscar os dados do Grafana:', error);
        }
    }

    return (
        <div>
            <h1>Dashboard do Grafana</h1>
            <canvas id="chart" width="400" height="200"></canvas>
        </div>
    );
};

export default DashboardScreen;
