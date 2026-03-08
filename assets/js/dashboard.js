// Dashboard functionality and Razorpay integration

// Razorpay Payment Integration
async function initializePayment(plan, billingCycle) {
    try {
        // Create order
        const orderResponse = await fetch(`${API_BASE_URL}/payments/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify({ plan, billingCycle })
        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {
            throw new Error(orderData.message || 'Failed to create order');
        }

        // Initialize Razorpay
        const options = {
            key: orderData.key,
            amount: orderData.order.amount,
            currency: orderData.order.currency,
            name: 'EventFlow AI',
            description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan - ${billingCycle}`,
            order_id: orderData.order.id,
            handler: async function (response) {
                // Verify payment
                await verifyPayment(response, plan, billingCycle);
            },
            prefill: {
                name: auth.getUser()?.name || '',
                email: auth.getUser()?.email || ''
            },
            theme: {
                color: '#7c3aed'
            },
            modal: {
                ondismiss: function() {
                    console.log('Payment cancelled');
                }
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error('Payment initialization error:', error);
        alert('Failed to initialize payment: ' + error.message);
    }
}

// Verify payment with backend
async function verifyPayment(response, plan, billingCycle) {
    try {
        const verifyResponse = await fetch(`${API_BASE_URL}/payments/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: plan,
                billingCycle: billingCycle
            })
        });

        const verifyData = await verifyResponse.json();

        if (verifyData.success) {
            alert('Payment successful! Your subscription is now active.');
            window.location.reload();
        } else {
            throw new Error(verifyData.message || 'Payment verification failed');
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        alert('Payment verification failed: ' + error.message);
    }
}

// Get subscription details
async function getSubscription() {
    try {
        const response = await fetch(`${API_BASE_URL}/payments/subscription`, {
            headers: {
                'Authorization': `Bearer ${auth.getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            return data.subscription;
        }
        return null;
    } catch (error) {
        console.error('Get subscription error:', error);
        return null;
    }
}

// Cancel subscription
async function cancelSubscription() {
    if (!confirm('Are you sure you want to cancel your subscription?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/payments/cancel`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            alert('Subscription cancelled successfully');
            window.location.reload();
        } else {
            throw new Error(data.message || 'Failed to cancel subscription');
        }
    } catch (error) {
        console.error('Cancel subscription error:', error);
        alert('Failed to cancel subscription: ' + error.message);
    }
}

// Campaign Management
async function createCampaignAPI(campaignData) {
    try {
        const response = await fetch(`${API_BASE_URL}/campaigns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(campaignData)
        });

        const data = await response.json();

        if (data.success) {
            return data.campaign;
        }
        throw new Error(data.message || 'Failed to create campaign');
    } catch (error) {
        console.error('Create campaign error:', error);
        throw error;
    }
}

async function getCampaigns() {
    try {
        const response = await fetch(`${API_BASE_URL}/campaigns`, {
            headers: {
                'Authorization': `Bearer ${auth.getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            return data.campaigns || [];
        }
        return [];
    } catch (error) {
        console.error('Get campaigns error:', error);
        return [];
    }
}

async function updateCampaign(id, updates) {
    try {
        const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(updates)
        });

        const data = await response.json();

        if (data.success) {
            return data.campaign;
        }
        throw new Error(data.message || 'Failed to update campaign');
    } catch (error) {
        console.error('Update campaign error:', error);
        throw error;
    }
}

async function deleteCampaign(id) {
    if (!confirm('Are you sure you want to delete this campaign?')) {
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth.getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            return true;
        }
        throw new Error(data.message || 'Failed to delete campaign');
    } catch (error) {
        console.error('Delete campaign error:', error);
        throw error;
    }
}

// Prospect Management
async function getProspects(campaignId = null) {
    try {
        let url = `${API_BASE_URL}/prospects`;
        if (campaignId) {
            url += `?campaignId=${campaignId}`;
        }

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${auth.getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            return data.prospects || [];
        }
        return [];
    } catch (error) {
        console.error('Get prospects error:', error);
        return [];
    }
}

async function createProspect(prospectData) {
    try {
        const response = await fetch(`${API_BASE_URL}/prospects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(prospectData)
        });

        const data = await response.json();

        if (data.success) {
            return data.prospect;
        }
        throw new Error(data.message || 'Failed to create prospect');
    } catch (error) {
        console.error('Create prospect error:', error);
        throw error;
    }
}

// Message Management
async function getMessages(prospectId = null, campaignId = null) {
    try {
        let url = `${API_BASE_URL}/messages?`;
        if (prospectId) url += `prospectId=${prospectId}&`;
        if (campaignId) url += `campaignId=${campaignId}&`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${auth.getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            return data.messages || [];
        }
        return [];
    } catch (error) {
        console.error('Get messages error:', error);
        return [];
    }
}

async function sendMessage(messageData) {
    try {
        const response = await fetch(`${API_BASE_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(messageData)
        });

        const data = await response.json();

        if (data.success) {
            return data.message;
        }
        throw new Error(data.message || 'Failed to send message');
    } catch (error) {
        console.error('Send message error:', error);
        throw error;
    }
}

// Event Catalog
async function getEvents() {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        const data = await response.json();

        if (data.success) {
            return data.events || [];
        }
        return [];
    } catch (error) {
        console.error('Get events error:', error);
        return [];
    }
}

// Analytics
function calculateConversionRate(contacted, converted) {
    if (contacted === 0) return 0;
    return ((converted / contacted) * 100).toFixed(1);
}

function calculateROI(revenue, cost) {
    if (cost === 0) return 0;
    return (((revenue - cost) / cost) * 100).toFixed(1);
}

// Email Verification
async function resendVerification() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.getToken()}`
            }
        });

        const data = await response.json();

        if (data.success) {
            alert('Verification email sent! Please check your inbox.');
        } else {
            throw new Error(data.message || 'Failed to resend verification email');
        }
    } catch (error) {
        console.error('Resend verification error:', error);
        alert('Failed to resend verification email: ' + error.message);
    }
}

// Payment History
async function loadPaymentHistory() {
    try {
        const result = await auth.getCurrentUser();
        if (result.success && result.user.payments && result.user.payments.length > 0) {
            document.getElementById('paymentHistorySection').style.display = 'block';
            renderPaymentHistory(result.user.payments);
        }
    } catch (error) {
        console.error('Load payment history error:', error);
    }
}

function renderPaymentHistory(payments) {
    const container = document.getElementById('paymentHistoryContainer');
    
    if (payments.length === 0) {
        return; // Keep empty state
    }

    const html = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--gray-200);">
                        <th style="padding: 1rem; text-align: left; font-weight: 600;">Date</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;">Plan</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;">Billing Cycle</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;">Amount</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;">Payment ID</th>
                        <th style="padding: 1rem; text-align: left; font-weight: 600;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${payments.map(payment => `
                        <tr style="border-bottom: 1px solid var(--gray-200);">
                            <td style="padding: 1rem;">${new Date(payment.createdAt).toLocaleDateString('en-IN')}</td>
                            <td style="padding: 1rem;">${payment.plan.charAt(0).toUpperCase() + payment.plan.slice(1)}</td>
                            <td style="padding: 1rem;">${payment.billingCycle}</td>
                            <td style="padding: 1rem; font-weight: 600;">₹${(payment.amount / 100).toLocaleString('en-IN')}</td>
                            <td style="padding: 1rem; font-family: monospace; font-size: 0.875rem;">${payment.razorpayPaymentId}</td>
                            <td style="padding: 1rem;">
                                <span style="padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; background: rgba(16, 185, 129, 0.1); color: var(--success);">
                                    ${payment.status}
                                </span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePayment,
        verifyPayment,
        getSubscription,
        cancelSubscription,
        createCampaignAPI,
        getCampaigns,
        updateCampaign,
        deleteCampaign,
        getProspects,
        createProspect,
        getMessages,
        sendMessage,
        getEvents,
        calculateConversionRate,
        calculateROI,
        resendVerification,
        loadPaymentHistory,
        renderPaymentHistory
    };
}

// Made with Bob
