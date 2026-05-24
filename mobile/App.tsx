import React from "react";
import { SafeAreaView, StatusBar, ActivityIndicator, View, Text } from "react-native";
import { WebView } from "react-native-webview";

const SITE_URL = "https://supellexbaku-2o6mfj8et-supellexbakus-projects.vercel.app";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#050505" }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />

      <WebView
        source={{ uri: SITE_URL }}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
        mixedContentMode="always"
        allowsInlineMediaPlayback
        startInLoadingState
        renderLoading={() => (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#050505" }}>
            <ActivityIndicator size="large" />
            <Text style={{ color: "#D4AF37", marginTop: 12 }}>Supellex yüklənir...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
