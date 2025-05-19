# GoSholo - Restaurant Discovery App

A modern restaurant discovery app built with React Native and Expo that helps users find and explore restaurants nearby. The app features a beautiful UI with restaurant listings, reviews, offers, and discovery features.

## 🚀 Features

- **Restaurant Discovery**: Browse and search for restaurants in your area
- **Categories**: Filter restaurants by cuisine type (Italian, Japanese, Mexican, etc.)
- **User Location**: Get restaurant recommendations based on your current location
- **Reviews & Ratings**: View restaurant ratings and user reviews
- **Offers & Deals**: Discover special offers and promotions
- **Favorites**: Save your favorite restaurants for quick access
- **Map Integration**: Open external maps to navigate to restaurants
- **User Profiles**: Manage your profile and preferences
- **Dark Mode Support**: Beautiful UI that adapts to your system theme

## 📱 Screens

- **Home**: Featured restaurants and quick access to search
- **Offers**: Browse current deals and promotions
- **Discover**: Explore nearby restaurants with category filters
- **Events**: Find food-related events in your area
- **Profile**: Manage your account and preferences

## 🛠️ Tech Stack

- **React Native**: Core framework for cross-platform mobile development
- **Expo**: Development platform and build tools
- **TypeScript**: Type-safe JavaScript for better developer experience
- **React Navigation**: Routing and navigation
- **React Native Reanimated**: Smooth animations
- **Expo Location**: Access device location services
- **Formik & Yup**: Form handling and validation
- **Custom Theme System**: Consistent styling across the app

## 📋 Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gosholo.git
cd gosholo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your device:
   - Download the Expo Go app from App Store or Google Play
   - Scan the QR code shown in the terminal
   - The app will load on your device

## 🏃‍♂️ Running the App

### Development Mode

```bash
# Start the development server
npx expo start

# Run on iOS simulator (macOS only)
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on web
npx expo start --web
```

### Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure your project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 🔑 API Keys

The app requires Google Maps API keys for map functionality. Add your API keys in `app.json`:

```json
{
  "expo": {
    "plugins": [
      ["expo-maps", {
        "apiKey": {
          "android": "YOUR_ANDROID_API_KEY",
          "ios": "YOUR_IOS_API_KEY"
        }
      }]
    ]
  }
}
```

## 📁 Project Structure

```
gosholo/
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/          # App screens
│   ├── navigation/       # Navigation configuration
│   ├── contexts/         # React contexts (theme, auth, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── theme/           # Theme configuration
│   └── utils/           # Utility functions
├── assets/              # Images, fonts, and other assets
├── App.tsx             # App entry point
├── app.json            # Expo configuration
└── package.json        # Dependencies and scripts
```

## 🎨 Customization

### Theme Colors

The app uses a custom color palette defined in `src/theme/colors.ts`:

- **Primary**: Light Blue (#5BC4DB)
- **Secondary**: Dark Teal (#016167)
- **Accent**: Orange (#FF6233)
- **Success**: Light Green (#B2FD9D)

### Adding New Components

1. Create a new component in `src/components/YourComponent/`
2. Add the component files (`.tsx`, `index.ts`)
3. Export from `src/components/index.ts`
4. Use in any screen or component

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**:
   ```bash
   npx expo start --clear
   ```

2. **Node modules issues**:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **iOS build issues**:
   ```bash
   cd ios && pod install
   ```

4. **Android build issues**:
   ```bash
   cd android && ./gradlew clean
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Ilyes Ghorieb 

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- React Native community for the excellent ecosystem
- All contributors who have helped improve this project

## 📞 Contact

For questions or support, please open an issue on GitHub or contact the maintainers.

---

**Happy Restaurant Hunting! 🍔🍜🍗**
