export type Device = {
  id: string;
  name: string;
  width: number;
  height: number;
  dpr: number;
  kind: 'phone' | 'tablet' | 'laptop' | 'desktop';
  island?: boolean;
};
export const presets: Device[] = [
  { id: 'se', name: 'iPhone SE', width: 375, height: 667, dpr: 2, kind: 'phone' },
  {
    id: 'pro',
    name: 'iPhone 17 Pro',
    width: 402,
    height: 874,
    dpr: 3,
    kind: 'phone',
    island: true,
  },
  {
    id: 'pixel',
    name: 'Google Pixel',
    width: 412,
    height: 915,
    dpr: 2.625,
    kind: 'phone',
    island: true,
  },
  { id: 'ipad', name: 'iPad', width: 820, height: 1180, dpr: 2, kind: 'tablet' },
  { id: 'mac', name: 'MacBook Air', width: 1440, height: 900, dpr: 2, kind: 'laptop' },
  { id: 'desktop', name: '1920 Desktop', width: 1920, height: 1080, dpr: 1, kind: 'desktop' },
];
