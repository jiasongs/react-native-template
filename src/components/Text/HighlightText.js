'use strict';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

function HighlightText(props) {

  const {
    style,
    text,
    highlightText,
    highlightStyle,
  } = props;

  const rangeArray = useMemo(() => {
    let newText = text.slice();
    let index = newText.toLowerCase().indexOf(highlightText.toLowerCase());
    let rangeArray = [];
    while (index != -1) {
      let start = index;
      if (rangeArray.length > 0) {
        start = start + rangeArray.length * highlightText.length;
      }
      rangeArray.push({
        start: start,
        end: start + highlightText.length,
      });
      newText = newText.slice(0, index) + newText.slice(index + highlightText.length, newText.length);
      index = newText.toLowerCase().indexOf(highlightText.toLowerCase());
    }
    return rangeArray;
  }, [highlightText, text]);


  const content = useMemo(() => {
    let lastEnd = 0;
    const rangeTexts = rangeArray.map((item) => {
      const content = (
        <Text style={style} key={`${lastEnd}_${item.start}_${item.end}`}>
          {text.slice(lastEnd, item.start)}
          <Text
            style={highlightStyle}
            key={`center_text_${item.start}-${item.end}`}
          >
            {text.slice(item.start, item.end)}
          </Text>
        </Text>
      );
      lastEnd = item.end;
      return content;
    });
    rangeTexts.push(<Text key={'last_text'} style={style}>{text.slice(lastEnd, text.length)}</Text>);
    return rangeTexts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeArray]);

  return (
    <Text>
      {content}
    </Text>
  );
}

HighlightText.propTypes = {
  style: Text.propTypes.style,
  text: PropTypes.string.isRequired,
  highlightText: PropTypes.string,
  highlightStyle: Text.propTypes.style,
};

HighlightText.defaultProps = {

};

export default React.memo(HighlightText);

