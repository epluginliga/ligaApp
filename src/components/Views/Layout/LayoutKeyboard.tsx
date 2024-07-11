import React from 'react'
import { Keyboard,KeyboardAvoidingView,Platform,StatusBar,StyleSheet,TouchableWithoutFeedback, View } from 'react-native';

export type LayoutKeyboard = {
   children: React.ReactNode;
}

export function LayoutKeyboard({ children }: LayoutKeyboard) {
   return (
      <KeyboardAvoidingView
         removeClippedSubviews

         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={styles.container}
         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : StatusBar.currentHeight}
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

