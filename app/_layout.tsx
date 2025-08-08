import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/store';
import CurvedHeader from '@/components/Header';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="purple" />
            </View>
          }
          persistor={persistor}
        >
          <Stack
            screenOptions={{
              header: ({ options, route, navigation }) => (
                <CurvedHeader
                  title={options?.title || route.name}
                  showBackButton={navigation.canGoBack()}
                />
              ),
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'Task Manager',
                animation: 'fade_from_bottom',
              }}
            />
            <Stack.Screen
              name="AddTask"
              options={{
                title: 'Add a New Task',
                animation: 'fade_from_bottom',
              }}
            />
          </Stack>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
