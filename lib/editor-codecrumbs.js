'use babel';

import IndentCodeCrumbs from './indent-codecrumbs';
import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,


  activate(state) {

    addCodeCrumbsForEditor = editor => {
      editorElement=atom.views.getView(editor);
      editorElement.insertBefore((new IndentCodeCrumbs(editor)).getElement(), editorElement.firstChild);
      // editorElement.appendChild((new IndentCodeCrumbs(editor)).getElement());
    }

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.workspace.observeTextEditors(addCodeCrumbsForEditor)
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      deserializer: 'editor-codecrumbs/codecrumbs'
    };
  },
  deserialize(serialized) {
  }
};
