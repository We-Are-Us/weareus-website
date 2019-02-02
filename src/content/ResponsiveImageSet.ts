export enum Breakpoint {
  sm,
  md,
  lg,
  xl
}

class ResponsiveImageSet {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;

  constructor() {}

  getImageForBreakpoint(breakpoint: Breakpoint = Breakpoint.sm): string {
    switch (breakpoint) {
      case Breakpoint.xl:
        const xlUrl = this.xl || this.lg || this.md || this.sm || '';

        return xlUrl;
      case Breakpoint.lg:
        const lgUrl = this.lg || this.xl || this.md || this.sm || '';

        return lgUrl;
      case Breakpoint.md:
        const mdUrl = this.md || this.lg || this.xl || this.sm || '';

        return mdUrl;
      case Breakpoint.sm:
        const smUrl = this.sm || this.md || this.lg || this.xl || '';

        return smUrl;
    }
  }
}

export default ResponsiveImageSet;
