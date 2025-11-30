# Getting Started

>**Note**: React Native App developed to meet test requirement
## 1. Framework 
React Native CLI

## 2. Third Party Packages used in the app:
   a. styled-components (for styling components) <br />
   b. axios (for networking)<br />
   c. redux (for data management/storage)<br />
   d. react-native-async-storage (for data storage)<br />
   e. react-navigation, react-native-gesture-handler react-native-reanimated (for navigation)<br />
   f. react-native-bootsplash (for custom splash screen)<br />
   h. react-native-linear-gradient (for gradient style)<br />
   i. react-native-svg (for icons)<br />

## 3. API:
   Used FakeStoreAPI to simulate a shop experince and using the response to generate a category list.

## 4. App Screens:
   * Home Screen:<br />
         * Shows marketing banner with dynamic texts and images<br />
         * A search text field that upon submitting query, it navigates to Search Screen<br />
         * List of Categories extracted from array of Products that navigates to Search Screen<br />
         * List of products that are clickablke and navigates to Product Screen to display additional details<br />
         * Array of Product is saved in storage and accessed when offline.<br />
   * Search Screen:<br />
         * If Screen is accessed by category, it displays products for that category and search only works of that category.<br />
         * If Screen is accessed by search query, it displays results for that query.<br />
         * Search query check both title and category<br />
         * If search results is cleared, all products are displyed for query and all products for a category for category.<br />
   * Product Screen:<br />
         * Display all product provided by FakeStoreAPI<br />
         * Display price in disabled "Add to Cart" button<br />
         * When Offline, product is accessed from saved Array of Products.<br />

## 5. Project Structure:
   * src/ - App source code
      * apis/ - api calls 
      * assets/ - image, svg, and style assets 
      * components/ - Reusable UI components 
      * constant/ - api endpoints, string, and types
      * helper/ - App helper files
         * fucntions/ - api generic request function, generic function, and online status hook.
         * navigation/ - navigation setup and screen params setup
         * redux/ - store and slices to store data
      * screens/ home, search, and product screens
        

# Running the App

## 1. Clone Repo
```bash
git clone https://github.com/SamPaddock/FakeStore.git
cd FakeStore
```

## 2. Install Dependencies
```bash
# using npm
npm install
```

## 3. For iOS
```bash
# using npm
npm cd ios
pod install
```

## Step 2: Start your Application

Run the following command to start:

### Start Metro
```bash
# using npm
npm start
# if facing issues
npm start -- --reset-cache
```

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```














