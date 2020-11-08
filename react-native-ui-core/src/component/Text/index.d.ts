import * as React from 'react';
import { TextProps, StyleProp, TextInputProps, TextStyle } from 'react-native';

export interface HighlightLabelProps extends TextProps {
  title: string;
  highlightTitle?: string;
  highlightStyle?: StyleProp<TextStyle>;
}

export interface LabelProps extends TextProps {
  title: string | number;
}

export interface InputProps extends TextInputProps {}

export const HighlightLabel: React.ComponentClass<HighlightLabelProps>;

export const Label: React.ComponentClass<LabelProps>;

export const Input: React.ComponentClass<InputProps>;
