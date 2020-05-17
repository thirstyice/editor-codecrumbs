'use babel';
import common from './common';
const rg = /(const|let|var|interface|class|function|export|public|private)[\s=]/g
export default function(lineText) {
  return common(lineText.replace(rg, ''));
}
