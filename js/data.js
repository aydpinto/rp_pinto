// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // CSV data
    const csvData = `plant,CONTROL,G1,G2,G3
Plant 1,0.7089,0.2326,0.1034,0.0885
Plant 2,0.4511,0.2574,0.2034,0.0902
Plant 3,0.6346,0.4730,0.1093,0.0375
Plant 4,0.5998,0.3970,0.1725,0.0445
Plant 5,0.5642,0.1784,0.1661,0.0372
Plant 6,0.4122,0.1428,0.0229,0.0172
Average,0.5618,0.2802,0.1296,0.0525`;

    // Function to parse CSV data
    function parseCSV(csv) {
        const lines = csv.split('\n');
        const data = [];
        
        for (let i = 1; i < lines.length - 1; i++) { // Exclude the average row
            const values = lines[i].split(',');
            data.push({
                plant: values[0],
                CONTROL: parseFloat(values[1]),
                G1: parseFloat(values[2]),
                G2: parseFloat(values[3]),
                G3: parseFloat(values[4])
            });
        }
        
        return data;
    }

    // Parse the CSV data
    const chartData = parseCSV(csvData);

    // Prepare data for Chart.js
    const labels = chartData.map(row => row.plant);
    const datasets = [
        {
            label: 'Control',
            data: chartData.map(row => row.CONTROL),
            borderColor: 'rgb(37, 99, 235)',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.1
        },
        {
            label: 'Group 1 (33% Coconut Milk)',
            data: chartData.map(row => row.G1),
            borderColor: 'rgb(22, 163, 74)',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            tension: 0.1
        },
        {
            label: 'Group 2 (66% Coconut Milk)',
            data: chartData.map(row => row.G2),
            borderColor: 'rgb(220, 38, 38)',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            tension: 0.1
        },
        {
            label: 'Group 3 (100% Coconut Milk)',
            data: chartData.map(row => row.G3),
            borderColor: 'rgb(147, 51, 234)',
            backgroundColor: 'rgba(147, 51, 234, 0.1)',
            tension: 0.1
        }
    ];

    // Create the chart
    const ctx = document.getElementById('biomassChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Ocimum Basilicum Biomass by Coconut Milk Concentration',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(3)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 0.8,
                    title: {
                        display: true,
                        text: 'Biomass (g)',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Plant Sample',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
});