'use babel';

import { CompositeDisposable, Disposable } from 'atom';
import IndentCodeCrumbsView from './indent-codecrumbs-view';
import IndentCollector from './services/indent-collector';

export default class IndentCodeCrumbs {
  constructor(textEditor) {
    this.editor = textEditor
    this.view = new IndentCodeCrumbsView({
      crumbs: [],
      crumbsClick: this.goToPosition.bind(this)
    });

    // Subscribe to cursor position to update crumbs
    this.editorSubscription = this.editor.onDidChangeCursorPosition((data) => {
      if (this.updateClb) {
        clearTimeout(this.updateClb);
      }
      this.updateClb = setTimeout(() => {
        this.updateCrumbsFromEditor(this.editor, data.newBufferPosition);
        // This makes it so that if the cursor is moved more than once in a
        // short period, only the latest movement is reflected, rather than
        // redrawing multiple times
      }, 500);
    });

    this.updateCrumbsFromEditor(this.editor, this.editor.getCursorBufferPosition());
  }

  updateCrumbsFromEditor(textEditor, pos) {
    this.view.update({
      crumbs: IndentCollector.collect(textEditor, pos)
    });
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://editor-codecrumbs';
  }

  getElement() {
    return this.view.element;
  }

  // Optional: Destroy the component. Async/await syntax is pretty but optional.
  async destroy() {
    this.subscriptions.dispose();
    // call etch.destroy to remove the element and destroy child components
    await this.view.destroy();
    // then perform custom teardown logic here...
  }

  goToPosition(crumb) {
    if (this.editor && crumb.pos) {
      this.editor.setCursorBufferPosition(crumb.pos);
    } else {
      atom.notifications.addWarning(`Can't find position. It's strange bug !!`);
    }
  }
}
