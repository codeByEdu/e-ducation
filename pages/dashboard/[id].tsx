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
        geraTotalFaltas();
        // geraPorcentagemFaltas();
    }, []);

    async function geraTotalFaltas() {
        try {
            const response = await apiGet('/escola/falta/' + id);

            const data = await response.data;
            console.log(data);
            const labels = data.map((turma: any) => turma.disciplina);
            const values = data.map((turma: any) => turma.totalFaltas);

            const chartData: ChartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Total de faltas',
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
            console.error('Erro ao buscar os dados da API:', error);
        }
    }
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    return (
        <div>
            <h1>Faltas do aluno</h1>
            <canvas id="chart" width="400" height="200"></canvas>
            {/* <canvas id="chartP" width="400" height="200"></canvas> */}
        </div>
    );
};

export default DashboardScreen;
