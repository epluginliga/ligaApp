import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export type LayoutKeyboard = {
   children: React.ReactNode;
}

export function LayoutKeyboard({ children }: LayoutKeyboard) {
   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.container}
         keyboardVerticalOffset={40}
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

