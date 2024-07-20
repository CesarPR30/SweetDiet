import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }) => {
  return (

    <View style={styles.container}>
      <Image source={item.img} resizeMode="contain" style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
    </View>
    </View>

  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: '60%',
    paddingHorizontal:20,
    marginTop: '25%',
    alignItems: 'center',
  },
  image: {
    width: width - 100,
    height: '100%',
    marginBottom: -20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    maxWidth: '95%',
    textAlign: 'center',
    fontSize: 17,
    marginVertical: '1%',
    color: '#333',
  },
});
