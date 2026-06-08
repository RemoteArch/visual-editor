/**
 * Block Registry
 * Dynamically imports all individual block files and exports them in visual.jsx format
 */

const BLOCK_FILES = [
  'Page.jsx',
  'Heading.jsx',
  'TextEditor.jsx',
  'Button.jsx',
  'Image.jsx',
  'Divider.jsx',
  'Spacer.jsx',
  'Icon.jsx',
  'IconBox.jsx',
  'Alert.jsx',
  'CallToAction.jsx',
  'Section.jsx',
  'Container.jsx',
  'Columns.jsx',
  'Column.jsx',
  'FlexContainer.jsx',
  'Grid.jsx',
  'InnerSection.jsx',
  'Paragraph.jsx',
  'Blockquote.jsx',
  'List.jsx',
  'Code.jsx',
  'Link.jsx',
  'Form.jsx',
  'Input.jsx',
  'Textarea.jsx',
  'Select.jsx',
  'Checkbox.jsx',
  'Radio.jsx',
  'SubmitButton.jsx',
  'Video.jsx',
  'Gallery.jsx',
  'Map.jsx',
  'Audio.jsx',
  'Tabs.jsx',
  'Accordion.jsx',
  'Counter.jsx',
  'ProgressBar.jsx',
  'Testimonial.jsx',
  'PriceTable.jsx',
  'Countdown.jsx',
  'SocialIcons.jsx',
  'Breadcrumb.jsx',
  'Pagination.jsx',
  'SearchBar.jsx',
  'Menu.jsx',
  'Logo.jsx',
  'Copyright.jsx'
];

/**
 * Icon mapping for blocks (Font Awesome)
 */
const BLOCK_ICONS = {
  Page: "fa-solid fa-file",
  Heading: "fa-solid fa-heading",
  TextEditor: "fa-solid fa-align-left",
  Button: "fa-solid fa-hand-pointer",
  Image: "fa-solid fa-image",
  Divider: "fa-solid fa-minus",
  Spacer: "fa-solid fa-arrows-up-down",
  Icon: "fa-solid fa-star",
  IconBox: "fa-solid fa-box",
  Alert: "fa-solid fa-triangle-exclamation",
  CallToAction: "fa-solid fa-bolt",
  Section: "fa-solid fa-layer-group",
  Container: "fa-solid fa-box-open",
  Columns: "fa-solid fa-table-columns",
  Column: "fa-solid fa-grip-vertical",
  FlexContainer: "fa-solid fa-grip-lines-vertical",
  Grid: "fa-solid fa-table-cells",
  InnerSection: "fa-solid fa-square",
  Paragraph: "fa-solid fa-paragraph",
  Blockquote: "fa-solid fa-quote-left",
  List: "fa-solid fa-list",
  Code: "fa-solid fa-code",
  Link: "fa-solid fa-link",
  Form: "fa-solid fa-file-signature",
  Input: "fa-solid fa-keyboard",
  Textarea: "fa-solid fa-font",
  Select: "fa-solid fa-caret-down",
  Checkbox: "fa-solid fa-square-check",
  Radio: "fa-solid fa-circle-dot",
  SubmitButton: "fa-solid fa-paper-plane",
  Video: "fa-solid fa-video",
  Gallery: "fa-solid fa-images",
  Map: "fa-solid fa-map-location-dot",
  Audio: "fa-solid fa-volume-high",
  Tabs: "fa-solid fa-folder",
  Accordion: "fa-solid fa-angles-up-down",
  Counter: "fa-solid fa-hashtag",
  ProgressBar: "fa-solid fa-bars-progress",
  Testimonial: "fa-solid fa-comments",
  PriceTable: "fa-solid fa-tag",
  Countdown: "fa-solid fa-clock",
  SocialIcons: "fa-solid fa-share-nodes",
  Breadcrumb: "fa-solid fa-angle-right",
  Pagination: "fa-solid fa-angles-left-right",
  SearchBar: "fa-solid fa-magnifying-glass",
  Menu: "fa-solid fa-bars",
  Logo: "fa-solid fa-shapes",
  Copyright: "fa-solid fa-copyright"
};

/**
 * Convert json_config to visual.jsx block format
 */
function configToBlock(config, component) {
  return {
    name: config.type,
    category: config.category,
    icon: BLOCK_ICONS[config.type] || "◻",
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
  const imports = await Promise.all(
    BLOCK_FILES.map(async (file) => {
      try {
        const module = await loadModule(`blocks/${file}`);
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
