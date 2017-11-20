import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import widgetValidation, {colors} from './Validator';
import * as Widgets from '@vitruvian-tech/app-studio-demo/controllers/Widgets';

const domOnlyProps = ({
  initialValue,
  autofill,
  onUpdate,
  valid,
  invalid,
  dirty,
  pristine,
  active,
  touched,
  visited,
  autofilled,
  error,
  ...domProps }) => domProps;

@connect(
  state => ({ saveError: state['@vitruvian-tech/app-studio-demo'].Widgets.saveError }),
  dispatch => bindActionCreators(Widgets, dispatch)
)

@reduxForm({
  form: 'widget',
  fields: ['id', 'color', 'sprocketCount', 'owner'],
  validate: widgetValidation
})

export default class extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const { editStop, fields: {id, color, sprocketCount, owner}, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    const styles = require('@vitruvian-tech/app-studio-demo/components/sections/Widgets/Component.scss');
    return (
      <tr className={submitting ? styles.saving : ''}>
        <td className={styles.idCol}>{id.value}</td>
        <td className={styles.colorCol}>
          <select name="color" className="form-control" {...domOnlyProps(color)}>
            {colors.map(valueColor => <option value={valueColor} key={valueColor}>{valueColor}</option>)}
          </select>
          {color.error && color.touched && <div className="text-danger">{color.error}</div>}
        </td>
        <td className={styles.sprocketsCol}>
          <input type="text" className="form-control" {...domOnlyProps(sprocketCount)}/>
          {sprocketCount.error && sprocketCount.touched && <div className="text-danger">{sprocketCount.error}</div>}
        </td>
        <td className={styles.ownerCol}>
          <input type="text" className="form-control" {...domOnlyProps(owner)}/>
          {owner.error && owner.touched && <div className="text-danger">{owner.error}</div>}
        </td>
        <td className={styles.buttonCol}>
          <button className="btn btn-success"
                  onClick={handleSubmit(() => save(values)
                    .then(result => {
                      if (result && typeof result.error === 'object') {
                        return Promise.reject(result.error);
                      }
                    })
                  )}
                  disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Save
          </button>
          <button className="btn btn-default"
                  onClick={() => editStop(formKey)}
                  disabled={submitting}>
            <i className="fa fa-ban"/> Cancel
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </td>
      </tr>
    );
  }
}
