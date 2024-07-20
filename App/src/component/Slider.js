import React, { useRef, useState, useEffect } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import Slides from '../data';
import SlideItem from './SlideItem';
import Pagination from './Pagination';

const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  
  // Función para avanzar al siguiente slide
  const goToNextSlide = () => {
    const newIndex = (index + 1) % Slides.length;
    setIndex(newIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
  };

  useEffect(() => {
    // Configura un intervalo para cambiar automáticamente cada 3 segundos
    const interval = setInterval(goToNextSlide, 3000);
    
    return () => {
      clearInterval(interval); // Limpia el intervalo al desmontar el componente
    };
  }, [index]); // Se ejecuta cuando cambia el índice

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={Slides}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
