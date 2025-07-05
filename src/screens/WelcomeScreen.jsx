import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const initialSlides = [
    {
        key: 'slide1',
        image: require('../../assets/homeimage.jpg'),
        logoText: 'PLAYESY',
        // tagline: 'Your Sports Community App',
        heading: '',
        subheading: '',
    },
    {
        key: 'slide2',
        image: require('../../assets/gymimages.jpg'),
        heading: 'Find',
        subheading: 'Find and meet your new playpals near you. Build a circle and enjoy playing.',
    },
    {
        key: 'slide3',
        image: require('../../assets/skills.jpg'),
        heading: 'Learn',
        subheading: 'Learn and improve your sport skills from the curated content.',
    },
    {
        key: 'slide4',
        image: require('../../assets/discover1.jpg'),
        heading: 'Discover',
        subheading: 'Discover venues, experiences and gear up for your game',
    },
    {
        key: 'slide5',
        image: require('../../assets/track.jpg'),
        heading: 'Track',
        subheading: 'Track your ratings and progress across the sports activities you take part it in.',
    },
];

const slides = [...initialSlides, initialSlides[0]]; // Duplicate the first slide for seamless looping

const WelcomeScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                if (nextIndex === slides.length) {
                    flatListRef.current.scrollToIndex({ index: 0, animated: false });
                    return 0;
                } else {
                    flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
                    return nextIndex;
                }
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            // Map actual index to original slide index for pagination
            const actualIndex = viewableItems[0].index % initialSlides.length;
            setCurrentIndex(actualIndex);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            {item.image && (
                <Image
                    source={item.image}
                    style={[styles.image, item.key === 'slide1' && styles.fullScreenImage]}
                />
            )}
            {item.key === 'slide1' && <View style={styles.overlay} />}
            {item.logoText && (
                <View style={[styles.logoContainer, item.key === 'slide1' && styles.logoContainerFullScreen]}>
                    <Text style={styles.logoText}>{item.logoText}</Text>
                    <Text style={styles.tagline}>{item.tagline}</Text>
                </View>
            )}
            {item.heading && <Text style={styles.heading}>{item.heading}</Text>}
            {item.subheading && <Text style={styles.subheading}>{item.subheading}</Text>}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                contentContainerStyle={styles.flatListContent}
            />
            <View style={styles.pagination}>
                {initialSlides.map((_, i) => {
                    const inputRange = [
                        (i - 1) * width,
                        i * width,
                        (i + 1) * width,
                    ];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={i}
                            style={[
                                styles.dot,
                                { width: dotWidth, opacity },
                                i === currentIndex && styles.activeDot,
                            ]}
                        />
                    );
                })}
            </View>
            <View style={styles.staticButtonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signupButtonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flatListContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    slide: {
        width: width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        position: 'absolute',
        top: '60%', // Adjust as needed
        alignItems: 'center',
    },
    logoText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff', // Assuming white text on the dark background of the soccer ball image
    },
    tagline: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: '50%', // Adjust as needed
        resizeMode: 'contain',
        marginBottom: 20,
    },
    fullScreenImage: {
        width: width,
        height: Dimensions.get('window').height,
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% opaque black overlay
    },
    logoContainerFullScreen: {
        top: Dimensions.get('window').height * 0.75, // Adjust as needed to position it on the bottom 1/4th
        zIndex: 1,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subheading: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    loginButton: {
        backgroundColor: '#4A55A1', // Green color from the design
        borderRadius: 8,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    signupButton: {
        backgroundColor: '#fff',
        borderColor: '#4A55A1',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
    },
    signupButtonText: {
        color: '#4A55A1',
        fontSize: 18,
        fontWeight: '600',
    },
    pagination: {
        position: 'absolute',
        bottom: 30, // Adjusted to be closer to the bottom
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    activeDot: {
        backgroundColor: '#4A55A1', // Green for active dot
    },
    staticButtonContainer: {
        position: 'absolute',
        bottom: 50, // Adjust to position above the pagination if needed
        width: '80%',
        alignSelf: 'center',
        zIndex: 1, // Ensure buttons are above FlatList content
    },
});

export default WelcomeScreen;
