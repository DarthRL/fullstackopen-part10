import { TextInput as NativeTextInput } from 'react-native';
import theme from '../theme';

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  if (error) {
    textInputStyle.push({borderColor: theme.colors.textError})
  }
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;