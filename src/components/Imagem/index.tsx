import React from 'react'
import { Dimensions, ImageBackground, ImageBackgroundProps, StyleSheet, View } from 'react-native'

type Imagem = ImageBackgroundProps & {
  children?: React.ReactNode;
}
export function Imagem({ children, ...rest }: Imagem) {
  const { width, height } = Dimensions.get("window");

  return (
    <ImageBackground
      blurRadius={4}
      resizeMode="cover"
      {...rest}
      style={{
        height: height / 3,
        width: width - 12,
        ...styles.image
      }}
    >
      {children && children}

      <View style={{
        width,
        height,
        ...styles.shadowBanner
      }} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    overflow: "hidden",
    padding: 10,
    position: "relative",
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  },
  shadowBanner: {
    backgroundColor: "#000",
    position: "absolute",
    top: 0,
    opacity: 0.4,
  }
});