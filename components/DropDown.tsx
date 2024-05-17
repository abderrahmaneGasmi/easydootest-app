import RNPickerSelect, { PickerStyle } from "react-native-picker-select";

export const Dropdown = ({
  items,
  onValueChange,
  placeholder,
  value,
  style,
  useNativeAndroidPickerStyle,
}: {
  items: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  placeholder?: { label: string; value: string };
  value?: string;
  style?: PickerStyle;
  useNativeAndroidPickerStyle?: boolean;
}) => {
  return (
    <RNPickerSelect
      onValueChange={onValueChange}
      items={items}
      placeholder={placeholder}
      value={value}
      style={style}
      useNativeAndroidPickerStyle={useNativeAndroidPickerStyle}
    />
  );
};
