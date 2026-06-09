const {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} = React;

/* =============================================================
 * 1. DEFAULT BLOCK REGISTRY
 *   - name:          Component name used in generated JSX
 *   - category:      Sidebar grouping
 *   - icon:          Small text glyph
 *   - description:   Tooltip / sub-text
 *   - allowChildren: Whether the block can host children
 *   - isRoot:        True for the root <Page>
 *   - defaultProps:  Props applied when inserted
 *   - propsSchema:   Auto-generates the inspector fields
 *   - component:     React renderer
 * ============================================================= */

const DEFAULT_BLOCKS = [];

/* =============================================================
 * 2. UTILITIES
 * ============================================================= */

const uid = () =>
  "n_" +
  Math.random().toString(36).slice(2, 9) +
  Date.now().toString(36).slice(-3);

const cloneNodeDeep = (node) => ({
  id: uid(),
  type: node.type,
  props: { ...(node.props || {}) },
  children: (node.children || []).map(cloneNodeDeep),
});

const ensureIds = (node) => {
  if (!node) return node;
  return {
    id: node.id || uid(),
    type: node.type,
    props: { ...(node.props || {}) },
    children: (node.children || []).map(ensureIds),
  };
};

const findNode = (root, id) => {
  if (!root) return null;
  if (root.id === id) return root;
  for (const child of root.children || []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
};

const findParent = (root, id) => {
  if (!root || !root.children) return null;
  for (const child of root.children) {
    if (child.id === id) return root;
    const found = findParent(child, id);
    if (found) return found;
  }
  return null;
};

const isDescendant = (node, possibleAncestorId) => {
  if (!node) return false;
  if (node.id === possibleAncestorId) return true;
  for (const c of node.children || []) {
    if (isDescendant(c, possibleAncestorId)) return true;
  }
  return false;
};

const immutableUpdate = (root, id, updater) => {
  if (root.id === id) return updater(root);
  return {
    ...root,
    children: (root.children || []).map((c) => immutableUpdate(c, id, updater)),
  };
};

const immutableRemove = (root, id) => {
  if (!root.children) return root;
  return {
    ...root,
    children: root.children
      .filter((c) => c.id !== id)
      .map((c) => immutableRemove(c, id)),
  };
};

const immutableInsert = (root, parentId, index, newNode) => {
  if (root.id === parentId) {
    const children = [...(root.children || [])];
    const idx = index < 0 || index > children.length ? children.length : index;
    children.splice(idx, 0, newNode);
    return { ...root, children };
  }
  return {
    ...root,
    children: (root.children || []).map((c) =>
      immutableInsert(c, parentId, index, newNode)
    ),
  };
};

/* =============================================================
 * 3. JSX GENERATION
 * ============================================================= */


const generateJsx = (node, indent = 0) => {
  const spaces = "  ".repeat(indent);

  // Handle root type - use React Fragment
  if (node.type === "root") {
    const children = node.children || [];
    if (children.length === 0) return "<></>";
    const childrenJsx = children
      .map((child) => generateJsx(child, indent))
      .join("\n");
    return `<>${childrenJsx ? "\n" + childrenJsx + "\n" : ""}</>`;
  }

  const props = Object.entries(node.props || {})
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  const tagName = node.type;
  const openTag = props ? `<${tagName} ${props}>` : `<${tagName}>`;
  const selfClosingTag = props ? `<${tagName} ${props} />` : `<${tagName} />`;

  const children = node.children || [];

  if (children.length === 0) {
    return `${spaces}${selfClosingTag}`;
  }

  const childrenJsx = children
    .map((child) => generateJsx(child, indent + 1))
    .join("\n");

  return `${spaces}${openTag}\n${childrenJsx}\n${spaces}</${tagName}>`;
};

/* =============================================================
 * 4. SUB-COMPONENTS
 * ============================================================= */

function Toolbar({
  device,
  setDevice,
  previewMode,
  setPreviewMode,
  showJsx,
  setShowJsx,
  onExportJson,
  onExportJsx,
  jsx,
  tree,
  canUndo,
  canRedo,
  undo,
  redo,
}) {
  const btnBase =
    "inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors border border-transparent";
  const btnActive = "bg-zinc-800 text-zinc-100 border-zinc-700";

  return (
    <div className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0">
      <div className="font-bold tracking-wide text-[13px]">
        React<span className="text-indigo-400">Builder</span>
      </div>
      <div className="w-px h-5 bg-zinc-800 mx-1.5" />
      <button
        className={`${btnBase} ${!canUndo ? "opacity-40 cursor-not-allowed" : ""}`}
        onClick={undo}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
      >
        ↶
      </button>
      <button
        className={`${btnBase} ${!canRedo ? "opacity-40 cursor-not-allowed" : ""}`}
        onClick={redo}
        disabled={!canRedo}
        title="Redo (Ctrl+Y)"
      >
        ↷
      </button>
      <div className="flex-1" />
      <div className="flex items-center gap-1">
        <button
          className={`${btnBase} ${device === "desktop" ? btnActive : ""}`}
          onClick={() => setDevice("desktop")}
          title="Desktop"
        >
          🖥 Desktop
        </button>
        <button
          className={`${btnBase} ${device === "tablet" ? btnActive : ""}`}
          onClick={() => setDevice("tablet")}
          title="Tablet"
        >
          ▭ Tablet
        </button>
        <button
          className={`${btnBase} ${device === "mobile" ? btnActive : ""}`}
          onClick={() => setDevice("mobile")}
          title="Mobile"
        >
          ▯ Mobile
        </button>
      </div>
      <div className="flex-1" />
      <button
        className={`${btnBase} ${previewMode ? btnActive : ""}`}
        onClick={() => setPreviewMode((p) => !p)}
        title="Toggle preview mode"
      >
        {previewMode ? "✎ Edit" : "▶ Preview"}
      </button>
      <button
        className={`${btnBase} ${showJsx ? btnActive : ""}`}
        onClick={() => setShowJsx((s) => !s)}
        title="Show generated JSX"
      >
        {"{} JSX"}
      </button>
      <button
        className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-colors font-medium"
        onClick={() => {
          if (onExportJson) onExportJson(tree);
          if (onExportJsx) onExportJsx(jsx);
        }}
        title="Export"
      >
        ⤓ Export
      </button>
    </div>
  );
}

function BlocksLibrary({ registry, onAddBlock }) {
  const [search, setSearch] = useState("");
  const grouped = useMemo(() => {
    const filtered = Object.values(registry).filter((b) => {
      if (b.isRoot) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        b.name.toLowerCase().includes(q) ||
        (b.description || "").toLowerCase().includes(q) ||
        (b.category || "").toLowerCase().includes(q)
      );
    });
    const groups = {};
    filtered.forEach((b) => {
      const cat = b.category || "Other";
      groups[cat] = groups[cat] || [];
      groups[cat].push(b);
    });
    return groups;
  }, [registry, search]);

  return (
    <div className="flex-1 overflow-auto p-3">
      <input
        className="w-full h-8 px-2.5 rounded-md bg-zinc-800 border border-zinc-700 text-xs text-zinc-100 placeholder-zinc-500 outline-none focus:border-indigo-500"
        placeholder="Search blocks…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {Object.keys(grouped).length === 0 && (
        <div className="text-zinc-500 text-xs text-center py-6">
          No blocks found.
        </div>
      )}
      {Object.entries(grouped).map(([cat, blocks]) => (
        <div key={cat}>
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mt-4 mb-1.5">
            {cat}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {blocks.map((b) => (
              <div
                key={b.name}
                className="bg-zinc-800 border border-zinc-700 rounded-md py-2.5 px-2 flex flex-col items-center gap-1 cursor-pointer select-none hover:border-indigo-500 hover:bg-zinc-700/60 transition-colors"
                onClick={() => onAddBlock(b.name)}
                title={b.description}
              >
                <span className="text-base text-indigo-400 leading-none">
                  <i className={b.icon}></i>
                </span>
                <span className="text-[11px] text-zinc-100 text-center">
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function LayersPanel({
  tree,
  selectedId,
  onSelect,
  onDuplicate,
  onRemove,
  registry,
}) {
  const [collapsed, setCollapsed] = useState({});
  const toggle = (id) => setCollapsed((c) => ({ ...c, [id]: !c[id] }));

  const renderNode = (node, depth = 0) => {
    const isSel = node.id === selectedId;
    const hasChildren = (node.children || []).length > 0;
    const isCollapsed = collapsed[node.id];
    const meta = registry[node.type];
    return (
      <li key={node.id}>
        <div
          className={`flex items-center gap-1 px-1.5 py-1 rounded text-xs cursor-pointer border ${
            isSel
              ? "bg-indigo-500/20 text-zinc-100 border-indigo-500/40"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 border-transparent"
          }`}
          onClick={() => onSelect(node.id)}
          style={{ paddingLeft: 6 + depth * 14 }}
        >
          <button
            className="bg-transparent border-0 text-zinc-500 w-3.5 text-[10px] p-0 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) toggle(node.id);
            }}
            style={{ visibility: hasChildren ? "visible" : "hidden" }}
          >
            {isCollapsed ? "▸" : "▾"}
          </button>
          <span className="text-indigo-400 w-3.5 text-center text-[11px]">
            <i className={meta?.icon || "fa-solid fa-circle"}></i>
          </span>
          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {node.type}
          </span>
          {!meta?.isRoot && (
            <>
              <button
                className="w-5 h-5 inline-flex items-center justify-center text-zinc-500 hover:text-zinc-100 hover:bg-zinc-700 rounded text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(node.id);
                }}
                title="Duplicate"
              >
                ⎘
              </button>
              <button
                className="w-5 h-5 inline-flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(node.id);
                }}
                title="Delete"
              >
                ×
              </button>
            </>
          )}
        </div>
        {hasChildren && !isCollapsed && (
          <ul className="list-none p-0 m-0">
            {node.children.map((c) => renderNode(c, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="flex-1 overflow-auto p-3">
      {tree ? (
        <ul className="list-none p-0 m-0">{renderNode(tree, 0)}</ul>
      ) : (
        <div className="text-zinc-500 text-xs text-center py-6">No content.</div>
      )}
    </div>
  );
}

function PropsInspector({
  node,
  registry,
  onUpdateProps,
  onDuplicate,
  onRemove,
}) {
  if (!node) {
    return (
      <div className="flex-1 overflow-auto p-3">
        <div className="text-zinc-500 text-xs text-center py-6 leading-relaxed">
          Select an element on the canvas to edit its properties.
        </div>
      </div>
    );
  }
  const meta = registry[node.type];
  if (!meta) {
    return (
      <div className="flex-1 overflow-auto p-3">
        <div className="text-zinc-500 text-xs text-center py-6">
          Unknown component: {node.type}
        </div>
      </div>
    );
  }

  const schema = meta.propsSchema || {};
  const setProp = (key, value) =>
    onUpdateProps(node.id, { ...node.props, [key]: value });

  const inputBase =
    "w-full bg-zinc-800 text-zinc-100 border border-zinc-700 rounded px-2 py-1.5 text-xs outline-none focus:border-indigo-500";

  return (
    <div className="flex-1 overflow-auto p-3">
      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-2">
          {node.type}
        </div>
        <div className="text-[11px] text-zinc-500 mb-2">
          {meta.description}
        </div>
        {!meta.isRoot && (
          <div className="flex gap-1.5">
            <button
              className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-xs text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
              onClick={() => onDuplicate(node.id)}
            >
              ⎘ Duplicate
            </button>
            <button
              className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-xs text-red-400 bg-zinc-800 hover:bg-red-500/15 border border-zinc-700"
              onClick={() => onRemove(node.id)}
            >
              × Delete
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-2">
          Properties
        </div>
        {Object.keys(schema).length === 0 && (
          <div className="text-[11px] text-zinc-500">
            No editable properties.
          </div>
        )}
        {Object.entries(schema).map(([key, field]) => {
          const value = node.props?.[key] ?? "";
          return (
            <div className="mb-3" key={key}>
              <label className="block text-[11px] text-zinc-400 mb-1 font-medium">
                {field.label || key}
              </label>
              {field.type === "textarea" && (
                <textarea
                  className={`${inputBase} resize-y min-h-[64px]`}
                  value={value}
                  onChange={(e) => setProp(key, e.target.value)}
                />
              )}
              {field.type === "select" && (() => {
                const [customValue, setCustomValue] = React.useState("");
                const isOther = value === "other" || !(field.options || []).includes(value);
                
                return (
                  <div>
                    <select
                      className={inputBase}
                      value={isOther ? "other" : value}
                      onChange={(e) => {
                        if (e.target.value === "other") {
                          setProp(key, "other");
                        } else {
                          setProp(key, e.target.value);
                          setCustomValue("");
                        }
                      }}
                    >
                      {(field.options || []).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                      <option value="other">Other...</option>
                    </select>
                    {isOther && (
                      <input
                        className={`${inputBase} mt-2`}
                        type="text"
                        placeholder="Enter custom value (e.g., 100vh, 50%, 2rem)"
                        value={value === "other" ? customValue : value}
                        onChange={(e) => setCustomValue(e.target.value)}
                        onBlur={(e) => setProp(key, e.target.value)}
                      />
                    )}
                  </div>
                );
              })()}
              {(field.type === "string" ||
                field.type === "classes" ||
                !field.type) && (
                <input
                  className={`${inputBase} ${
                    field.type === "classes" ? "font-mono text-[11px]" : ""
                  }`}
                  type="text"
                  value={value}
                  onChange={(e) => setProp(key, e.target.value)}
                />
              )}
              {field.type === "number" && (
                <input
                  className={inputBase}
                  type="number"
                  value={value}
                  onChange={(e) => setProp(key, Number(e.target.value))}
                />
              )}
              {field.type === "boolean" && (
                <label className="inline-flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => setProp(key, e.target.checked)}
                  />
                  <span className="text-xs text-zinc-400">
                    {field.label || key}
                  </span>
                </label>
              )}
              {field.type === "color" && (
                <input
                  className={inputBase}
                  type="color"
                  value={value}
                  onChange={(e) => setProp(key, e.target.value)}
                  style={{ height: "32px", padding: "2px" }}
                />
              )}
              {field.type === "int" && (
                <input
                  className={inputBase}
                  type="number"
                  value={value}
                  onChange={(e) => setProp(key, parseInt(e.target.value) || 0)}
                  step="1"
                />
              )}
              {field.type === "double" && (
                <input
                  className={inputBase}
                  type="number"
                  value={value}
                  onChange={(e) => setProp(key, parseFloat(e.target.value) || 0)}
                  step="0.01"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Context Menu ---------- */

function ContextMenu({ x, y, registry, onAddBlock, onClose }) {
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const groups = {};
  Object.values(registry).forEach((b) => {
    const cat = b.category || "Other";
    groups[cat] = groups[cat] || [];
    groups[cat].push(b);
  });

  return (
    <div
      ref={menuRef}
      className="fixed bg-zinc-800 border border-zinc-700 rounded-md shadow-xl z-50 min-w-[200px]"
      style={{ left: x, top: y }}
    >
      <div className="p-1">
        {Object.entries(groups).map(([cat, blocks]) => (
          <div key={cat}>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold px-2 py-1">
              {cat}
            </div>
            {blocks.map((b) => (
              <button
                key={b.name}
                className="w-full text-left px-2 py-1.5 text-xs text-zinc-100 hover:bg-zinc-700 rounded flex items-center gap-2"
                onClick={() => onAddBlock(b.name)}
              >
                <span className="text-indigo-400">{b.icon}</span>
                <span>{b.name}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Canvas node renderer ---------- */

function NodeWrapper({
  node,
  registry,
  selectedId,
  hoveredId,
  setHoveredId,
  onSelect,
  onDuplicate,
  onRemove,
  onAddBlock,
  previewMode,
  onContextMenu,
}) {
  // Handle root type - just render children without wrapper
  if (node.type === "root") {
    return (
      <>
        {(node.children || []).map((c) => (
          <NodeWrapper
            key={c.id}
            node={c}
            registry={registry}
            selectedId={selectedId}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            onSelect={onSelect}
            onDuplicate={onDuplicate}
            onRemove={onRemove}
            onAddBlock={onAddBlock}
            previewMode={previewMode}
            onContextMenu={onContextMenu}
          />
        ))}
      </>
    );
  }

  const meta = registry[node.type];
  if (!meta) {
    return (
      <div className="p-2 bg-red-50 text-red-700 text-xs">
        Unknown component: {node.type}
      </div>
    );
  }
  const Comp = meta.component;
  const isSelected = node.id === selectedId;
  const isHovered = node.id === hoveredId;
  const isRoot = meta.isRoot;

  // Build the rendered children (recursive)
  const childNodes = (node.children || []).map((c) => (
    <NodeWrapper
      key={c.id}
      node={c}
      registry={registry}
      selectedId={selectedId}
      hoveredId={hoveredId}
      setHoveredId={setHoveredId}
      onSelect={onSelect}
      onDuplicate={onDuplicate}
      onRemove={onRemove}
      onAddBlock={onAddBlock}
      previewMode={previewMode}
      onContextMenu={onContextMenu}
    />
  ));

  // Empty container placeholder
  let renderedChildren = childNodes;
  if (
    !previewMode &&
    meta.allowChildren &&
    (!node.children || node.children.length === 0)
  ) {
    renderedChildren = (
      <div 
        className="m-1 py-12 px-3 border-2 border-dashed border-gray-300 rounded text-center text-gray-400 text-xs min-h-[200px] flex items-center justify-center"
        onContextMenu={(e) => {
          e.preventDefault();
          onContextMenu(e, node.id);
        }}
      >
        Right-click to add blocks
      </div>
    );
  }

  // Preview mode: render the component without any wrapper chrome
  if (previewMode) {
    return <Comp {...node.props}>{renderedChildren}</Comp>;
  }



  // Selection / hover ring via Tailwind
  const ringClass = isSelected
    ? "ring-2 ring-inset ring-indigo-500"
    : isHovered
    ? "ring-1 ring-inset ring-indigo-400/50"
    : "";

  return (
    <div
      data-node-id={node.id}
      className={`relative ${ringClass}`}
      onContextMenu={(e) => {
        if (meta.allowChildren) {
          e.preventDefault();
          onContextMenu(e, node.id);
        }
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        setHoveredId(node.id);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setHoveredId((id) => (id === node.id ? null : id));
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
    >
      <Comp {...node.props}>{renderedChildren}</Comp>

      {isSelected && (
        <>
          <div className="absolute -top-6 left-0 bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider z-50 pointer-events-none">
            {node.type}
          </div>
          <div className="absolute -top-6 right-0 flex gap-0.5 bg-indigo-500 rounded p-0.5 z-50 shadow-md">
            {meta.allowChildren && (
              <button
                className="w-5 h-5 inline-flex items-center justify-center text-white text-xs hover:bg-white/20 rounded"
                title="Add child"
                onClick={(e) => {
                  e.stopPropagation();
                  onContextMenu(e, node.id);
                }}
              >
                +
              </button>
            )}
            {!isRoot && (
              <>
                <button
                  className="w-5 h-5 inline-flex items-center justify-center text-white text-xs hover:bg-white/20 rounded"
                  title="Duplicate"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(node.id);
                  }}
                >
                  ⎘
                </button>
                <button
                  className="w-5 h-5 inline-flex items-center justify-center text-white text-xs hover:bg-white/20 rounded"
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(node.id);
                  }}
                >
                  ×
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* =============================================================
 * 7. MAIN COMPONENT
 * ============================================================= */

function ReactVisualBuilder({
  initialTree,
  blocks,
  onChange,
  onExportJson,
  onExportJsx,
}) {
  // Build registry (user blocks override defaults of the same name)
  const registry = useMemo(() => {
    const all = [...DEFAULT_BLOCKS];
    if (Array.isArray(blocks)) {
      blocks.forEach((b) => {
        const idx = all.findIndex((x) => x.name === b.name);
        if (idx >= 0) all[idx] = { ...all[idx], ...b };
        else all.push(b);
      });
    }
    const map = {};
    all.forEach((b) => (map[b.name] = b));
    return map;
  }, [blocks]);

  // Initial tree (from initialTree if provided)
  const treeInitialState = useMemo(() => {
    if (initialTree) {
      return ensureIds(initialTree);
    }
    return {
      id: "root",
      type: "root",
      props: {},
      children: [],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Undo / redo history
  const [history, setHistory] = useState({
    past: [],
    present: treeInitialState,
    future: [],
  });
  const tree = history.present;

  // Context menu state
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e, nodeId) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      nodeId,
    });
  };

  const closeContextMenu = () => setContextMenu(null);

  const handleAddBlockFromMenu = (blockName) => {
    if (contextMenu) {
      addBlock(blockName, contextMenu.nodeId, "inside");
      closeContextMenu();
    }
  };

  const pushTree = useCallback((newTree) => {
    setHistory((h) => ({
      past: [...h.past, h.present].slice(-50),
      present: newTree,
      future: [],
    }));
  }, []);

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.past.length === 0) return h;
      const prev = h.past[h.past.length - 1];
      return {
        past: h.past.slice(0, -1),
        present: prev,
        future: [h.present, ...h.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((h) => {
      if (h.future.length === 0) return h;
      const next = h.future[0];
      return {
        past: [...h.past, h.present],
        present: next,
        future: h.future.slice(1),
      };
    });
  }, []);

  const [selectedId, setSelectedId] = useState(treeInitialState.id);
  const [hoveredId, setHoveredId] = useState(null);
  const [device, setDevice] = useState("desktop");
  const [previewMode, setPreviewMode] = useState(false);
  const [showJsx, setShowJsx] = useState(false);
  const [leftTab, setLeftTab] = useState("blocks");

  // Generated JSX
  const jsx = useMemo(() => generateJsx(tree, 0), [tree]);

  // onChange notification (sends JSON tree)
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  useEffect(() => {
    if (onChangeRef.current) onChangeRef.current(tree);
  }, [tree]);

  /* ---------- Actions ---------- */

  const updateProps = useCallback(
    (id, props) => {
      pushTree(immutableUpdate(tree, id, (n) => ({ ...n, props })));
    },
    [tree, pushTree]
  );

  const duplicateNode = useCallback(
    (id) => {
      if (id === tree.id) return;
      const parent = findParent(tree, id);
      if (!parent) return;
      const idx = parent.children.findIndex((c) => c.id === id);
      const original = parent.children[idx];
      const copy = cloneNodeDeep(original);
      pushTree(immutableInsert(tree, parent.id, idx + 1, copy));
      setSelectedId(copy.id);
    },
    [tree, pushTree]
  );

  const removeNode = useCallback(
    (id) => {
      if (id === tree.id) return;
      const parent = findParent(tree, id);
      pushTree(immutableRemove(tree, id));
      setSelectedId(parent ? parent.id : tree.id);
    },
    [tree, pushTree]
  );

  const addBlock = useCallback(
    (blockName, parentId, position = "inside") => {
      const meta = registry[blockName];
      if (!meta) return;
      const newNode = {
        id: uid(),
        type: blockName,
        props: { ...(meta.defaultProps || {}) },
        children: [],
      };

      let targetParentId = parentId || tree.id;
      let insertIndex = -1;

      if (position === "before" || position === "after") {
        const target = findNode(tree, parentId);
        const parent = findParent(tree, parentId);
        if (parent && target) {
          targetParentId = parent.id;
          const idx = parent.children.findIndex((c) => c.id === target.id);
          insertIndex = position === "before" ? idx : idx + 1;
        } else {
          targetParentId = tree.id;
          insertIndex = -1;
        }
      } else {
        // "inside"
        const target = findNode(tree, parentId) || tree;
        const targetMeta = registry[target.type];
        if (targetMeta && targetMeta.allowChildren) {
          targetParentId = target.id;
          insertIndex = -1;
        } else {
          const parent = findParent(tree, parentId);
          if (parent) {
            targetParentId = parent.id;
            const idx = parent.children.findIndex((c) => c.id === parentId);
            insertIndex = idx + 1;
          } else {
            targetParentId = tree.id;
            insertIndex = -1;
          }
        }
      }

      pushTree(immutableInsert(tree, targetParentId, insertIndex, newNode));
      setSelectedId(newNode.id);
    },
    [tree, registry, pushTree]
  );



  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const target = e.target;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);
      if (isInput) return;
      const metaKey = e.metaKey || e.ctrlKey;
      if (metaKey && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        (metaKey && e.key.toLowerCase() === "y") ||
        (metaKey && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        e.preventDefault();
        redo();
      } else if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedId &&
        selectedId !== tree.id
      ) {
        e.preventDefault();
        removeNode(selectedId);
      } else if (
        metaKey &&
        e.key.toLowerCase() === "d" &&
        selectedId &&
        selectedId !== tree.id
      ) {
        e.preventDefault();
        duplicateNode(selectedId);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedId, tree.id, undo, redo, removeNode, duplicateNode]);

  const selectedNode = selectedId ? findNode(tree, selectedId) : null;

  const frameStyle =
    device === "tablet"
      ? { maxWidth: 768, width: 768 }
      : device === "mobile"
      ? { maxWidth: 375, width: 375 }
      : { width: "100%" };

  const tabBase =
    "flex-1 h-9 bg-transparent border-0 cursor-pointer text-xs border-b-2 border-transparent transition-colors";
  const tabActive = "text-zinc-100 border-indigo-500";
  const tabInactive = "text-zinc-400 hover:text-zinc-100";

  return (
    <div className="flex flex-col w-full h-screen bg-zinc-950 text-zinc-100 text-[13px] overflow-hidden font-sans">
      <Toolbar
        device={device}
        setDevice={setDevice}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        showJsx={showJsx}
        setShowJsx={setShowJsx}
        onExportJson={onExportJson}
        onExportJsx={onExportJsx}
        jsx={jsx}
        tree={tree}
        canUndo={history.past.length > 0}
        canRedo={history.future.length > 0}
        undo={undo}
        redo={redo}
      />

      <div className="flex-1 flex min-h-0">
        {!previewMode && (
          <div
            className="bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0"
            style={{ width: 280 }}
          >
            <div className="flex border-b border-zinc-800">
              <button
                className={`${tabBase} ${
                  leftTab === "blocks" ? tabActive : tabInactive
                }`}
                onClick={() => setLeftTab("blocks")}
              >
                Blocks
              </button>
              <button
                className={`${tabBase} ${
                  leftTab === "layers" ? tabActive : tabInactive
                }`}
                onClick={() => setLeftTab("layers")}
              >
                Layers
              </button>
            </div>
            {leftTab === "blocks" ? (
              <BlocksLibrary
                registry={registry}
                onAddBlock={(name) => {
                  const selectedNode = selectedId ? findNode(tree, selectedId) : null;
                  if (selectedNode) {
                    const meta = registry[selectedNode.type];
                    if (meta && meta.allowChildren) {
                      addBlock(name, selectedId, "inside");
                    } else {
                      addBlock(name, tree.id, "inside");
                    }
                  } else {
                    addBlock(name, tree.id, "inside");
                  }
                }}
              />
            ) : (
              <LayersPanel
                tree={tree}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onDuplicate={duplicateNode}
                onRemove={removeNode}
                registry={registry}
              />
            )}
          </div>
        )}

        <div
          className="flex-1 bg-zinc-950 flex flex-col min-w-0 overflow-hidden"
        >
          <div className="flex-1 overflow-auto p-6 flex justify-center items-start">
            <div
              className="bg-white text-zinc-900 rounded shadow-2xl min-h-full relative transition-all duration-200"
              style={frameStyle}
              onClick={() => setSelectedId(tree.id)}
            >
              <NodeWrapper
                node={tree}
                registry={registry}
                selectedId={selectedId}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                onSelect={setSelectedId}
                onDuplicate={duplicateNode}
                onRemove={removeNode}
                onAddBlock={addBlock}
                previewMode={previewMode}
                onContextMenu={handleContextMenu}
              />
            </div>
          </div>
        </div>

        {!previewMode && (
          <div
            className="bg-zinc-900 border-l border-zinc-800 flex flex-col shrink-0"
            style={{ width: 280 }}
          >
            <div className="flex border-b border-zinc-800">
              <button className={`${tabBase} ${tabActive}`}>Inspector</button>
            </div>
            <PropsInspector
              node={selectedNode}
              registry={registry}
              onUpdateProps={updateProps}
              onDuplicate={duplicateNode}
              onRemove={removeNode}
            />
          </div>
        )}
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          registry={registry}
          onAddBlock={handleAddBlockFromMenu}
          onClose={closeContextMenu}
        />
      )}

      {showJsx && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
          onClick={() => setShowJsx(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="m-0 text-sm font-semibold text-zinc-100">
                Generated JSX
              </h3>
              <div className="flex gap-1.5">
                <button
                  className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-xs text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(jsx);
                    }
                  }}
                >
                  ⧉ Copy
                </button>
                <button
                  className="inline-flex items-center gap-1 h-7 px-3 rounded-md text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                  onClick={() => {
                    if (onExportJson) onExportJson(tree);
                    if (onExportJsx) onExportJsx(jsx);
                  }}
                >
                  ⤓ Export
                </button>
                <button
                  className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-xs text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
                  onClick={() => setShowJsx(false)}
                >
                  ×
                </button>
              </div>
            </div>
            <pre
              className="flex-1 overflow-auto m-0 p-4 font-mono text-xs leading-relaxed text-indigo-200 bg-zinc-950 whitespace-pre"
            >
              {jsx}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReactVisualBuilder;