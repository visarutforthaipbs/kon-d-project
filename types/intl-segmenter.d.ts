// Type definitions for Intl.Segmenter
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter

declare namespace Intl {
  type SegmenterGranularity = "grapheme" | "word" | "sentence";

  interface SegmenterOptions {
    granularity?: SegmenterGranularity;
    localeMatcher?: "lookup" | "best fit";
  }

  interface Segment {
    segment: string;
    index: number;
    input: string;
    isWordLike?: boolean;
  }

  interface Segments {
    containing(index: number): Segment;
    [Symbol.iterator](): IterableIterator<Segment>;
  }

  class Segmenter {
    constructor(locales?: string | string[], options?: SegmenterOptions);
    segment(input: string): Segments;
    resolvedOptions(): {
      locale: string;
      granularity: SegmenterGranularity;
    };
  }
}
