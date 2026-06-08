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

const escapeAttr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const generateJsx = (node, indent = 0) => {
  if (!node) return "";
  const pad = "  ".repeat(indent);
  const propEntries = Object.entries(node.props || {}).filter(
    ([, v]) => v !== undefined && v !== null && v !== ""
  );

  const propsStr = propEntries
    .map(([k, v]) => {
      if (typeof v === "string") return `${k}="${escapeAttr(v)}"`;
      if (typeof v === "boolean") return v ? k : `${k}={false}`;
      if (typeof v === "number") return `${k}={${v}}`;
      return `${k}={${JSON.stringify(v)}}`;
    })
    .join(" ");

  const open = `<${node.type}${propsStr ? " " + propsStr : ""}`;
  const children = node.children || [];

  if (children.length === 0) {
    return `${pad}${open} />`;
  }
  const childrenStr = children
    .map((c) => generateJsx(c, indent + 1))
    .join("\n");
  return `${pad}${open}>\n${childrenStr}\n${pad}</${node.type}>`;
};

/* =============================================================
 * 4. SIMPLE JSX PARSER (handles builder-generated JSX)
 * ============================================================= */

const parseJsx = (src) => {
  const str = String(src || "").trim();
  if (!str) return null;
  let pos = 0;

  const skipWs = () => {
    while (pos < str.length && /\s/.test(str[pos])) pos++;
  };

  const readIdent = () => {
    let s = "";
    while (pos < str.length && /[A-Za-z0-9_$]/.test(str[pos])) s += str[pos++];
    return s;
  };

  const readStringLiteral = (quote) => {
    pos++; // consume opening quote
    let s = "";
    while (pos < str.length && str[pos] !== quote) {
      if (str[pos] === "\\" && pos + 1 < str.length) {
        s += str[pos + 1];
        pos += 2;
      } else {
        s += str[pos++];
      }
    }
    pos++; // consume closing quote
    return s;
  };

  const readBracedExpr = () => {
    pos++; // consume {
    let depth = 1;
    let s = "";
    while (pos < str.length && depth > 0) {
      const ch = str[pos];
      if (ch === "{") {
        depth++;
        s += ch;
        pos++;
      } else if (ch === "}") {
        depth--;
        if (depth === 0) {
          pos++;
          break;
        }
        s += ch;
        pos++;
      } else if (ch === '"' || ch === "'" || ch === "`") {
        const q = ch;
        s += ch;
        pos++;
        while (pos < str.length && str[pos] !== q) {
          if (str[pos] === "\\") {
            s += str[pos] + (str[pos + 1] || "");
            pos += 2;
          } else {
            s += str[pos++];
          }
        }
        s += str[pos] || "";
        pos++;
      } else {
        s += ch;
        pos++;
      }
    }
    const trimmed = s.trim();
    try {
      return JSON.parse(trimmed);
    } catch {
      try {
        // eslint-disable-next-line no-new-func
        return Function(`"use strict";return (${trimmed})`)();
      } catch {
        return trimmed;
      }
    }
  };

  const parseElement = () => {
    skipWs();
    if (str[pos] !== "<") return null;
    pos++; // consume <
    if (str[pos] === "/") return null; // closing tag, handled by caller

    const tagName = readIdent();
    if (!tagName) return null;

    const props = {};
    skipWs();

    while (pos < str.length && str[pos] !== ">" && str[pos] !== "/") {
      const propName = readIdent();
      if (!propName) {
        pos++;
        continue;
      }
      skipWs();
      if (str[pos] === "=") {
        pos++;
        skipWs();
        if (str[pos] === '"' || str[pos] === "'") {
          props[propName] = readStringLiteral(str[pos]);
        } else if (str[pos] === "{") {
          props[propName] = readBracedExpr();
        }
      } else {
        props[propName] = true;
      }
      skipWs();
    }

    if (str[pos] === "/") {
      pos++;
      if (str[pos] === ">") pos++;
      return { id: uid(), type: tagName, props, children: [] };
    }

    if (str[pos] === ">") pos++;

    const children = [];
    while (pos < str.length) {
      skipWs();
      if (str[pos] === "<" && str[pos + 1] === "/") {
        pos += 2;
        readIdent();
        skipWs();
        if (str[pos] === ">") pos++;
        break;
      }
      if (str[pos] === "<") {
        const child = parseElement();
        if (child) children.push(child);
        else break;
      } else {
        pos++;
      }
    }
    return { id: uid(), type: tagName, props, children };
  };

  try {
    return parseElement();
  } catch (e) {
    console.warn("[ReactVisualBuilder] JSX parse failed:", e);
    return null;
  }
};

/* =============================================================
 * 5. JSX SYNTAX HIGHLIGHTING (Tailwind classes)
 * ============================================================= */

const highlightJsx = (jsx) => {
  const escaped = jsx
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(
      /(&lt;\/?)([A-Za-z][\w]*)/g,
      '$1<span class="text-pink-400">$2</span>'
    )
    .replace(
      /(\s)([a-zA-Z][a-zA-Z0-9]*)(=)/g,
      '$1<span class="text-amber-300">$2</span>$3'
    )
    .replace(/("[^"]*")/g, '<span class="text-emerald-400">$1</span>')
    .replace(/(\{[^}]*\})/g, '<span class="text-slate-400">$1</span>');
};

/* =============================================================
 * 6. SUB-COMPONENTS
 * ============================================================= */

function Toolbar({
  device,
  setDevice,
  previewMode,
  setPreviewMode,
  showJsx,
  setShowJsx,
  onExport,
  jsx,
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
        onClick={() => onExport && onExport(jsx)}
        title="Export JSX"
      >
        ⤓ Export JSX
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
                className="bg-zinc-800 border border-zinc-700 rounded-md py-2.5 px-2 flex flex-col items-center gap-1 cursor-grab select-none hover:border-indigo-500 hover:bg-zinc-700/60 transition-colors active:cursor-grabbing"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    "application/x-rvb",
                    JSON.stringify({ kind: "new", blockName: b.name })
                  );
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onDoubleClick={() => onAddBlock(b.name)}
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
              {field.type === "select" && (
                <select
                  className={inputBase}
                  value={value}
                  onChange={(e) => setProp(key, e.target.value)}
                >
                  {(field.options || []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              )}
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
            </div>
          );
        })}
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
  onMove,
  onAddBlock,
  previewMode,
  dropTarget,
  setDropTarget,
}) {
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
      onMove={onMove}
      onAddBlock={onAddBlock}
      previewMode={previewMode}
      dropTarget={dropTarget}
      setDropTarget={setDropTarget}
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
      <div className="m-1 py-6 px-3 border-2 border-dashed border-gray-300 rounded text-center text-gray-400 text-xs">
        Drop blocks here
      </div>
    );
  }

  // Preview mode: render the component without any wrapper chrome
  if (previewMode) {
    return <Comp {...node.props}>{renderedChildren}</Comp>;
  }

  const handleDragStart = (e) => {
    if (isRoot) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    e.dataTransfer.setData(
      "application/x-rvb",
      JSON.stringify({ kind: "move", nodeId: node.id })
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const computePosition = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const h = rect.height;
    let position;
    if (meta.allowChildren) {
      if (y < h * 0.2) position = "before";
      else if (y > h * 0.8) position = "after";
      else position = "inside";
    } else {
      position = y < h / 2 ? "before" : "after";
    }
    if (isRoot && position !== "inside") position = "inside";
    return position;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    const position = computePosition(e);
    if (
      !dropTarget ||
      dropTarget.id !== node.id ||
      dropTarget.position !== position
    ) {
      setDropTarget({ id: node.id, position });
    }
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    if (dropTarget && dropTarget.id === node.id) setDropTarget(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const raw = e.dataTransfer.getData("application/x-rvb");
    if (!raw) {
      setDropTarget(null);
      return;
    }
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      setDropTarget(null);
      return;
    }
    const position = computePosition(e);
    if (payload.kind === "new") {
      onAddBlock(payload.blockName, node.id, position);
    } else if (payload.kind === "move") {
      onMove(payload.nodeId, node.id, position);
    }
    setDropTarget(null);
  };

  const showIndicator =
    dropTarget && dropTarget.id === node.id ? dropTarget.position : null;

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
      draggable={!isRoot}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
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
          {!isRoot && (
            <div className="absolute -top-6 right-0 flex gap-0.5 bg-indigo-500 rounded p-0.5 z-50 shadow-md">
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
                title="Move up"
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(node.id, null, "up");
                }}
              >
                ↑
              </button>
              <button
                className="w-5 h-5 inline-flex items-center justify-center text-white text-xs hover:bg-white/20 rounded"
                title="Move down"
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(node.id, null, "down");
                }}
              >
                ↓
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
            </div>
          )}
        </>
      )}

      {showIndicator === "before" && (
        <div className="absolute left-0 right-0 -top-px h-1 bg-indigo-500 z-50 pointer-events-none shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
      )}
      {showIndicator === "after" && (
        <div className="absolute left-0 right-0 -bottom-px h-1 bg-indigo-500 z-50 pointer-events-none shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
      )}
      {showIndicator === "inside" && (
        <div className="absolute inset-0 bg-indigo-500/10 border-2 border-dashed border-indigo-500 pointer-events-none z-40" />
      )}
    </div>
  );
}

/* =============================================================
 * 7. MAIN COMPONENT
 * ============================================================= */

function ReactVisualBuilder({
  initialJsx,
  blocks,
  onChange,
  onExport,
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

  // Initial tree (from initialJsx if provided)
  const initialTree = useMemo(() => {
    if (initialJsx) {
      const parsed = parseJsx(initialJsx);
      if (parsed) return ensureIds(parsed);
    }
    return {
      id: uid(),
      type: "Page",
      props: { className: "min-h-full bg-white" },
      children: [],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Undo / redo history
  const [history, setHistory] = useState({
    past: [],
    present: initialTree,
    future: [],
  });
  const tree = history.present;

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

  const [selectedId, setSelectedId] = useState(initialTree.id);
  const [hoveredId, setHoveredId] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [device, setDevice] = useState("desktop");
  const [previewMode, setPreviewMode] = useState(false);
  const [showJsx, setShowJsx] = useState(false);
  const [leftTab, setLeftTab] = useState("blocks");

  // Generated JSX
  const jsx = useMemo(() => generateJsx(tree, 0), [tree]);

  // onChange notification
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  useEffect(() => {
    if (onChangeRef.current) onChangeRef.current(jsx);
  }, [jsx]);

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

  const moveNode = useCallback(
    (sourceId, targetId, position) => {
      if (sourceId === tree.id) return;
      if (sourceId === targetId) return;

      // Up / Down quick moves
      if (position === "up" || position === "down") {
        const parent = findParent(tree, sourceId);
        if (!parent) return;
        const idx = parent.children.findIndex((c) => c.id === sourceId);
        const newIdx = position === "up" ? idx - 1 : idx + 1;
        if (newIdx < 0 || newIdx >= parent.children.length) return;
        const node = parent.children[idx];
        const removed = immutableRemove(tree, sourceId);
        pushTree(immutableInsert(removed, parent.id, newIdx, node));
        return;
      }

      const sourceNode = findNode(tree, sourceId);
      if (!sourceNode) return;
      if (isDescendant(sourceNode, targetId)) return;

      const targetNode = findNode(tree, targetId);
      if (!targetNode) return;
      const targetMeta = registry[targetNode.type];

      let newParentId;
      let newIndex;

      if (position === "inside") {
        if (!targetMeta || !targetMeta.allowChildren) return;
        newParentId = targetId;
        newIndex = -1;
      } else {
        const parent = findParent(tree, targetId);
        if (!parent) return;
        const idx = parent.children.findIndex((c) => c.id === targetId);
        newParentId = parent.id;
        newIndex = position === "before" ? idx : idx + 1;
      }

      const removedTree = immutableRemove(tree, sourceId);

      // Adjust index if source was sibling of target in same parent
      if (position !== "inside") {
        const newParent = findNode(removedTree, newParentId);
        if (newParent) {
          const targetIdx = newParent.children.findIndex(
            (c) => c.id === targetId
          );
          if (targetIdx >= 0) {
            newIndex = position === "before" ? targetIdx : targetIdx + 1;
          }
        }
      }

      pushTree(immutableInsert(removedTree, newParentId, newIndex, sourceNode));
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

  /* ---------- Root drop zone ---------- */

  const handleRootDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const handleRootDrop = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/x-rvb");
    if (!raw) return;
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      return;
    }
    if (payload.kind === "new") {
      addBlock(payload.blockName, tree.id, "inside");
    } else if (payload.kind === "move") {
      moveNode(payload.nodeId, tree.id, "inside");
    }
    setDropTarget(null);
  };

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
        onExport={onExport}
        jsx={jsx}
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
                onAddBlock={(name) => addBlock(name, tree.id, "inside")}
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
          onDragOver={handleRootDragOver}
          onDrop={handleRootDrop}
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
                onMove={moveNode}
                onAddBlock={addBlock}
                previewMode={previewMode}
                dropTarget={dropTarget}
                setDropTarget={setDropTarget}
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
                  onClick={() => onExport && onExport(jsx)}
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
              dangerouslySetInnerHTML={{ __html: highlightJsx(jsx) }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ReactVisualBuilder;
export { DEFAULT_BLOCKS, generateJsx, parseJsx };