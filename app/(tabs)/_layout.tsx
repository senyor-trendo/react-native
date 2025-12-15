import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Search',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="libraries"
				options={{
					title: 'Libraries',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: 'History',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="bookmark" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
				}}
			/>
		</Tabs>
	);
}
