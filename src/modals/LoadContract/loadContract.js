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

import { Subheader, IconButton } from 'material-ui';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button, Portal, Tabs } from '@parity/ui/lib';
import Editor from '@parity/ui/lib/Editor';
import { CancelIcon, CheckIcon, DeleteIcon } from '@parity/ui/lib/Icons';

import styles from './loadContract.css';

const SelectableList = makeSelectable(List);

const REMOVAL_STYLE = {
  backgroundColor: 'none',
  cursor: 'default'
};
const SELECTED_STYLE = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)'
};

export default class LoadContract extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    contracts: PropTypes.object.isRequired,
    snippets: PropTypes.object.isRequired
  };

  state = {
    activeTab: 0,
    selected: -1,
    deleteRequest: false,
    deleteId: -1
  };

  render () {
    const { deleteRequest } = this.state;

    return (
      <Portal
        buttons={ this.renderDialogActions() }
        onClose={ this.onClose }
        open
        title={
          deleteRequest
            ? (
              <FormattedMessage
                id='loadContract.title.remove'
                defaultMessage='confirm removal'
              />
            )
            : (
              <FormattedMessage
                id='loadContract.title.view'
                defaultMessage='view contracts'
              />
            )
        }
      >
        { this.renderBody() }
      </Portal>
    );
  }

  renderBody () {
    if (this.state.deleteRequest) {
      return this.renderConfirmRemoval();
    }

    const { contracts, snippets } = this.props;

    const tabs = [
      {
        label: (
          <FormattedMessage
            id='loadContract.tab.snippets'
            defaultMessage='Snippets'
          />),
        content: (
          <React.Fragment key='snippets'>
            {this.renderEditor()}
            <SelectableList onChange={ this.onClickContract }>
              <Subheader>
                <FormattedMessage
                  id='loadContract.header.snippets'
                  defaultMessage='Contract Snippets'
                />
              </Subheader>
              {this.renderContracts(snippets, false)}
            </SelectableList>
          </React.Fragment>)
      }
    ]; // @TODO selectablelist

    if (Object.keys(contracts).length !== 0) {
      tabs.push({
        label:
  <FormattedMessage
    id='loadContract.tab.local'
    defaultMessage='Local'
  />,
        content:
  <React.Fragment key='local'>
    {this.renderEditor()}
    <SelectableList onChange={ this.onClickContract }>
      <Subheader>
        <FormattedMessage
          id='loadContract.header.saved'
          defaultMessage='Saved Contracts'
        />
      </Subheader>
      {this.renderContracts(contracts)}
    </SelectableList>
  </React.Fragment>
      });
    }

    return (
      <div className={ styles.loadContainer }>
        <Tabs onChange={ this.handleChangeTab } tabs={ tabs.map(t => t.label) } />

        {tabs.filter((_, i) => i === this.state.activeTab).map(t => t.content)}

      </div>
    );
  }

  renderConfirmRemoval () {
    const { deleteId } = this.state;
    const { name, timestamp, sourcecode } = this.props.contracts[deleteId];

    return (
      <div className={ styles.confirmRemoval }>
        <p>
          <FormattedMessage
            id='loadContract.removal.confirm'
            defaultMessage='Are you sure you want to remove the following contract from your saved contracts?'
          />
        </p>
        <ListItem
          primaryText={ name }
          secondaryText={
            <FormattedMessage
              id='loadContract.removal.savedAt'
              defaultMessage='Saved {when}'
              values={ {
                when: moment(timestamp).fromNow()
              } }
            />
          }
          style={ REMOVAL_STYLE }
        />

        <div className={ styles.editor }>
          <Editor
            value={ sourcecode }
            maxLines={ 20 }
            readOnly
          />
        </div>
      </div>
    );
  }

  renderEditor () {
    const { contracts, snippets } = this.props;
    const { selected } = this.state;

    const mergedContracts = Object.assign({}, contracts, snippets);

    if (selected === -1 || !mergedContracts[selected]) {
      return null;
    }

    const { sourcecode, name } = mergedContracts[selected];

    return (
      <div className={ styles.editor }>
        <p>{ name }</p>
        <Editor
          readOnly
          maxLines={ 20 }
          value={ sourcecode }
        />
      </div>
    );
  }

  renderContracts (contracts, removable = true) {
    const { selected } = this.state;

    return Object
      .values(contracts)
      .map((contract) => {
        const { id, name, timestamp, description } = contract;
        const onDelete = () => this.onDeleteRequest(id);

        return (
          <ListItem
            key={ id }
            primaryText={ name }
            rightIconButton={
              removable
                ? (
                  <IconButton onTouchTap={ onDelete }>
                    <DeleteIcon />
                  </IconButton>
                )
                : null
            }
            secondaryText={
              description || (
                <FormattedMessage
                  id='loadContract.contract.savedAt'
                  defaultMessage='Saved {when}'
                  values={ {
                    when: moment(timestamp).fromNow()
                  } }
                />
              )
            }
            style={
              selected === id
                ? SELECTED_STYLE
                : null
            }
            value={ id }
          />
        );
      });
  }

  renderDialogActions () {
    const { deleteRequest } = this.state;

    if (deleteRequest) {
      return [
        <Button
          icon={ <CancelIcon /> }
          key='No'
          label={
            <FormattedMessage
              id='loadContract.button.no'
              defaultMessage='No'
            />
          }
          onClick={ this.onRejectRemoval }
        />,
        <Button
          icon={ <DeleteIcon /> }
          key='Yes'
          label={
            <FormattedMessage
              id='loadContract.button.yes'
              defaultMessage='Yes'
            />
          }
          onClick={ this.onConfirmRemoval }
        />
      ];
    }

    return [
      <Button
        key='cancel'
        icon={ <CancelIcon /> }
        label={
          <FormattedMessage
            id='loadContract.button.cancel'
            defaultMessage='Cancel'
          />
        }
        onClick={ this.onClose }
      />,
      <Button
        key='load'
        disabled={ this.state.selected === -1 }
        icon={ <CheckIcon /> }
        label={
          <FormattedMessage
            id='loadContract.button.load'
            defaultMessage='Load'
          />
        }
        onClick={ this.onLoad }
      />
    ];
  }

  handleChangeTab = (i) => {
    this.setState({ selected: -1, activeTab: i });
  }

  onClickContract = (event, selected) => {
    this.setState({ selected });
  }

  onClose = () => {
    this.props.onClose();
  }

  onLoad = () => {
    const { contracts, snippets } = this.props;
    const { selected } = this.state;

    const mergedContracts = Object.assign({}, contracts, snippets);
    const contract = mergedContracts[selected];

    this.props.onLoad(contract);
    this.props.onClose();
  }

  onDeleteRequest = (id) => {
    this.setState({
      deleteRequest: true,
      deleteId: id
    });
  }

  onConfirmRemoval = () => {
    const { deleteId } = this.state;

    this.props.onDelete(deleteId);

    this.setState({
      deleteRequest: false,
      deleteId: -1,
      selected: -1
    });
  }

  onRejectRemoval = () => {
    this.setState({
      deleteRequest: false,
      deleteId: -1
    });
  }
}
