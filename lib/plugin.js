import Vue from 'vue';
import LaravelEcho from 'laravel-echo';
import forEach from 'lodash/forEach';
import isEqual from 'lodash/isEqual';
<% if (options.driver === 'pusher' || options.driver === 'laravel-websockets') { %>import Pusher from 'pusher-js';<% } %>
<% if (options.driver === 'socket.io') { %>import SocketIO from 'socket.io-client';<% } %>

const moduleOptions = <%= serialize(options) %>

// export default async function ({ ctx, inject, router, store }) {
export default (ctx, inject) => {
    const driver = moduleOptions.driver || 'socket.io';

    let authEndpoint = '';
    if (!moduleOptions.endpoint.startsWith('/')) {
        authEndpoint += `/${moduleOptions.endpoint}`;
    } else {
        authEndpoint += moduleOptions.endpoint;
    }
    let configuration = {};

    const drivers = moduleOptions.drivers;

    switch (driver) {
        case 'pusher':
                window.Pusher = Pusher;
                configuration = {
                    broadcaster: 'pusher',
                    authEndpoint: authEndpoint,
                    key: drivers[driver].key,
                    cluster: drivers[driver].cluster,
                    encrypted: true,
                    auth: {
                        headers: {
                            Authorization: `${moduleOptions.authorization.type} ${ctx.store.getters[moduleOptions.authorization.getter]}`
                        }
                    }
                };
            break;
        case 'socket.io':
                let port = drivers[driver].port || 6001;
                window.io = SocketIO;
                const host = drivers[driver].host || window.location.hostname;
                configuration = {
                    broadcaster: 'socket.io',
                    authEndpoint: authEndpoint,
                    host: `${host}:${port}`,
                    auth: {
                        headers: {
                            Authorization: `${moduleOptions.authorization.type} ${ctx.store.getters[moduleOptions.authorization.getter]}`
                        }
                    }
                }
            break;
        case 'laravel-websockets':
                window.Pusher = Pusher;
                let host = drivers[driver].wsHost || window.location.hostname;
                let endpoint = authEndpoint || '/laravel-websockets/auth';
                configuration = {
                    broadcaster: 'pusher',
                    key: drivers[driver].key,
                    wsHost: host,
                    wsPort: drivers[driver].wsPort,
                    wssPort: drivers[driver].wssPort,
                    disableStats: true,
                    authEndpoint: endpoint,
                    encrypted: drivers[driver].encrypted,
                    auth: {
                        headers: {
                            Authorization: `${moduleOptions.authorization.type} ${ctx.store.getters[moduleOptions.authorization.getter]}`
                        }
                    }
                };
                if (drivers[driver].hasOwnProperty('withCluster') && drivers[driver].withCluster) {
                    configuration.cluster = drivers[driver].cluster;
                }
            break;
        default:
            console.error(`Driver '${driver}' is not supported! Please create new issue to request driver support!`);
            break;
    }

    if (Object.keys(configuration).length !== 0) {
        const echo = new LaravelEcho(configuration)
        ctx.$echo = echo;
        inject('echo', echo);
    }
}
