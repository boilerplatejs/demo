import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {initializeWithKey} from 'redux-form';
import {Section} from '@machete-platform/core-bundle/components/layout';
import * as Widgets from '@machete-platform/demo-bundle/controllers/Widgets';
import * as forms from '@machete-platform/demo-bundle/components/forms';

@connect(
  state => ({
    widgets: state['@machete-platform/demo-bundle'].Widgets.data,
    editing: state['@machete-platform/demo-bundle'].Widgets.editing,
    error: state['@machete-platform/demo-bundle'].Widgets.error,
    loading: state['@machete-platform/demo-bundle'].Widgets.loading
  }),

  {...Widgets, initializeWithKey })

export default class extends Section {
  static propTypes = {
    widgets: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  };

  render() {
    const handleEdit = (widget) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(widget.id));
    };
    const {widgets, error, editing, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Component.scss');
    return (
      <Section className={styles.widgets}>
        <h1>
          Widgets
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Widgets
          </button>
        </h1>
        <p>
          If you hit refresh on your browser, the data loading will take place on the server before the page is returned.
          If you navigated here from another page, the data was fetched from the client after the route transition.
          This uses the decorator method <code>@asyncConnect</code> with the <code>deferred: true</code> flag. To block
          a route transition until some data is loaded, remove the <code>deffered: true</code> flag.
          To always render before loading data, even on the server, use <code>componentDidMount</code>.
        </p>
        <p>
          This widgets are stored in your session, so feel free to edit it and refresh.
        </p>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error.message}
        </div>}
        {widgets && widgets.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idCol}>ID</th>
            <th className={styles.colorCol}>Color</th>
            <th className={styles.sprocketsCol}>Sprockets</th>
            <th className={styles.ownerCol}>Owner</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            widgets.map((widget) => editing[widget.id] ?
              <forms.Widget formKey={String(widget.id)} key={String(widget.id)} initialValues={widget}/> :
              <tr key={widget.id}>
                <td className={styles.idCol}>{widget.id}</td>
                <td className={styles.colorCol}>{widget.color}</td>
                <td className={styles.sprocketsCol}>{widget.sprocketCount}</td>
                <td className={styles.ownerCol}>{widget.owner}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleEdit(widget)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </Section>
    );
  }
}

