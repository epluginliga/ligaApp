import React from 'react'
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from 'react-native';

export type LayoutKeyboard = {
   children: React.ReactNode;
}

export function LayoutKeyboard({ children }: LayoutKeyboard) {
   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.container}
         keyboardVerticalOffset={Platform.OS === "ios" ? 5 : StatusBar.currentHeight}
      >
         {children}
      </KeyboardAvoidingView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

