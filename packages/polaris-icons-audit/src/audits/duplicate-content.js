const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function audit({filenames, baseDir}) {
  const dependentsByHash = filenames.reduce((memo, filename) => {
    const contentHash = md5File(path.join(baseDir, filename));

    if (!(contentHash in memo)) {
      memo[contentHash] = [];
    }
    memo[contentHash].push(filename);

    return memo;
  }, {});

  const duplicatedDependentsByHash = Object.keys(dependentsByHash).reduce(
    (memo, filename) => {
      if (dependentsByHash[filename].length > 1) {
        memo[filename] = dependentsByHash[filename];
      }
      return memo;
    },
    {},
  );

  const duplicatedHashes = Object.keys(duplicatedDependentsByHash);
  const duplicatedHashesCount = duplicatedHashes.length;

  return {
    summary: `Found ${duplicatedHashesCount} content hashes that are shared by multiple files`,
    info: duplicatedHashes
      .map((hash) => {
        const count = duplicatedDependentsByHash[hash].length;

        const filesStr = duplicatedDependentsByHash[hash]
          .map((file) => `    ${file}`)
          .join('\n');

        return `  ${hash} matches content used in ${count} files:\n${filesStr}`;
      })
      .join('\n'),
  };
}

const BUFFER_SIZE = 8192;

function md5File(filename) {
  const fd = fs.openSync(filename, 'r');
  const hash = crypto.createHash('md5');
  const buffer = Buffer.alloc(BUFFER_SIZE);

  try {
    let bytesRead;

    do {
      bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE);
      hash.update(buffer.slice(0, bytesRead));
    } while (bytesRead === BUFFER_SIZE);
  } finally {
    fs.closeSync(fd);
  }

  return hash.digest('hex');
}

audit.auditName = 'duplicate-content';
audit.type = 'info';
module.exports = audit;
