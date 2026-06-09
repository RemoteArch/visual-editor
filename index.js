/**
 * Block Registry
 * Dynamically imports all individual block files and exports them in visual.jsx format
 */

async function getBlockFiles() {
  try {
    const response = await fetch('blocks.php');
    const blockFiles = await response.json();
    return blockFiles;
  } catch (error) {
    console.error('Failed to fetch block files:', error);
    // Fallback to default list if fetch fails
    return [];
  }
}

/**
 * Convert json_config to visual.jsx block format
 */
function configToBlock(config, component) {
  return {
    name: config.type,
    category: config.category,
    icon: config.icon || "fa-solid fa-cube",
    description: config.description,
    allowChildren: config.acceptsChildren,
    isRoot: config.isRoot || false,
    defaultProps: Object.fromEntries(
      Object.entries(config.props).map(([key, prop]) => [key, prop.default])
    ),
    propsSchema: Object.fromEntries(
      Object.entries(config.props).map(([key, prop]) => [
        key,
        {
          type: prop.type,
          label: prop.label,
          ...(prop.options && { options: prop.options })
        }
      ])
    ),
    component
  };
}

/**
 * Load all blocks dynamically using Promise.all
 */
export async function loadBlocks() {
  const blockFiles = await getBlockFiles();
  const imports = await Promise.all(
    blockFiles.map(async (file) => {
      try {
        const module = await loadModule(`${file}`);
        const component = module.default;
        const config = module.json_config;
        return configToBlock(config, component);
      } catch (error) {
        console.error(`Failed to load block ${file}:`, error);
        return null;
      }
    })
  );
  
  return imports.filter(block => block !== null);
}

/**
 * Load blocks synchronously (for initial load)
 * Falls back to dynamic loading if needed
 */
let cachedBlocks = null;
let loadPromise = null;

export async function getBlocks() {
  if (cachedBlocks) {
    return cachedBlocks;
  }
  if (!loadPromise) {
    loadPromise = loadBlocks();
  }
  cachedBlocks = await loadPromise;
  return cachedBlocks;
}

/**
 * Export DEFAULT_BLOCKS as a promise
 * For compatibility with visual.jsx - it will await this
 */
export const DEFAULT_BLOCKS = await getBlocks();

export default DEFAULT_BLOCKS;
