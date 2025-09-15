import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff', 
        tabBarInactiveTintColor: '#dcdcdc', 
        tabBarStyle: {
          backgroundColor: '#8a2be2', 
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: '#8a2be2', 
        },
        headerTintColor: '#fff',
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
        }}
      />

      {/* Personagens */}
      <Tabs.Screen
        name="app_personagem/index"
        options={{
          title: 'Personagens',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="android" color={color} />,
        }}
      />

      {/* Planetas */}
      <Tabs.Screen
        name="planetas/index"
        options={{
          title: 'Planetas',
          tabBarIcon: ({ color }) => <FontAwesome size={24} name="globe" color={color} />,
        }}
      />

      <Tabs.Screen
        name="app_personagem/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
