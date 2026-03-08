// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Authentication Functions
class Auth {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }

    // Get current user
    getUser() {
        return this.user;
    }

    // Get token
    getToken() {
        return this.token;
    }

    // Set authentication data
    setAuth(token, user) {
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    // Clear authentication data
    clearAuth() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Signup
    async signup(name, email, password, linkedinProfile = '', company = '') {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, linkedinProfile, company })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            if (data.success && data.token) {
                this.setAuth(data.token, data.user);
                return { success: true, user: data.user };
            }

            throw new Error('Invalid response from server');
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, message: error.message };
        }
    }

    // Login
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.success && data.token) {
                this.setAuth(data.token, data.user);
                return { success: true, user: data.user };
            }

            throw new Error('Invalid response from server');
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message };
        }
    }

    // Logout
    logout() {
        this.clearAuth();
        window.location.href = '/login.html';
    }

    // Get current user from API
    async getCurrentUser() {
        if (!this.token) {
            return { success: false, message: 'Not authenticated' };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    this.clearAuth();
                }
                throw new Error(data.message || 'Failed to get user');
            }

            if (data.success && data.user) {
                this.user = data.user;
                localStorage.setItem('user', JSON.stringify(data.user));
                return { success: true, user: data.user };
            }

            throw new Error('Invalid response from server');
        } catch (error) {
            console.error('Get user error:', error);
            return { success: false, message: error.message };
        }
    }

    // LinkedIn OAuth
    loginWithLinkedIn() {
        window.location.href = `${API_BASE_URL}/auth/linkedin`;
    }

    // Handle OAuth callback
    handleOAuthCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        if (error) {
            return { success: false, message: error };
        }

        if (token) {
            // Get user info with the token
            this.token = token;
            localStorage.setItem('token', token);
            
            // Fetch user data
            this.getCurrentUser().then(result => {
                if (result.success) {
                    window.location.href = '/dashboard.html';
                } else {
                    window.location.href = '/login.html?error=oauth_failed';
                }
            });

            return { success: true };
        }

        return { success: false, message: 'No token received' };
    }
}

// Create global auth instance
const auth = new Auth();

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function hideError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function setLoading(buttonId, loading) {
    const button = document.getElementById(buttonId);
    if (button) {
        if (loading) {
            button.disabled = true;
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Please wait...';
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || button.innerHTML;
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { auth, validateEmail, validatePassword, showError, hideError, showSuccess, setLoading };
}

// Made with Bob
