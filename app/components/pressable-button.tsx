import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps {
	title: string;
	onPress: () => void;
	disabled?: boolean;
	style?: ViewStyle;
	textStyle?: TextStyle;
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	disabled = false,
	style,
	textStyle,
	variant = 'primary',
	size = 'medium',
}) => {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				styles[`button_${variant}`],
				styles[`button_${size}`],
				disabled && styles.button_disabled,
				pressed && !disabled && styles.button_pressed,
				style,
			]}
			onPress={onPress}
			disabled={disabled}
		>
			{({ pressed }) => (
				<Text style={[
					styles.text,
					styles[`text_${variant}`],
					styles[`text_${size}`],
					disabled && styles.text_disabled,
					pressed && !disabled && styles.text_pressed,
					textStyle,
				]}>
					{title}
				</Text>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},

	// Variants
	button_primary: {
		backgroundColor: '#007AFF',
	},
	button_secondary: {
		backgroundColor: '#F2F2F7',
	},
	button_outline: {
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: '#007AFF',
	},

	// Sizes
	button_small: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		minHeight: 36,
	},
	button_medium: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		minHeight: 48,
	},
	button_large: {
		paddingVertical: 16,
		paddingHorizontal: 32,
		minHeight: 56,
	},

	// States
	button_disabled: {
		backgroundColor: '#E5E5EA',
		borderColor: '#E5E5EA',
	},
	button_pressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},

	// Text
	text: {
		fontWeight: '600',
		textAlign: 'center',
	},
	text_primary: {
		color: '#FFFFFF',
	},
	text_secondary: {
		color: '#000000',
	},
	text_outline: {
		color: '#007AFF',
	},
	text_small: {
		fontSize: 14,
	},
	text_medium: {
		fontSize: 16,
	},
	text_large: {
		fontSize: 18,
	},
	text_disabled: {
		color: '#8E8E93',
	},
	text_pressed: {
		opacity: 0.9,
	},
});

export default Button;