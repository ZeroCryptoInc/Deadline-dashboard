# 📅 Deadline Tracker

A super-light, real-time web dashboard for tracking multiple personal deadlines with beautiful circular progress indicators and live countdowns.

## ✨ Features

### Core Functionality
- **Real-time Countdowns** - Live D:H:M:S timers that update every second
- **Visual Progress Rings** - Color-coded circular progress bars that shrink as time runs out
- **Smart Color Transitions** - Green (>50%) → Yellow (10-50%) → Red (<10% + pulsing when overdue)
- **Madrid Timezone Support** - All dates and times handled in Europe/Madrid timezone
- **Persistent Storage** - Uses localStorage to survive page refreshes

### Interactive Features
- **Add Deadlines** - Clean modal with name, task description, and datetime picker
- **Edit Deadlines** - Click any badge to edit or use 3-dot menu
- **Delete Deadlines** - Remove deadlines via dropdown menu
- **Hover Effects** - Visual feedback showing badges are interactive
- **Text Truncation** - Long task descriptions auto-truncate with tooltips

### User Experience
- **Mobile Responsive** - Works perfectly on all device sizes
- **Clean Design** - Minimal, professional interface with muted colors
- **Micro-animations** - Smooth transitions and hover effects
- **Empty State** - Friendly placeholder when no deadlines exist

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and yarn
- Python 3.8+
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/deadline-tracker.git
cd deadline-tracker
```

2. **Install Frontend Dependencies**
```bash
cd frontend
yarn install
```

3. **Install Backend Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

4. **Environment Setup**
```bash
# Frontend - create frontend/.env
REACT_APP_BACKEND_URL=http://localhost:8001

# Backend - create backend/.env
MONGO_URL=mongodb://localhost:27017
DB_NAME=deadline_tracker
```

5. **Start the Application**
```bash
# Terminal 1 - Backend
cd backend
python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Terminal 2 - Frontend  
cd frontend
yarn start
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 📖 How to Use

### Adding a Deadline
1. Click the **"Add Deadline"** button
2. Fill in:
   - **Name** - Person's name (e.g., "Maria")
   - **Task/Description** - What needs to be done
   - **Due Date & Time** - When it's due (Madrid timezone)
3. Click **"Add Deadline"**

### Editing a Deadline
- **Method 1:** Click directly on any deadline badge
- **Method 2:** Click the 3-dot menu → "Edit"
- Make your changes and click **"Save Changes"**

### Deleting a Deadline
- Click the 3-dot menu on any badge → "Delete"

### Understanding the Visual Indicators

| Color | Meaning | Time Remaining |
|-------|---------|----------------|
| 🟢 Green | Plenty of time | >50% of original duration |
| 🟡 Yellow | Getting urgent | 10-50% remaining |
| 🔴 Red | Critical/Overdue | <10% or past due (pulsing) |

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Tailwind CSS** - Styling and responsive design
- **Shadcn/ui** - Pre-built accessible components
- **Lucide React** - Clean, consistent icons
- **React Router** - Client-side routing

### Backend (Ready for future features)
- **FastAPI** - Modern Python web framework
- **MongoDB** - Document database
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation

### Development Tools
- **Vite** - Fast build tool
- **ESLint** - Code linting
- **Hot Reload** - Development efficiency

## 📁 Project Structure

```
deadline-tracker/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # Shadcn/ui components
│   │   │   └── DeadlineTracker.jsx
│   │   ├── mock.js             # Mock data for development
│   │   ├── App.js              # Main app component
│   │   └── index.css           # Global styles
│   ├── package.json
│   └── tailwind.config.js
├── backend/                     # FastAPI server (future features)
│   ├── server.py               # Main server file
│   ├── requirements.txt        # Python dependencies
│   └── .env                    # Environment variables
└── README.md                   # This file
```

## 🎨 Design Philosophy

- **Minimal & Clean** - Focus on essential features without clutter
- **Real-time Feedback** - Live updates create engagement
- **Visual Hierarchy** - Color and size guide user attention
- **Responsive First** - Mobile-friendly design from the start
- **Accessibility** - Proper contrast, focus states, and semantic HTML

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```bash
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Backend (.env)**
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=deadline_tracker
```

### Customization Options

**Colors** - Modify in `tailwind.config.js`:
```javascript
colors: {
  // Customize progress ring colors
  'progress-safe': '#10b981',    // Green
  'progress-warning': '#f59e0b', // Yellow  
  'progress-danger': '#ef4444',  // Red
}
```

**Timing** - Adjust in `DeadlineTracker.jsx`:
```javascript
// Color transition thresholds
if (percentage > 50) return 'stroke-green-500';  // Safe zone
if (percentage > 10) return 'stroke-yellow-500'; // Warning zone
return 'stroke-red-500';                         // Danger zone
```

## 🚀 Deployment

### Development
```bash
# Frontend
cd frontend && yarn start

# Backend  
cd backend && python -m uvicorn server:app --reload
```

### Production Build
```bash
# Build frontend
cd frontend && yarn build

# Serve static files or deploy to hosting platform
```

### Hosting Options
- **Vercel/Netlify** - Frontend static hosting
- **Railway/Render** - Full-stack deployment
- **AWS/Google Cloud** - Scalable cloud hosting

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test on multiple screen sizes
- Ensure accessibility standards
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for consistent iconography
- [React](https://reactjs.org/) for the amazing framework

## 📞 Support

If you have questions or need help:

1. Check the [Issues](https://github.com/yourusername/deadline-tracker/issues) page
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce

---

**Built with ❤️ for productive deadline management**

*Last updated: January 2025*
