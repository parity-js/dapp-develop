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

// import HistoryStore from '@parity/shared/lib/mobx/historyStore';
/// import { Accounts, Account, Addresses, Address, Application, Contract, Contracts, Home, Settings, SettingsBackground, SettingsParity, SettingsProxy, SettingsViews, Status, Vaults, Wallet, Web, WriteContract } from '~/views';
import { Contract, Contracts, WriteContract } from '~/views';
import App from '~/app';
// import builtinDapps from '~/views/Dapps/builtin.json';

// const accountsHistory = HistoryStore.get('accounts');
// const dappsHistory = HistoryStore.get('dapps');

const routes = [
  {
    path: '/',
    component: App,
    indexRoute: { component: Contracts },
    childRoutes: [
        { path: 'develop', component: WriteContract },
        { path: 'contracts/:address', component: Contract }
    ]
  }
];

// TODO : use ES6 imports when supported
// if (process.env.NODE_ENV !== 'production') {
//   const Playground = require('./playground').default;

//   childRoutes.push({
//     path: 'playground',
//     component: Playground
//   });
// }
// TODO RE-ADD ^
// TODO what is playground?

// routes.push({
//   path: '/',
//   component: Application,
//   childRoutes
// });

export default routes;
