document.addEventListener('DOMContentLoaded', () => {
    const farmDataForm = document.getElementById('farm-data-form');
    const cropInput = document.getElementById('crop');
    const quantityInput = document.getElementById('quantity');
    const farmChartCtx = document.getElementById('farmChart').getContext('2d');

    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (name && email && password) {
                alert('Registration successful!');
                // You could also redirect to another page or clear the form here
                // window.location.href = 'login.html';
                registerForm.reset();
            } else {
                alert('Please fill all fields!');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Simple form validation
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email && password) {
                alert('Login successful!');
                // You could also redirect to another page or check credentials here
                // window.location.href = 'dashboard.html';
                loginForm.reset();
            } else {
                alert('Please enter both email and password!');
            }
        });
    }

    if (farmDataForm) {
        let farmData = {
            labels: [],
            quantities: []
        };

        farmDataForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let cropName = cropInput.value;
            let quantity = parseInt(quantityInput.value);

            if (cropName && quantity) {
                farmData.labels.push(cropName);
                farmData.quantities.push(quantity);
                updateChart();
                farmDataForm.reset(); // Clear the form after submission
            } else {
                alert('Please enter both crop name and quantity!');
            }
        });

        function updateChart() {
            new Chart(farmChartCtx, {
                type: 'bar',
                data: {
                    labels: farmData.labels,
                    datasets: [{
                        label: 'Crops Quantity',
                        data: farmData.quantities,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
});