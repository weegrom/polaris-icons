declare module '*.svg' {
  const image: any;
  export default image;
}

declare module '*.scss' {
  const classNames: {[key: string]: string};
  export default classNames;
}
