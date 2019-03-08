function audit({filenames}) {
  const folderNames = filenames.reduce((memo, filename) => {
    const foldername = filename.split('/').slice(-2)[0];
    memo[foldername] = memo.hasOwnProperty(foldername)
      ? memo[foldername] + 1
      : 1;
    return memo;
  }, {});

  const filenamesCount = filenames.length;
  const distinctFolderCount = Object.keys(folderNames).length;

  return {
    summary: `Found ${filenamesCount} svgs, placed into ${distinctFolderCount} folders`,
    status: 'info',
    info: Object.entries(folderNames)
      .map(([folderName, count]) => {
        return `  ${count} svgs found within a "${folderName}" folder`;
      })
      .join('\n'),
  };
}

audit.auditName = 'folder-names';
module.exports = audit;
