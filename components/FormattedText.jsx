import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FormattedText = ({responseString}) => {
    if(!responseString) return

    let formattedString = responseString;

  // Convert markdown bold and italic to React Native text with styles
  formattedString = formattedString.replace(/\*\*(.*?)\*\*/g, '<Bold>$1</Bold>');

  // Convert the formatted string into React Native elements
  const renderElement = (text) => {
    const elementRegex = /<(Bold)>(.*?)<\/\1>/g;
    let match;
    const elements = [];

    let lastIndex = 0;
    while ((match = elementRegex.exec(text)) !== null) {
      const [fullMatch, tag, content] = match;
      if (lastIndex < match.index) {
        elements.push(<Text key={lastIndex}>{text.substring(lastIndex, match.index)}</Text>);
      }
      switch (tag) {
        case 'Bold':
          elements.push(<Text key={match.index} style={styles.bold}>{content}</Text>);
          break;
        default:
          break;
      }
      lastIndex = elementRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      elements.push(<Text key={lastIndex}>{text.substring(lastIndex)}</Text>);
    }

    return elements;
  };

  return (
    <Text style={styles.container}>
      {renderElement(formattedString)}
    </Text>
  )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 14,
    },
    bold: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default FormattedText