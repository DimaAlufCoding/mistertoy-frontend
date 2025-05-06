import React from 'react';
import { Chart as ChartJS, ArcElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function Dashboard() {
    const toys = [
        { _id: "t101", price: 123, labels: ["Doll", "Battery Powered", "Baby"], inStock: true },
        { _id: "t102", price: 99, labels: ["On wheels", "Battery Powered", "Outdoor"], inStock: true },
        { _id: "t103", price: 45, labels: ["Box game", "Baby"], inStock: true },
        { _id: "t104", price: 65, labels: ["Puzzle", "Art"], inStock: false },
        { _id: "t105", price: 79, labels: ["Art"], inStock: true },
        { _id: "t106", price: 20, labels: ["Baby"], inStock: true },
        { _id: "t107", price: 150, labels: ["Outdoor"], inStock: false },
        { _id: "t108", price: 200, labels: ["On wheels", "Battery Powered"], inStock: true },
        { _id: "t109", price: 300, labels: ["Baby", "Doll"], inStock: true },
        { _id: "t110", price: 89, labels: ["Box game"], inStock: true },
    ];

    const labelPriceMap = {};
    const labelTotalCount = {};
    const labelInStockCount = {};

    toys.forEach(toy => {
        toy.labels.forEach(label => {
            labelPriceMap[label] = (labelPriceMap[label] || 0) + toy.price;
            labelTotalCount[label] = (labelTotalCount[label] || 0) + 1;
            if (toy.inStock) {
                labelInStockCount[label] = (labelInStockCount[label] || 0) + 1;
            }
        });
    });

    const labels = Object.keys(labelPriceMap);

    const pricesPerLabelData = {
        labels,
        datasets: [
            {
                label: 'Total Price per Label',
                data: labels.map(label => labelPriceMap[label]),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#C9CBCF', '#FF6666', '#66FF66'
                ],
                borderColor: '#fff',
                borderWidth: 1
            }
        ]
    };

    const inventoryPerLabelData = {
        labels,
        datasets: [
            {
                label: '% In Stock per Label',
                data: labels.map(label => {
                    const total = labelTotalCount[label];
                    const inStock = labelInStockCount[label] || 0;
                    return ((inStock / total) * 100).toFixed(1);
                }),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#C9CBCF', '#FF6666', '#66FF66'
                ],
                borderColor: '#fff',
                borderWidth: 1
            }
        ]
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', padding: '20px' }}>
            <div style={{ width: '400px' }}>
                <h3 style={{ textAlign: 'center' }}>Prices per Label</h3>
                <Pie data={pricesPerLabelData} />
            </div>
            <div style={{ width: '400px' }}>
                <h3 style={{ textAlign: 'center' }}>Inventory by Label (% In Stock)</h3>
                <Pie data={inventoryPerLabelData} />
            </div>
        </div>
    );
}
