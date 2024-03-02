import { Text, TextProps, useThemeColor } from "./Themed";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function HeaderText(props: TextProps) {
  const color = useThemeColor({}, "text");
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "InterSemiBold", fontSize: 32, color },
        props.style,
      ]}
    />
  );
}

export function SubText(props: TextProps) {
  const color = useThemeColor({}, "subtext");
  return (
    <Text
      {...props}
      style={[{ fontFamily: "InterMedium", fontSize: 16, color }, props.style]}
    />
  );
}
