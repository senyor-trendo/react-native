import { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

type HeaderType = 'main'

interface TitleProps {
	headerType: HeaderType;
	children?: ReactNode;
}

export default function Title({ headerType, children }: TitleProps) {
	return <Text style={styles[headerType]}>{children}</Text>;
}

const styles: Record<HeaderType, TextStyle> = StyleSheet.create({
	main: {
		marginHorizontal: 12,
		marginTop: 24,
		fontWeight: '800',
		fontSize: 32,
	}
});
