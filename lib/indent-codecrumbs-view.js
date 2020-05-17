'use babel';
/** @jsx etch.dom */
import etch from 'etch';
export default class IndentCodeCrumbsView {
  constructor(properties, children) {
    this.properties = Object.assign({
      crumbs: []
    }, properties);
    etch.initialize(this);
  }

  render() {
    return (
      <indent-codecrumbs>
        <ul className={`indent-codecrumbs`}>
        {
          this.properties.crumbs.map(_ =>
            <li on={{click: () => this.properties.crumbsClick(_)}} className={`indent-codecrumbs__el ${ _.scopeClasses}`}>
              <div className='indent-codecrumbs__crumb-text'>{_.title}</div>
            </li>
          )
        }
        </ul>
      </indent-codecrumbs>
    );
  }

  update(properties, children) {
    this.properties = Object.assign(this.properties, properties);
    return etch.update(this);
  }
  async destroy() {
    await etch.destroy(this);
  }
}
