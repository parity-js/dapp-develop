// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import { observer } from 'mobx-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Form, Input } from '@parity/ui/lib';
import PasswordStrength from '@parity/ui/lib/Form/PasswordStrength';

import ChangeVault from '../ChangeVault';
import styles from '../createAccount.css';

@observer
export default class RawKey extends Component {
  static contextTypes = {
    api: PropTypes.object.isRequired
  }

  static propTypes = {
    createStore: PropTypes.object.isRequired,
    vaultStore: PropTypes.object
  }

  render () {
    const { name, nameError, password, passwordRepeat, passwordRepeatError, passwordHint, rawKey, rawKeyError } = this.props.createStore;

    return (
      <Form>
        <Input
          autoFocus
          error={ rawKeyError }
          hint={
            <FormattedMessage
              id='createAccount.rawKey.private.hint'
              defaultMessage='The raw hex encoded private key'
            />
          }
          label={
            <FormattedMessage
              id='createAccount.rawKey.private.label'
              defaultMessage='Private key'
            />
          }
          onChange={ this.onEditKey }
          value={ rawKey }
        />
        <Input
          error={ nameError }
          hint={
            <FormattedMessage
              id='createAccount.rawKey.name.hint'
              defaultMessage='A descriptive name for the account'
            />
          }
          label={
            <FormattedMessage
              id='createAccount.rawKey.name.label'
              defaultMessage='Account name'
            />
          }
          onChange={ this.onEditName }
          value={ name }
        />
        <Input
          hint={
            <FormattedMessage
              id='createAccount.rawKey.hint.hint'
              defaultMessage='(optional) A hint to help with remembering the password'
            />
          }
          label={
            <FormattedMessage
              id='createAccount.rawKey.hint.label'
              defaultMessage='Password hint'
            />
          }
          onChange={ this.onEditPasswordHint }
          value={ passwordHint }
        />
        <div className={ styles.passwords }>
          <div className={ styles.password }>
            <Input
              hint={
                <FormattedMessage
                  id='createAccount.rawKey.password.hint'
                  defaultMessage='A strong, unique password'
                />
              }
              label={
                <FormattedMessage
                  id='createAccount.rawKey.password.label'
                  defaultMessage='Password'
                />
              }
              onChange={ this.onEditPassword }
              type='password'
              value={ password }
            />
          </div>
          <div className={ styles.password }>
            <Input
              error={ passwordRepeatError }
              hint={
                <FormattedMessage
                  id='createAccount.rawKey.password2.hint'
                  defaultMessage='Verify your password'
                />
              }
              label={
                <FormattedMessage
                  id='createAccount.rawKey.password2.label'
                  defaultMessage='Password (repeat)'
                />
              }
              onChange={ this.onEditPasswordRepeat }
              type='password'
              value={ passwordRepeat }
            />
          </div>
        </div>
        <PasswordStrength input={ password } />
        <ChangeVault
          createStore={ this.props.createStore }
          vaultStore={ this.props.vaultStore }
        />
      </Form>
    );
  }

  onEditName = (event, name) => {
    const { createStore } = this.props;

    createStore.setName(name);
  }

  onEditPasswordHint = (event, passwordHint) => {
    const { createStore } = this.props;

    createStore.setPasswordHint(passwordHint);
  }

  onEditPassword = (event, password) => {
    const { createStore } = this.props;

    createStore.setPassword(password);
  }

  onEditPasswordRepeat = (event, password) => {
    const { createStore } = this.props;

    createStore.setPasswordRepeat(password);
  }

  onEditKey = (event, rawKey) => {
    const { createStore } = this.props;

    createStore.setRawKey(rawKey);
  }
}
