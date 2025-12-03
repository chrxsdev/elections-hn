# 🇭🇳 Honduras Electoral Results 2025

Real-time web application to visualize and compare the results of the Honduras 2025 presidential elections.

## 🚀 Features

- **Real-time data** - Fetches updated information from the CNE (National Electoral Council) API
- **Visual comparison** - Displays the top two candidates by votes and the difference between them
- **Modern design** - Clean and responsive interface with smooth animations
- **Manual refresh** - Button to refresh data on demand
- **Party information** - Shows candidate photos, party logos, and official colors

## 🛠️ Technologies

- **React** - UI Framework
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icons
- **CSS Modules** - Styles with animations

## 📦 Installation

```bash
# Clone the repository
git clone <repo-url>
cd scrapping

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Configuration

Create a `.env` file in the project root:

```env
VITE_API_ENDPOINT=https://resultadosgenerales2025-api.cne.hn/esc/v1/presentacion-resultados
VITE_API_REFERER=https://resultadosgenerales2025.cne.hn/
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

## 🎨 Design Features

- Elegant font: **Playfair Display**
- Dynamic colors based on political parties
- Smooth transitions and animations
- Responsive design for mobile and tablets
- Animated loader during data fetch

## 📱 Responsive

The application is fully responsive:
- **Desktop**: 3-column layout (Candidate | Difference | Candidate)
- **Tablet/Mobile**: Stacked vertical layout

## 🔄 Functionality

1. **Initial load** - Fetches and displays results on page load
2. **Data validation** - Converts and validates votes as numbers
3. **Sorting** - Orders candidates by votes in descending order
4. **Refresh** - Allows refreshing data with the update button
5. **Timestamp** - Shows the exact time of the last update

## 📄 License

MIT
