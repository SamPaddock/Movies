# Getting Started

>**Note**: React Native App developed to meet test requirement
1. No Framework to be used

2. Third Party Packages to me listed:
   a. axios (for networking)
   b. moti (for animation - not used)
   c. redux (for data management/storage)
   d. react-native-async-storage (for data storage)
   e. react-navigation, react-native-gesture-handler react-native-reanimated (for navigation, side menu, and bottom navigation)
   f. lottie-react-native (for splash screen animation)
   h. react-native-linear-gradient (for gradient style)
   i. react-native-vector-icons (for icons)

3. Home Screen, Search Screen, Favorite Screen
Home screen shows a list of movies in different categories. 
User can select "See all" to view a list of movies under that category where they can load more movies under that category as well.
User can add a movie to their favorite list or share the movies title and poster from details screen, search screen, and list of movies screen.
User can search for any movie in the search view.
User can see the movie details and read the plot summary when they click on any movie.

4. Search screen contains results of a search where the following is visible:
   a. movie poster
   b. movie title
   c. average rating
   d. release year
   e. release date
   f. add to favorite button
   g. share movie button
   h. load more/pagination of results.

5. Favorite Screen where the user can view all movies they liked and where can navigate to the movie detail screen or share the movie

6. Movie Detail screen shows movie ID and movie Title being passed from previous screen and user can pull to refresh

## Step 1: Start the Metro Server

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

### For iOS
```bash
# using npm
npm cd ios
pod install
```

## Step 2: Start your Application

Run the following command to start the _iOS_ app:

### For iOS

```bash
# using npm
npm run ios
```