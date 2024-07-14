export interface SocketInfo {
  current: number;
  energy: number;
  frequency: number;
  id: string;
  pf: number;
  power: number;
  status: 'on' | 'off';
  voltage: number;
}

export type Sockets = {
  SCK0002?: SocketInfo;
  SCK0001?: SocketInfo;
};

export type SocketResponse = {
  [k: string]: SocketInfo;
};

export type SocketIdentifiers = 'SCK0002' | 'SCK0001';
