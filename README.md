# Nurole - Board Roles Platform

A comprehensive job board platform specifically designed for Non-Executive Director (NED) roles, featuring community-driven content, premium memberships, and professional networking capabilities.

## 🚀 Features

### Core Functionality
- **Dashboard Overview**: Personalized dashboard with recommended roles, events, and community content
- **Job Search & Filtering**: Advanced search with category filters (charities, education, compensated roles)
- **Role Recommendations**: AI-powered role suggestions based on user preferences and experience
- **Detailed Role Pages**: Comprehensive job descriptions with application tracking
- **Professional Profiles**: Complete profile management with career highlights and skills

### Premium Features (Nurole Plus)
- **Exclusive Events**: Access to board masterminds, networking events, and expert workshops
- **Community Roles**: Member-posted board vacancies from personal networks
- **Priority Support**: Enhanced customer service and application review
- **Advanced Networking**: Connect with 65,000+ board professionals

### Content Sections
- **Recommended Roles**: Personalized job recommendations
- **External Board Roles**: Third-party roles organized by sector (Public, Healthcare, Housing, etc.)
- **Upcoming Events**: Professional development and networking opportunities
- **Community Posts**: Roles shared by Plus members
- **Pricing & Features**: Transparent subscription tiers

## 🛠 Tech Stack

- **Frontend**: React.js with functional components and hooks
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Google Material Symbols Rounded
- **Fonts**: Source Sans Pro, Playfair Display
- **Build Tool**: Vite
- **State Management**: React useState hooks

## 🎨 Design System

### Colors
- **Primary**: Sage green (#059669) for branding and CTAs
- **Secondary**: Grey scale for text and backgrounds
- **Accent**: Blue for informational elements, Orange for alerts
- **Validation**: Green for success states
- **Error**: Claret red for error states

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Source Sans Pro (sans-serif)
- **Scale**: Responsive typography with proper hierarchy

### Components
- **Buttons**: Fully rounded with hover states and focus rings
- **Cards**: Clean white backgrounds with subtle shadows
- **Forms**: Consistent input styling with focus states
- **Navigation**: Tab-based navigation with active states
- **Typography**: Consistent use of font-semibold for headings and emphasis

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx      # Main dashboard with all sections
│   └── Jobs.jsx          # Job listings and external roles
├── App.jsx               # Main app component with routing
├── index.css            # Global styles and design system
└── main.jsx             # App entry point

public/
└── index.html           # HTML template

tailwind.config.js       # Tailwind configuration
package.json            # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nurole-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

## 📱 Pages & Navigation

### Dashboard (`/`)
- Welcome message and profile completion prompts
- Grid of recommended job roles
- Horizontal carousel of upcoming events
- Community-posted roles from Plus members

### View Roles (`/jobs`)
- Search functionality with filters
- Recommended and other job sections
- External board roles by sector
- Events preview at bottom

### My Profile (`/profile`)
- Tabbed interface for profile management
- Career summary and experience sections
- Skills and qualifications management
- CV upload and sharing capabilities

### Nurole Plus (`/nurole-plus`)
- Community discussion areas
- Event management and registration
- Member-exclusive content
- Program access (Chair, Board Pathway)

### Pricing (`/pricing`)
- Subscription tier comparison
- Feature breakdown and benefits
- Testimonials and social proof
- FAQ section

## 🔧 Configuration

### Tailwind CSS Setup
The project uses a custom Tailwind configuration with:
- Extended color palette (sage, grey, blue, claret, etc.)
- Custom typography scales
- Container max-width centered at 1200px
- Custom animations and transitions

### Design System Classes
```css
/* Text Colors */
.text-primary    /* Grey 900 */
.text-secondary  /* Grey 700 */
.text-inactive   /* Grey 600 */
.text-cta        /* Sage 600 */

/* Buttons */
.button-primary       /* Main CTA button */
.button-secondary     /* Secondary action */
.button-tertiary      /* Minimal button */

/* Form Elements */
.text-input      /* Standard text input */
.select-input    /* Dropdown select */
.text-area       /* Multi-line text */
```

## 🎯 Key Features Implementation

### Responsive Design
- Mobile-first approach with progressive enhancement
- Grid layouts that adapt to screen sizes
- Horizontal scrolling carousels for events
- Collapsible navigation on mobile

### State Management
- Subscription status tracking (`hasNurolePlus`)
- Page navigation state
- Search and filter states
- Job details modal state

### User Experience
- Smooth transitions and hover effects
- Loading states and feedback
- Accessibility considerations (focus rings, keyboard navigation)
- Consistent spacing and visual hierarchy

## 🧪 Dummy Data

The application includes realistic dummy data for:
- **Job Roles**: 5 sample NED positions across different sectors
- **Events**: 3 upcoming professional development events
- **Community Roles**: 3 member-posted opportunities
- **External Roles**: Extensive list organized by sector

## 🎨 Customization

### Adding New Sections
1. Create component in `src/components/`
2. Import and add to main App.jsx
3. Update navigation if needed
4. Follow existing design patterns

### Styling Guidelines
- Use design system classes when possible
- Maintain consistent spacing (Tailwind spacing scale)
- Follow color palette for brand consistency
- Ensure responsive behavior

## 📈 Future Enhancements

### Planned Features
- **Real Authentication**: User login and profile management
- **Application Tracking**: Job application status and history
- **Advanced Search**: Location radius, salary ranges, company size
- **Email Notifications**: Job alerts and event reminders
- **Mobile App**: React Native implementation

### Technical Improvements
- **API Integration**: Connect to backend services
- **State Management**: Redux or Zustand for complex state
- **Testing**: Unit and integration tests
- **Performance**: Code splitting and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Use functional components with hooks
- Follow existing naming conventions
- Maintain responsive design principles
- Write self-documenting code with comments

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions, feedback, or support:
- Email: community@nurole.com
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

## 🙏 Acknowledgments

- **Design Inspiration**: Modern job board platforms
- **Icons**: Google Material Design
- **Fonts**: Google Fonts
- **Framework**: React.js ecosystem
- **Styling**: Tailwind CSS community

---

**Built with ❤️ for the board professional community**
