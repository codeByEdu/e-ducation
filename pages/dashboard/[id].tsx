import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import { useApi } from "@/service/api-service";
import { useRouter } from "next/router";
import { log } from 'console';
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


    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await apiGet('/escola/falta/' + id);

            const data = await response.data;
            console.log(data);
            const labels = data['disciplina'];
            const values = data['totalFaltas'];

            console.log({ labels });
            console.log({ values });
            const chartData: ChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Faltas do aluno por materia',
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
            <h1>Faltas do aluno</h1>
            <canvas id="chart" width="400" height="200"></canvas>
        </div>
    );
};

export default DashboardScreen;
