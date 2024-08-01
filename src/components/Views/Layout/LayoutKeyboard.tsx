import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export type LayoutKeyboard = {
   children: React.ReactNode;
}

export function LayoutKeyboard({ children }: LayoutKeyboard) {
   return (
      <KeyboardAvoidingView
         removeClippedSubviews
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.container}
      >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
               {children}
            </>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

