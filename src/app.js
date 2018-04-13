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

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { Link } from 'react-router';

import Page from '@parity/ui/lib/Page';

import styles from './app.css'

import {Grid, Menu } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl';;

const WATCHED_CONTRACTS = 'WATCHED_CONTRACTS';
const DEVELOP = 'DEVELOP';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  render () {
    return (
      <Page
        className = { styles.page }
      >
        <Menu pointing secondary>
          <Menu.Item
            name={WATCHED_CONTRACTS}
            active={this.props.location.pathname === "/" || this.props.location.pathname.startsWith("/contracts/")}
          >
            <Link to="/" className={styles.navLink}>
              <FormattedMessage
                id="dapps.develop.watchedContracts"
                defaultMessage="Watched Contracts"
              />
            </Link>
          </Menu.Item>
          <Menu.Item
            name={DEVELOP}
            active={this.props.location.pathname === "/develop"}
          >
            <Link to="/develop" className={styles.navLink}>
              <FormattedMessage
                id="dapps.develop.develop"
                defaultMessage="Develop"
              />
            </Link>
          </Menu.Item>
        </Menu>
        {this.props.children}
      </Page>
    );
  }
}
