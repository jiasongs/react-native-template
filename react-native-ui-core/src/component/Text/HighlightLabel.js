'use strict';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

function HighlightLabel(props) {
  const { style, title, highlightTitle, highlightStyle } = props;

  const rangeArray = useMemo(() => {
    let newText = title.slice();
    let index = newText.toLowerCase().indexOf(highlightTitle.toLowerCase());
    let rangeData = [];
    while (index !== -1) {
      let start = index;
      if (rangeData.length > 0) {
        start = start + rangeData.length * highlightTitle.length;
      }
      rangeData.push({
        start: start,
        end: start + highlightTitle.length,
      });
      newText =
        newText.slice(0, index) +
        newText.slice(index + highlightTitle.length, newText.length);
      index = newText.toLowerCase().indexOf(highlightTitle.toLowerCase());
    }
    return rangeData;
  }, [highlightTitle, title]);

  const content = useMemo(() => {
    let lastEnd = 0;
    const rangeTexts = rangeArray.map((item) => {
      const contentText = (
        <Label style={style} key={`${lastEnd}_${item.start}_${item.end}`}>
          {title.slice(lastEnd, item.start)}
          <Label
            style={highlightStyle}
            key={`center_text_${item.start}-${item.end}`}
          >
            {title.slice(item.start, item.end)}
          </Label>
        </Label>
      );
      lastEnd = item.end;
      return contentText;
    });
    rangeTexts.push(
      <Label key={'last_text'} style={style}>
        {title.slice(lastEnd, title.length)}
      </Label>,
    );
    return rangeTexts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rangeArray]);

  return <Label>{content}</Label>;
}

HighlightLabel.propTypes = {
  style: Label.propTypes.style,
  title: PropTypes.string.isRequired,
  highlightTitle: PropTypes.string,
  highlightStyle: Label.propTypes.style,
};

HighlightLabel.defaultProps = {
  title: '',
  highlightTitle: '',
};

export default React.memo(HighlightLabel);
