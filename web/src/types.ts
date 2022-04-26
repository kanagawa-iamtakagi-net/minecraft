import { NewPingResult } from "minecraft-protocol"

export interface MinecraftServer {
    name: string
    address: string
    host: string
    port: number
    isOnline: boolean,
    status?: NewPingResult
}

export interface WaterfallConfig {
    listeners: Listener[]
    remote_ping_cache: number
    network_compression_threshold: number
    permissions: Permissions
    log_pings: boolean
    connection_throttle_limit: number
    server_connect_timeout: number
    timeout: number
    stats: string
    player_limit: number
    ip_forward: boolean
    groups: Groups
    remote_ping_timeout: number
    connection_throttle: number
    log_commands: boolean
    prevent_proxy_connections: boolean
    online_mode: boolean
    forge_support: boolean
    disabled_commands: string[]
    servers: Servers
}

export interface Listener {
    query_port: number
    motd: string
    tab_list: string
    query_enabled: boolean
    proxy_protocol: boolean
    forced_hosts: ForcedHosts
    ping_passthrough: boolean
    priorities: string[]
    bind_local_address: boolean
    host: string
    max_players: number
    tab_size: number
    force_default_server: boolean
}

export interface ForcedHosts {
    [host: string]: string
}

export interface Permissions {
    default: string[]
    admin: string[]
}

export interface Groups {
    [group: string]: string[]
}

export interface Servers {
    [name: string]: Server
}

export interface Server {
    motd: string
    address: string
    restricted: boolean
}