# EventFlow AI Frontend

Modern, responsive frontend for the EventFlow AI platform - a LinkedIn-powered event sales automation system.

## 📁 Project Structure

```
link_frontend/
├── index.html              # Main landing page
├── login.html             # User login page
├── signup.html            # User registration page
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet (extracted from HTML)
│   ├── js/
│   │   ├── main.js        # Landing page JavaScript
│   │   └── auth.js        # Authentication logic
│   └── images/            # Image assets
└── README.md              # This file
```

## 🚀 Features

### Landing Page (index.html)
- Modern, gradient-based design
- Responsive layout for all devices
- Animated sections and components
- Pricing calculator with monthly/annual toggle
- Testimonials slider
- FAQ accordion
- Integration showcase
- Case studies section

### Authentication Pages
- **Login Page** (`login.html`)
  - Email/password authentication
  - "Remember me" functionality
  - LinkedIn OAuth integration
  - Password recovery link
  - Form validation

- **Signup Page** (`signup.html`)
  - User registration with validation
  - Password strength indicator
  - LinkedIn profile integration
  - Company information (optional)
  - Terms acceptance
  - LinkedIn OAuth signup

## 🎨 Design System

### Color Palette
- **Primary**: `#7c3aed` (Purple)
- **Primary Dark**: `#6d28d9`
- **Primary Light**: `#a78bfa`
- **Secondary**: `#0f172a` (Dark Blue)
- **Accent**: `#f59e0b` (Amber)
- **Success**: `#10b981` (Green)
- **Danger**: `#ef4444` (Red)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components
- Buttons (Primary, Secondary, Outline)
- Form inputs with validation
- Cards with hover effects
- Gradient backgrounds
- Custom scrollbar
- Animated particles
- Progress bars
- Sliders

## 🔧 Setup & Usage

### 1. Basic Setup

No build process required! Simply open the HTML files in a browser:

```bash
# Navigate to frontend directory
cd LINKEDIN/link_frontend

# Open in browser (macOS)
open index.html

# Or use a local server (recommended)
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### 2. Configure API Endpoint

Edit `assets/js/auth.js` to point to your backend:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

For production, update to your deployed backend URL:

```javascript
const API_BASE_URL = 'https://api.yourdomain.com/api';
```

### 3. Test Authentication

1. Start the backend server (see `link_backend/SETUP.md`)
2. Open `signup.html` in browser
3. Create a test account
4. Login via `login.html`
5. You'll be redirected to `index.html` (authenticated)

## 📱 Responsive Design

The frontend is fully responsive with breakpoints:

- **Desktop**: > 1024px (full layout)
- **Tablet**: 768px - 1024px (2-column grids)
- **Mobile**: < 768px (single column, mobile menu)

## 🔐 Authentication Flow

### Standard Login/Signup
1. User fills form on `login.html` or `signup.html`
2. JavaScript validates input client-side
3. Sends request to backend API
4. Backend returns JWT token
5. Token stored in localStorage
6. User redirected to dashboard/home

### LinkedIn OAuth
1. User clicks "Sign in with LinkedIn"
2. Redirected to LinkedIn authorization
3. User authorizes app
4. LinkedIn redirects back with code
5. Backend exchanges code for token
6. User profile created/updated
7. JWT token returned
8. User logged in automatically

## 🛠️ Customization

### Update Branding

1. **Logo**: Replace "F" in logo icons with your logo
2. **Colors**: Update CSS variables in `assets/css/style.css`:
   ```css
   :root {
       --primary: #your-color;
       --primary-dark: #your-dark-color;
       /* ... */
   }
   ```
3. **Content**: Edit HTML files directly
4. **Images**: Add to `assets/images/` and update src attributes

### Add New Pages

1. Create new HTML file (e.g., `dashboard.html`)
2. Link to `assets/css/style.css`
3. Link to `assets/js/auth.js` if authentication needed
4. Use existing components and styles

## 📦 Dependencies

### External Libraries (CDN)
- **Google Fonts**: Inter font family
- **Font Awesome**: 6.4.0 (icons)

No npm packages or build tools required!

## 🔍 File Details

### index.html (2955 lines)
- Complete landing page
- Inline CSS and JavaScript (for single-file deployment)
- All sections: Hero, Features, Pricing, Testimonials, etc.

### login.html (398 lines)
- Clean authentication form
- LinkedIn OAuth button
- Form validation
- Error handling
- Responsive design

### signup.html (485 lines)
- Registration form with validation
- Password strength indicator
- LinkedIn profile field
- Company information
- Terms acceptance
- LinkedIn OAuth option

### assets/css/style.css
- Extracted from index.html
- Complete design system
- Responsive utilities
- Component styles
- Animations

### assets/js/main.js
- Landing page interactions
- Pricing toggle
- Testimonials slider
- FAQ accordion
- Smooth scrolling
- Animations

### assets/js/auth.js (227 lines)
- Authentication class
- API integration
- Token management
- Form validation helpers
- Error handling
- LinkedIn OAuth flow

## 🚀 Deployment

### Static Hosting (Recommended)

Deploy to any static hosting service:

**Netlify**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd LINKEDIN/link_frontend
netlify deploy --prod
```

**Vercel**:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd LINKEDIN/link_frontend
vercel --prod
```

**GitHub Pages**:
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Select branch and folder
4. Site will be live at `https://username.github.io/repo`

### Update API URL

Before deploying, update the API endpoint in `assets/js/auth.js`:

```javascript
const API_BASE_URL = 'https://your-backend-api.com/api';
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] All sections visible and styled
- [ ] Navigation menu works
- [ ] Mobile menu toggles
- [ ] Pricing toggle switches
- [ ] Testimonials slider auto-advances
- [ ] FAQ accordion expands/collapses
- [ ] Signup form validates input
- [ ] Signup creates user account
- [ ] Login form validates input
- [ ] Login authenticates user
- [ ] LinkedIn OAuth button redirects
- [ ] Forms show error messages
- [ ] Success messages display
- [ ] Responsive on mobile/tablet
- [ ] All links work

## 📝 Notes

- This is a **pet project** for learning full-stack development
- No test cases included (as per requirements)
- Focus on functionality and design
- Backend integration required for full functionality
- LinkedIn OAuth requires backend setup (see `link_backend/LINKEDIN_OAUTH_GUIDE.md`)

## 🔗 Related Documentation

- [Backend Setup Guide](../link_backend/SETUP.md)
- [LinkedIn OAuth Integration](../link_backend/LINKEDIN_OAUTH_GUIDE.md)
- [Backend API Documentation](../link_backend/README.md)
- [EventFlow AI Python Service](../EventFlow-AI/README.md)

## 💡 Tips

1. **Development**: Use a local server (not file://) to avoid CORS issues
2. **API Testing**: Use browser DevTools Network tab to debug API calls
3. **Styling**: All styles are in `assets/css/style.css` for easy customization
4. **Authentication**: Check browser console for auth errors
5. **Mobile**: Test on real devices, not just browser DevTools

## 🐛 Common Issues

### Issue: API calls fail with CORS error
**Solution**: Ensure backend has CORS enabled and you're using http://localhost (not file://)

### Issue: Login/Signup doesn't work
**Solution**: 
1. Check backend is running
2. Verify API_BASE_URL in auth.js
3. Check browser console for errors
4. Verify MongoDB is connected

### Issue: LinkedIn OAuth doesn't work
**Solution**: 
1. Configure LinkedIn app (see LINKEDIN_OAUTH_GUIDE.md)
2. Set up backend OAuth routes
3. Update redirect URLs

### Issue: Styles not loading
**Solution**: 
1. Check file paths are correct
2. Ensure assets folder structure is intact
3. Clear browser cache

## 📧 Support

For issues or questions about the frontend:
1. Check browser console for errors
2. Verify backend is running
3. Review this README
4. Check related documentation

---

**Built with ❤️ for learning full-stack development**