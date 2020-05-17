'use babel';
const rg = /\s*[:\[\]\{\}=]\s*/g;
export default function(lineText) {
  return lineText.replace(rg, '').trim();
};
