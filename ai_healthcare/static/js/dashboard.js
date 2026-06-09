/* ==================== DASHBOARD JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard features
    initializeDashboard();
    initializeCharts();
    initializeVitalSigns();
    initializeModals();
    initializeEventListeners();
});

/* ==================== INITIALIZATION FUNCTIONS ==================== */

function initializeDashboard() {
    console.log('Dashboard initialized');
    updateDateTime();
    setInterval(updateDateTime, 60000);
}

function updateDateTime() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        dateElement.textContent = today;
    }
}

/* ==================== VITAL SIGNS MANAGEMENT ==================== */

function initializeVitalSigns() {
    const vitalItems = document.querySelectorAll('.vital-item');
    
    vitalItems.forEach(item => {
        const value = parseInt(item.querySelector('.vital-value').textContent);
        const label = item.querySelector('.vital-label').textContent.toLowerCase();
        
        // Set status based on vital sign
        updateVitalStatus(item, label, value);
        
        // Add click handler for details
        item.addEventListener('click', function() {
            showVitalDetails(label, value, item);
        });
    });
}

function updateVitalStatus(element, label, value) {
    const statusDot = element.querySelector('.vital-status');
    if (!statusDot) return;
    
    let isNormal = true;
    
    // Define normal ranges for different vital signs
    const ranges = {
        'heart rate': { min: 60, max: 100 },
        'blood pressure': { min: 90, max: 140 }, // systolic
        'temperature': { min: 36, max: 37.5 },
        'oxygen level': { min: 95, max: 100 },
        'glucose level': { min: 70, max: 100 }
    };
    
    if (ranges[label]) {
        const range = ranges[label];
        if (value < range.min || value > range.max) {
            isNormal = false;
        }
    }
    
    if (isNormal) {
        statusDot.className = 'vital-status';
    } else if (value > 150 || value < 50) {
        statusDot.className = 'vital-status critical';
    } else {
        statusDot.className = 'vital-status warning';
    }
}

function showVitalDetails(label, value, element) {
    const message = `${label.toUpperCase()}\n\nCurrent Value: ${value}\n\nLast Updated: ${new Date().toLocaleTimeString()}\n\nStatus: ${getVitalStatus(label, value)}`;
    
    // Create and show notification
    showNotification(label, message, getStatusColor(label, value));
}

function getVitalStatus(label, value) {
    const ranges = {
        'heart rate': { min: 60, max: 100 },
        'blood pressure': { min: 90, max: 140 },
        'temperature': { min: 36, max: 37.5 },
        'oxygen level': { min: 95, max: 100 },
        'glucose level': { min: 70, max: 100 }
    };
    
    if (ranges[label]) {
        const range = ranges[label];
        if (value < range.min) return 'Low';
        if (value > range.max) return 'High';
    }
    return 'Normal';
}

function getStatusColor(label, value) {
    if (value > 150 || value < 50) return 'danger';
    if (value > 120 || value < 70) return 'warning';
    return 'success';
}

/* ==================== CHARTS INITIALIZATION ==================== */

function initializeCharts() {
    initializeHealthChart();
}

function initializeHealthChart() {
    const ctx = document.getElementById('healthChart');
    if (!ctx) return;
    
    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Health Score',
                data: [65, 70, 72, 75, 78, 82, 89],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 7,
            },
            {
                label: 'Activity Level',
                data: [50, 60, 55, 70, 75, 80, 85],
                borderColor: '#43cea2',
                backgroundColor: 'rgba(67, 206, 162, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#43cea2',
                borderDash: [5, 5],
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#555',
                    font: { size: 14, weight: 'bold' },
                    usePointStyle: true,
                    padding: 20
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: { color: '#999' },
                grid: { color: 'rgba(0, 0, 0, 0.05)' }
            },
            x: {
                ticks: { color: '#999' },
                grid: { display: false }
            }
        }
    };

    try {
        new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: options
        });
    } catch (error) {
        console.error('Error initializing chart:', error);
    }
}

/* ==================== MEDICATION MANAGEMENT ==================== */

function markMedicationAsCompleted(button) {
    const medicationItem = button.closest('.medication-item');
    const status = medicationItem.querySelector('.medication-status');
    
    if (status.classList.contains('status-completed')) {
        status.textContent = '⏱️ Pending';
        status.className = 'medication-status status-pending';
    } else {
        status.textContent = '✓ Completed';
        status.className = 'medication-status status-completed';
        showNotification('Success', 'Medication marked as completed!', 'success');
    }
}

/* ==================== APPOINTMENT MANAGEMENT ==================== */

function scheduleAppointment() {
    const doctorName = document.getElementById('doctorName');
    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentTime = document.getElementById('appointmentTime');
    
    if (doctorName && appointmentDate && appointmentTime) {
        if (doctorName.value && appointmentDate.value && appointmentTime.value) {
            showNotification(
                'Appointment Scheduled',
                `Appointment with ${doctorName.value} on ${appointmentDate.value} at ${appointmentTime.value}`,
                'success'
            );
            closeModal('appointmentModal');
        } else {
            showNotification('Error', 'Please fill all fields', 'danger');
        }
    }
}

function bookAppointmentWithDoctor(doctorName) {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        const doctorInput = document.getElementById('doctorName');
        if (doctorInput) doctorInput.value = doctorName;
        
        const bootstrap = window.bootstrap;
        if (bootstrap) {
            new bootstrap.Modal(modal).show();
        }
    }
}

/* ==================== MODAL MANAGEMENT ==================== */

function initializeModals() {
    // Modal close handlers
    document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(element => {
        element.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal && window.bootstrap) {
                bootstrap.Modal.getInstance(modal)?.hide();
            }
        });
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal && window.bootstrap) {
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) bootstrapModal.hide();
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal && window.bootstrap) {
        new bootstrap.Modal(modal).show();
    }
}

/* ==================== NOTIFICATION SYSTEM ==================== */

function showNotification(title, message, type = 'info') {
    const notificationContainer = getOrCreateNotificationContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        z-index: 10000;
        animation: slideUp 0.5s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    const iconMap = {
        success: '<i class="fas fa-check-circle"></i>',
        danger: '<i class="fas fa-exclamation-circle"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>',
        info: '<i class="fas fa-info-circle"></i>'
    };
    
    alert.innerHTML = `
        <strong>${iconMap[type]} ${title}</strong>
        <p style="margin-bottom: 0; margin-top: 5px; font-size: 13px;">${message}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    notificationContainer.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

function getOrCreateNotificationContainer() {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        document.body.appendChild(container);
    }
    return container;
}

/* ==================== EVENT LISTENERS ==================== */

function initializeEventListeners() {
    // Quick action buttons
    document.querySelectorAll('[data-quick-action]').forEach(button => {
        button.addEventListener('click', function() {
            handleQuickAction(this.dataset.quickAction);
        });
    });
    
    // Medication checkboxes
    document.querySelectorAll('.medication-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            markMedicationAsCompleted(this);
        });
    });
    
    // Filter buttons
    document.querySelectorAll('[data-filter]').forEach(button => {
        button.addEventListener('click', function() {
            filterContent(this.dataset.filter);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('dashboardSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            searchDashboard(this.value);
        }, 300));
    }
}

function handleQuickAction(action) {
    const actions = {
        'upload-report': () => window.location.href = '/upload/',
        'book-appointment': () => openModal('appointmentModal'),
        'view-labs': () => showNotification('Info', 'Lab results feature coming soon!', 'info'),
        'emergency': () => handleEmergency()
    };
    
    if (actions[action]) {
        actions[action]();
    }
}

function handleEmergency() {
    if (confirm('Are you sure you want to trigger an emergency alert?')) {
        showNotification('Emergency Alert', 'Emergency services have been notified. Help is on the way!', 'danger');
        // Here you could send an API request to notify emergency services
    }
}

function filterContent(filter) {
    const items = document.querySelectorAll('[data-item]');
    items.forEach(item => {
        if (filter === 'all' || item.dataset.item === filter) {
            item.style.display = 'block';
            item.style.animation = 'slideUp 0.3s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update active filter button
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`)?.classList.add('active');
}

function searchDashboard(query) {
    if (!query) return;
    
    console.log('Searching for:', query);
    // Implement search logic here
    showNotification('Search', `Searching for "${query}"...`, 'info');
}

/* ==================== UTILITY FUNCTIONS ==================== */

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/* ==================== DATA REFRESH ==================== */

function refreshVitalSigns() {
    const vitalItems = document.querySelectorAll('.vital-item');
    vitalItems.forEach(item => {
        // Simulate data refresh with slight variation
        const value = parseInt(item.querySelector('.vital-value').textContent);
        const variation = (Math.random() - 0.5) * 10;
        const newValue = Math.round(value + variation);
        item.querySelector('.vital-value').textContent = newValue;
        
        const label = item.querySelector('.vital-label').textContent.toLowerCase();
        updateVitalStatus(item, label, newValue);
    });
    
    showNotification('Updated', 'Vital signs refreshed', 'success');
}

// Auto-refresh vital signs every 5 minutes
setInterval(function() {
    if (document.querySelector('.vital-item')) {
        refreshVitalSigns();
    }
}, 300000);

/* ==================== EXPORT FUNCTIONS ==================== */

function exportDashboardData() {
    const data = {
        timestamp: new Date().toISOString(),
        vitals: getVitalSignsData(),
        metrics: getMetricsData()
    };
    
    const json = JSON.stringify(data, null, 2);
    downloadJSON('health-data.json', json);
    showNotification('Success', 'Health data exported successfully!', 'success');
}

function getVitalSignsData() {
    const vitals = {};
    document.querySelectorAll('.vital-item').forEach(item => {
        const label = item.querySelector('.vital-label').textContent;
        const value = item.querySelector('.vital-value').textContent;
        vitals[label] = value;
    });
    return vitals;
}

function getMetricsData() {
    const metrics = {};
    document.querySelectorAll('.stat-card').forEach(card => {
        const label = card.querySelector('.stat-label')?.textContent;
        const value = card.querySelector('.stat-value')?.textContent;
        if (label && value) {
            metrics[label] = value;
        }
    });
    return metrics;
}

function downloadJSON(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

console.log('Dashboard JavaScript loaded successfully');
