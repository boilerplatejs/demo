import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import surveyValidation from './Validator';
import * as Survey from '@machete-platform/demo-bundle/controllers/Survey';

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

function asyncValidate(data, dispatch, {isValidEmail}) {
  if (!data.email) {
    return Promise.resolve({});
  }
  return isValidEmail(data);
}

@connect(() => ({}), dispatch => bindActionCreators(Survey, dispatch))

@reduxForm({
  form: 'survey',
  fields: ['name', 'email', 'occupation', 'currentlyEmployed', 'sex'],
  validate: surveyValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})

export default class extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      asyncValidating,
      dirty,
      fields: {name, email, occupation, currentlyEmployed, sex},
      active,
      handleSubmit,
      invalid,
      resetForm,
      pristine,
      valid
      } = this.props;
    const styles = require('./Component.scss');
    const renderInput = (field, label, showAsyncValidating) =>
      <div className={'form-group' + (field.error && field.touched ? ' has-error' : '')}>
        <label htmlFor={field.name} className="col-xs-2">{label}</label>
        <div className={'col-xs-8 ' + styles.inputGroup}>
          {showAsyncValidating && asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
          <input type="text" className="form-control" id={field.name} {...domOnlyProps(field)}/>
          {field.error && field.touched && <div className="text-danger">{field.error}</div>}
          <div className={styles.flags}>
            {field.dirty && <span className={styles.dirty} title="Dirty">D</span>}
            {field.active && <span className={styles.active} title="Active">A</span>}
            {field.visited && <span className={styles.visited} title="Visited">V</span>}
            {field.touched && <span className={styles.touched} title="Touched">T</span>}
          </div>
        </div>
      </div>;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {renderInput(name, 'Full Name')}
          {renderInput(email, 'Email')}
          {renderInput(occupation, 'Occupation')}
          <div className="form-group">
            <label htmlFor="currentlyEmployed" className="col-xs-2">Currently Employed?</label>
            <div className="col-xs-8">
              <input type="checkbox" id="currentlyEmployed" {...domOnlyProps(currentlyEmployed)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-xs-2">Sex</label>
            <div className="col-xs-8">
              <input type="radio" id="sex-male" {...domOnlyProps(sex)} value="male" checked={sex.value === 'male'}/>
              <label htmlFor="sex-male" className={styles.radioLabel}>Male</label>
              <input type="radio" id="sex-female" {...domOnlyProps(sex)} value="female" checked={sex.value === 'female'}/>
              <label htmlFor="sex-female" className={styles.radioLabel}>Female</label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-offset-2 col-xs-10">
              <button className="btn btn-success" type="submit">
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>

        <h4>Props from redux-form</h4>

        <table className="table table-striped">
          <tbody>
          <tr>
            <th>Active Field</th>
            <td>{active}</td>
          </tr>
          <tr>
            <th>Dirty</th>
            <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Pristine</th>
            <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Valid</th>
            <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
          </tr>
          <tr>
            <th>Invalid</th>
            <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
