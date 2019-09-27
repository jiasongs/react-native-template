'use strict';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../Text';

function HighlightText(props) {
  const { style, text, highlightText, highlightStyle } = props;

  const rangeArray = useMemo(() => {
    let newText = text.slice();
    let index = newText.toLowerCase().indexOf(highlightText.toLowerCase());
    let rangeData = [];
    while (index !== -1) {
      let start = index;
      if (rangeData.length > 0) {
        start = start + rangeData.length * highlightText.length;
      }
      rangeData.push({
        start: start,
        end: start + highlightText.length,
      });
      newText =
        newText.slice(0, index) +
        newText.slice(index + highlightText.length, newText.length);
      index = newText.toLowerCase().indexOf(highlightText.toLowerCase());
    }
    return rangeData;
  }, [highlightText, text]);

  const content = useMemo(() => {
    let lastEnd = 0;
    const rangeTexts = rangeArray.map((item) => {
      const contentText = (
        <Label style={style} key={`${lastEnd}_${item.start}_${item.end}`}>
          {text.slice(lastEnd, item.start)}
          <Label
            style={highlightStyle}
            key={`center_text_${item.start}-${item.end}`}
          >
            {text.slice(item.start, item.end)}
          </Label>
        </Label>
      );
      lastEnd = item.end;
      return contentText;
    });
    rangeTexts.push(
      <Label key={'last_text'} style={style}>
        {text.slice(lastEnd, text.length)}
      </Label>,
    );
    return rangeTexts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeArray]);

  return <Label>{content}</Label>;
}

HighlightText.propTypes = {
  style: Label.propTypes.style,
  text: PropTypes.string.isRequired,
  highlightText: PropTypes.string,
  highlightStyle: Label.propTypes.style,
};

HighlightText.defaultProps = {};

export default React.memo(HighlightText);
