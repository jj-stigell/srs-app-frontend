import React from 'react';

const furiStyle = {
  display: 'block',
  fontSize: '1.0em',
  letterSpacing: '-0.02em',
  margin: '0 0.1em',
  paddingTop: '0.2em',
  paddingBottom: '0.1em',
  // don't interfere with selection of the content text
  userSelect: 'none',
  opacity: '0.9',
};

const textStyle = {
  fontSize: '24px',
  display: 'block',
};

export function Furigana({ style, ...props }) {
  return <span lang="ja" style={{ ...furiStyle, ...style }} {...props} />;
}

export function Kanji({ style, ...props }) {
  return <span lang="ja" style={{ ...textStyle, ...style }} {...props} />;
}

const AddFurigana = ({ kanji = '', furigana = '' }) => {
  return (
    <div>
      <Furigana>{furigana}</Furigana>
      <Kanji>{kanji}</Kanji>
    </div>
  );
};

export default AddFurigana;
