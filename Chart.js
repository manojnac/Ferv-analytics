// scripts/Chart.js

// Dummy data for Visitor Trends (Line chart)
const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Visitors',
            data: [1500, 1800, 2200, 2400, 2700, 3000, 3500], // Dummy visitor data
            borderColor: '#4bc0c0',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        },
    ],
};

// Dummy data for Page Views (Bar chart)
const barChartData = {
    labels: ['Homepage', 'Product Page', 'Blog', 'Contact Us'],
    datasets: [
        {
            label: 'Page Views',
            data: [8000, 12000, 7000, 4500], // Dummy page view data
            backgroundColor: '#ff6384',
            borderColor: '#ff6384',
            borderWidth: 1,
        },
    ],
};

// Dummy data for Bounce Rate (Line chart)
const bounceRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Bounce Rate (%)',
            data: [40, 45, 50, 55, 60, 55, 50], // Dummy bounce rate data
            borderColor: '#ff9f40',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: true,
        },
    ],
};

// Dummy data for User Behavior (Pie chart)
const userBehaviorData = {
    labels: ['Active Users', 'Inactive Users', 'Returning Users'],
    datasets: [
        {
            data: [40, 30, 30], // Dummy user behavior data
            backgroundColor: ['#ffcd56', '#36a2eb', '#ff6384'],
            borderColor: '#fff',
            borderWidth: 1,
        },
    ],
};

// Create Line Chart for Visitor Trends
const ctxLine = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: lineChartData,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Visitor Trends Over Time',
            },
        },
    },
});

// Create Bar Chart for Page Views
const ctxBar = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: barChartData,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Page Views for Different Pages',
            },
        },
    },
});

// Create Line Chart for Bounce Rate
const ctxBounceRate = document.getElementById('bounceRateChart').getContext('2d');
const bounceRateChart = new Chart(ctxBounceRate, {
    type: 'line',
    data: bounceRateData,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Bounce Rate Over Time',
            },
        },
    },
});

// Create Pie Chart for User Behavior
const ctxUserBehavior = document.getElementById('userBehaviorChart').getContext('2d');
const userBehaviorChart = new Chart(ctxUserBehavior, {
    type: 'pie',
    data: userBehaviorData,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'User Behavior Distribution',
            },
        },
    },
});
