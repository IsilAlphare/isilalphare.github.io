/** Sort a copy so equal dates retain the configured order and empty groups come last. */
export function sortCategoriesByLatestPost(groups) {
  const latest = group => group.posts.reduce((date, post) => Math.max(date, post.data.date.getTime()), -Infinity);
  return groups.map((group, index) => ({ group, index, date: latest(group) }))
    .sort((a, b) => a.date === b.date ? a.index - b.index : b.date - a.date)
    .map(({ group }) => group);
}
