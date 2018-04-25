// Copyright 2015-2018 Parity Technologies (UK) Ltd.
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { DeployContract as DeployContractModal } from '~/modals';

class DeployContract extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    accounts: PropTypes.object
  }

  onComplete = () => {
    this.context.router.push('/');
  }

  render () {
    const { accounts } = this.props;

    return (
      <DeployContractModal
        asModal={ false }
        accounts={ accounts }
        onClose={ this.onComplete }
      />);
  }
}

function mapStateToProps (state) {
  const { accounts } = state.personal;

  return {
    accounts
  };
}

export default connect(
  mapStateToProps,
  null
)(DeployContract);
