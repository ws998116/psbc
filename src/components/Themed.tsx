/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  // Pressable as DefaultPressable,
  ScrollView as DefaultScrollView,
} from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
// export type PressableProps = ThemeProps & DefaultPressable["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];

export const horizontalPadding = 10;
export const verticalPadding = 10;
export const borderRadius = 7;
export const textLightColor = "rgba(0,0,0,0.8)";
export const textDarkColor = "rgba(255,255,255,0.8)";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const borderColor = useThemeColor({}, "border");

  return (
    <DefaultView
      style={[{ backgroundColor, borderColor }, style]}
      {...otherProps}
    />
  );
}

// export const Pressable = forwardRef((props: PressableProps, ref) => {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const backgroundColor = useThemeColor(
//     { light: lightColor, dark: darkColor },
//     "background"
//   );

//   return (
//     <DefaultPressable style={[{ backgroundColor }, style]} {...otherProps} />
//   );
// });

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultScrollView
      contentContainerStyle={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
