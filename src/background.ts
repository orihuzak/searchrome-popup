import Fuse from 'fuse.js';



/** fuse option */
const FUSE_OPTION = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 1,
  threshold: 0.35, // 0に近ければより厳しい
  maxPatternLength: 32,
  keys: ['title', 'url'],
}