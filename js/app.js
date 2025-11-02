// Data Management
let competitors = [];
let features = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateDashboard();
    renderCompetitors();
    renderFeatureMatrix();
    renderPricingTable();
    updateSWOTSelect();
});

// Load data from localStorage
function loadData() {
    const savedCompetitors = localStorage.getItem('competitors');
    const savedFeatures = localStorage.getItem('features');

    if (savedCompetitors) {
        competitors = JSON.parse(savedCompetitors);
    }

    if (savedFeatures) {
        features = JSON.parse(savedFeatures);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('competitors', JSON.stringify(competitors));
    localStorage.setItem('features', JSON.stringify(features));
}

// Tab Navigation
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked button
    event.target.closest('.tab-btn').classList.add('active');

    // Refresh specific tab content
    if (tabName === 'positioning') {
        renderPositioningMap();
    }
}

// Modal Management
function showAddCompetitorModal() {
    document.getElementById('addCompetitorModal').classList.add('active');
}

function showAddFeatureModal() {
    document.getElementById('addFeatureModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    // Reset forms
    if (modalId === 'addCompetitorModal') {
        document.getElementById('competitorForm').reset();
    } else if (modalId === 'addFeatureModal') {
        document.getElementById('featureForm').reset();
    } else if (modalId === 'editCompetitorModal') {
        document.getElementById('editCompetitorForm').reset();
    }
}

// Add Competitor
function addCompetitor(event) {
    event.preventDefault();

    const competitor = {
        id: Date.now(),
        name: document.getElementById('companyName').value,
        website: document.getElementById('website').value,
        marketShare: parseFloat(document.getElementById('marketShare').value) || 0,
        foundedYear: parseInt(document.getElementById('foundedYear').value) || null,
        rating: parseFloat(document.getElementById('rating').value) || 0,
        employees: parseInt(document.getElementById('employees').value) || 0,
        pricingModel: document.getElementById('pricingModel').value,
        startingPrice: document.getElementById('startingPrice').value,
        targetMarket: document.getElementById('targetMarket').value,
        strengths: document.getElementById('strengths').value,
        weaknesses: document.getElementById('weaknesses').value,
        notes: document.getElementById('notes').value,
        features: {},
        swot: {
            strengths: document.getElementById('strengths').value,
            weaknesses: document.getElementById('weaknesses').value,
            opportunities: '',
            threats: ''
        },
        positioning: {
            price: Math.random() * 100,
            quality: Math.random() * 100,
            features: Math.random() * 100,
            innovation: Math.random() * 100,
            marketShare: parseFloat(document.getElementById('marketShare').value) || Math.random() * 100,
            customerSatisfaction: parseFloat(document.getElementById('rating').value) * 20 || Math.random() * 100
        }
    };

    competitors.push(competitor);
    saveData();

    closeModal('addCompetitorModal');
    updateDashboard();
    renderCompetitors();
    renderFeatureMatrix();
    renderPricingTable();
    updateSWOTSelect();

    showNotification('Competitor added successfully!', 'success');
}

// Edit Competitor
function editCompetitor(id) {
    const competitor = competitors.find(c => c.id === id);
    if (!competitor) return;

    document.getElementById('editCompetitorId').value = id;
    document.getElementById('editCompanyName').value = competitor.name;
    document.getElementById('editWebsite').value = competitor.website || '';
    document.getElementById('editMarketShare').value = competitor.marketShare || '';
    document.getElementById('editFoundedYear').value = competitor.foundedYear || '';
    document.getElementById('editRating').value = competitor.rating || '';
    document.getElementById('editEmployees').value = competitor.employees || '';
    document.getElementById('editPricingModel').value = competitor.pricingModel || '';
    document.getElementById('editStartingPrice').value = competitor.startingPrice || '';
    document.getElementById('editTargetMarket').value = competitor.targetMarket || '';
    document.getElementById('editStrengths').value = competitor.strengths || '';
    document.getElementById('editWeaknesses').value = competitor.weaknesses || '';
    document.getElementById('editNotes').value = competitor.notes || '';

    document.getElementById('editCompetitorModal').classList.add('active');
}

// Update Competitor
function updateCompetitor(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById('editCompetitorId').value);
    const competitor = competitors.find(c => c.id === id);

    if (competitor) {
        competitor.name = document.getElementById('editCompanyName').value;
        competitor.website = document.getElementById('editWebsite').value;
        competitor.marketShare = parseFloat(document.getElementById('editMarketShare').value) || 0;
        competitor.foundedYear = parseInt(document.getElementById('editFoundedYear').value) || null;
        competitor.rating = parseFloat(document.getElementById('editRating').value) || 0;
        competitor.employees = parseInt(document.getElementById('editEmployees').value) || 0;
        competitor.pricingModel = document.getElementById('editPricingModel').value;
        competitor.startingPrice = document.getElementById('editStartingPrice').value;
        competitor.targetMarket = document.getElementById('editTargetMarket').value;
        competitor.strengths = document.getElementById('editStrengths').value;
        competitor.weaknesses = document.getElementById('editWeaknesses').value;
        competitor.notes = document.getElementById('editNotes').value;

        // Update positioning data
        competitor.positioning.marketShare = competitor.marketShare;
        competitor.positioning.customerSatisfaction = competitor.rating * 20;

        saveData();
        closeModal('editCompetitorModal');
        updateDashboard();
        renderCompetitors();
        renderFeatureMatrix();
        renderPricingTable();

        showNotification('Competitor updated successfully!', 'success');
    }
}

// Delete Competitor
function deleteCompetitor(id) {
    if (confirm('Are you sure you want to delete this competitor?')) {
        competitors = competitors.filter(c => c.id !== id);
        saveData();

        updateDashboard();
        renderCompetitors();
        renderFeatureMatrix();
        renderPricingTable();
        updateSWOTSelect();

        showNotification('Competitor deleted successfully!', 'success');
    }
}

// Add Feature
function addFeature(event) {
    event.preventDefault();

    const feature = {
        id: Date.now(),
        name: document.getElementById('featureName').value,
        category: document.getElementById('featureCategory').value,
        description: document.getElementById('featureDescription').value
    };

    features.push(feature);
    saveData();

    closeModal('addFeatureModal');
    renderFeatureMatrix();
    updateDashboard();

    showNotification('Feature added successfully!', 'success');
}

// Delete Feature
function deleteFeature(id) {
    if (confirm('Are you sure you want to delete this feature?')) {
        features = features.filter(f => f.id !== id);

        // Remove feature from all competitors
        competitors.forEach(comp => {
            delete comp.features[id];
        });

        saveData();
        renderFeatureMatrix();
        updateDashboard();

        showNotification('Feature deleted successfully!', 'success');
    }
}

// Toggle Feature for Competitor
function toggleFeature(competitorId, featureId) {
    const competitor = competitors.find(c => c.id === competitorId);
    if (!competitor) return;

    if (!competitor.features) {
        competitor.features = {};
    }

    const currentValue = competitor.features[featureId] || 'no';

    // Cycle through: no -> yes -> partial -> no
    if (currentValue === 'no') {
        competitor.features[featureId] = 'yes';
    } else if (currentValue === 'yes') {
        competitor.features[featureId] = 'partial';
    } else {
        competitor.features[featureId] = 'no';
    }

    saveData();
    renderFeatureMatrix();
}

// Update Dashboard
function updateDashboard() {
    // Total competitors
    document.getElementById('totalCompetitors').textContent = competitors.length;

    // Total features
    document.getElementById('totalFeatures').textContent = features.length;

    // Average rating
    if (competitors.length > 0) {
        const avgRating = competitors.reduce((sum, c) => sum + (c.rating || 0), 0) / competitors.length;
        document.getElementById('avgRating').textContent = avgRating.toFixed(1);
    } else {
        document.getElementById('avgRating').textContent = '-';
    }

    // Market leader
    if (competitors.length > 0) {
        const leader = competitors.reduce((max, c) =>
            (c.marketShare || 0) > (max.marketShare || 0) ? c : max
        );
        document.getElementById('marketLeader').textContent = leader.name;
    } else {
        document.getElementById('marketLeader').textContent = '-';
    }

    // Competitor overview
    renderCompetitorOverview();
}

// Render Competitor Overview
function renderCompetitorOverview() {
    const container = document.getElementById('competitorOverview');

    if (competitors.length === 0) {
        container.innerHTML = '<p class="empty-state">No competitors added yet. Click "Add Competitor" to get started!</p>';
        return;
    }

    const html = competitors.slice(0, 5).map(comp => `
        <div class="overview-item">
            <h4>${comp.name}</h4>
            <div class="overview-info">
                <span><strong>Market Share:</strong> ${comp.marketShare || 0}%</span>
                <span><strong>Rating:</strong> ${comp.rating || 'N/A'}</span>
                <span><strong>Pricing:</strong> ${comp.startingPrice || 'N/A'}</span>
                <span><strong>Model:</strong> ${comp.pricingModel || 'N/A'}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
}

// Render Competitors
function renderCompetitors() {
    const container = document.getElementById('competitorList');

    if (competitors.length === 0) {
        container.innerHTML = '<p class="empty-state">No competitors added yet.</p>';
        return;
    }

    const html = competitors.map(comp => `
        <div class="competitor-card">
            <div class="competitor-header">
                <div>
                    <div class="competitor-name">${comp.name}</div>
                    ${comp.website ? `<a href="${comp.website}" target="_blank" class="competitor-website">${comp.website}</a>` : ''}
                </div>
                <div class="competitor-actions">
                    <button class="btn btn-secondary btn-small" onclick="editCompetitor(${comp.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteCompetitor(${comp.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>

            <div class="competitor-info">
                <div class="info-item">
                    <div class="info-label">Market Share</div>
                    <div class="info-value">${comp.marketShare || 0}%</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Rating</div>
                    <div class="info-value">${comp.rating ? '⭐ ' + comp.rating : 'N/A'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Employees</div>
                    <div class="info-value">${comp.employees ? comp.employees.toLocaleString() : 'N/A'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Founded</div>
                    <div class="info-value">${comp.foundedYear || 'N/A'}</div>
                </div>
            </div>

            ${comp.targetMarket || comp.pricingModel || comp.startingPrice ? `
                <div class="competitor-details">
                    ${comp.targetMarket ? `
                        <div class="detail-section">
                            <div class="detail-label">Target Market</div>
                            <div class="detail-text">${comp.targetMarket}</div>
                        </div>
                    ` : ''}
                    ${comp.pricingModel || comp.startingPrice ? `
                        <div class="detail-section">
                            <div class="detail-label">Pricing</div>
                            <div class="detail-text">${comp.startingPrice || ''} ${comp.pricingModel ? '(' + comp.pricingModel + ')' : ''}</div>
                        </div>
                    ` : ''}
                    ${comp.strengths ? `
                        <div class="detail-section">
                            <div class="detail-label">Strengths</div>
                            <div class="detail-text">${comp.strengths}</div>
                        </div>
                    ` : ''}
                    ${comp.weaknesses ? `
                        <div class="detail-section">
                            <div class="detail-label">Weaknesses</div>
                            <div class="detail-text">${comp.weaknesses}</div>
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');

    container.innerHTML = html;
}

// Render Feature Matrix
function renderFeatureMatrix() {
    const container = document.getElementById('featureMatrix');

    if (competitors.length === 0 || features.length === 0) {
        container.innerHTML = '<p class="empty-state">Add competitors and features to build your comparison matrix.</p>';
        return;
    }

    let html = '<table><thead><tr><th>Feature</th>';
    competitors.forEach(comp => {
        html += `<th>${comp.name}</th>`;
    });
    html += '<th>Actions</th></tr></thead><tbody>';

    // Group features by category
    const categories = [...new Set(features.map(f => f.category))];

    categories.forEach(category => {
        const categoryFeatures = features.filter(f => f.category === category);

        html += `<tr><td colspan="${competitors.length + 2}" style="background: var(--bg-tertiary); font-weight: 700; text-transform: capitalize;">${category}</td></tr>`;

        categoryFeatures.forEach(feature => {
            html += `<tr><td><strong>${feature.name}</strong>${feature.description ? '<br><small style="color: var(--text-secondary);">' + feature.description + '</small>' : ''}</td>`;

            competitors.forEach(comp => {
                const status = comp.features?.[feature.id] || 'no';
                const icon = status === 'yes' ? '✓' : status === 'partial' ? '◐' : '✗';
                html += `<td class="feature-check ${status}" onclick="toggleFeature(${comp.id}, ${feature.id})" style="cursor: pointer;" title="Click to change">${icon}</td>`;
            });

            html += `<td><button class="btn btn-danger btn-small" onclick="deleteFeature(${feature.id})"><i class="fas fa-trash"></i></button></td></tr>`;
        });
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Render Pricing Table
function renderPricingTable() {
    const container = document.getElementById('pricingTable');

    if (competitors.length === 0) {
        container.innerHTML = '<p class="empty-state">Add competitors with pricing information to see comparison.</p>';
        return;
    }

    let html = '<table><thead><tr><th>Company</th><th>Pricing Model</th><th>Starting Price</th><th>Target Market</th></tr></thead><tbody>';

    competitors.forEach(comp => {
        html += `
            <tr>
                <td><strong>${comp.name}</strong></td>
                <td>${comp.pricingModel || 'N/A'}</td>
                <td>${comp.startingPrice || 'N/A'}</td>
                <td>${comp.targetMarket || 'N/A'}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Update SWOT Select
function updateSWOTSelect() {
    const select = document.getElementById('swotCompetitorSelect');

    select.innerHTML = '<option value="">Select a competitor...</option>';
    competitors.forEach(comp => {
        select.innerHTML += `<option value="${comp.id}">${comp.name}</option>`;
    });
}

// Load SWOT
function loadSWOT() {
    const competitorId = parseInt(document.getElementById('swotCompetitorSelect').value);
    const container = document.getElementById('swotContainer');

    if (!competitorId) {
        container.innerHTML = '<p class="empty-state">Select a competitor to view or edit SWOT analysis.</p>';
        return;
    }

    const competitor = competitors.find(c => c.id === competitorId);
    if (!competitor) return;

    if (!competitor.swot) {
        competitor.swot = {
            strengths: competitor.strengths || '',
            weaknesses: competitor.weaknesses || '',
            opportunities: '',
            threats: ''
        };
    }

    const html = `
        <div class="swot-box strengths">
            <h3><i class="fas fa-plus-circle"></i> Strengths</h3>
            <textarea id="swotStrengths" placeholder="Internal positive attributes...">${competitor.swot.strengths || ''}</textarea>
        </div>
        <div class="swot-box weaknesses">
            <h3><i class="fas fa-minus-circle"></i> Weaknesses</h3>
            <textarea id="swotWeaknesses" placeholder="Internal limitations...">${competitor.swot.weaknesses || ''}</textarea>
        </div>
        <div class="swot-box opportunities">
            <h3><i class="fas fa-lightbulb"></i> Opportunities</h3>
            <textarea id="swotOpportunities" placeholder="External favorable factors...">${competitor.swot.opportunities || ''}</textarea>
        </div>
        <div class="swot-box threats">
            <h3><i class="fas fa-exclamation-triangle"></i> Threats</h3>
            <textarea id="swotThreats" placeholder="External challenges...">${competitor.swot.threats || ''}</textarea>
        </div>
    `;

    container.innerHTML = html + `
        <div class="swot-actions">
            <button class="btn btn-primary" onclick="saveSWOT()">
                <i class="fas fa-save"></i> Save SWOT Analysis
            </button>
        </div>
    `;
}

// Save SWOT
function saveSWOT() {
    const competitorId = parseInt(document.getElementById('swotCompetitorSelect').value);
    const competitor = competitors.find(c => c.id === competitorId);

    if (!competitor) return;

    competitor.swot = {
        strengths: document.getElementById('swotStrengths').value,
        weaknesses: document.getElementById('swotWeaknesses').value,
        opportunities: document.getElementById('swotOpportunities').value,
        threats: document.getElementById('swotThreats').value
    };

    saveData();
    showNotification('SWOT analysis saved successfully!', 'success');
}

// Render Positioning Map
function renderPositioningMap() {
    const canvas = document.getElementById('positioningCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const container = canvas.parentElement;
    canvas.width = container.clientWidth - 40;
    canvas.height = container.clientHeight - 40;

    const width = canvas.width;
    const height = canvas.height;

    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (competitors.length === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Add competitors to see positioning map', width / 2, height / 2);
        return;
    }

    // Get selected axes
    const xAxis = document.getElementById('xAxisSelect').value;
    const yAxis = document.getElementById('yAxisSelect').value;

    // Draw axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;

    // X axis
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Draw grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(padding, padding + (chartHeight / 4) * i);
        ctx.lineTo(width - padding, padding + (chartHeight / 4) * i);
        ctx.stroke();

        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(padding + (chartWidth / 4) * i, padding);
        ctx.lineTo(padding + (chartWidth / 4) * i, height - padding);
        ctx.stroke();
    }

    // Draw axis labels
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';

    // X axis label
    ctx.fillText(xAxis.charAt(0).toUpperCase() + xAxis.slice(1).replace(/([A-Z])/g, ' $1'), width / 2, height - 20);

    // Y axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yAxis.charAt(0).toUpperCase() + yAxis.slice(1).replace(/([A-Z])/g, ' $1'), 0, 0);
    ctx.restore();

    // Draw competitors
    const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

    competitors.forEach((comp, index) => {
        const x = padding + (comp.positioning[xAxis] / 100) * chartWidth;
        const y = height - padding - (comp.positioning[yAxis] / 100) * chartHeight;

        const color = colors[index % colors.length];

        // Draw point
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(comp.name, x + 12, y + 4);
    });

    // Draw legend
    ctx.textAlign = 'left';
    ctx.font = '12px sans-serif';
    let legendY = padding;

    competitors.forEach((comp, index) => {
        const color = colors[index % colors.length];
        const legendX = width - 150;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(legendX, legendY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.fillText(comp.name, legendX + 10, legendY + 4);

        legendY += 20;
    });
}

// Export Analysis
function exportAnalysis() {
    const data = {
        competitors: competitors,
        features: features,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'competitor-analysis-' + new Date().toISOString().split('T')[0] + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showNotification('Analysis exported successfully!', 'success');
}

// Show Notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// Render positioning map on window resize
window.addEventListener('resize', function() {
    if (document.getElementById('positioning').classList.contains('active')) {
        renderPositioningMap();
    }
});
