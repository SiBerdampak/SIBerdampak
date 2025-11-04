export {}; // 👈 makes this file a module

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}
