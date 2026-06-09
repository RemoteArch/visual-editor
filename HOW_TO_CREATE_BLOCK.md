# Comment créer un nouveau bloc JSX pour le Visual Editor

Ce guide explique comment créer un nouveau bloc pour le visual editor React.

## Structure d'un bloc

Un bloc est composé de deux parties principales:

1. **`json_config`** - Configuration du bloc pour l'éditeur
2. **Composant React par défaut** - Implémentation du bloc

## Exemple de base

```jsx
export const json_config = {
  type: "MonBloc",
  label: "Mon Bloc",
  category: "Layout",
  description: "Description du bloc",
  icon: "fa-solid fa-layer-group",
  acceptsChildren: true,
  props: {
    // Définition des props
  }
};

export default function MonBloc({ children, ...props }) {
  return (
    <div style={{ /* styles inline */ }}>
      {children}
    </div>
  );
}
```

## Configuration json_config

### Propriétés obligatoires

- **`type`** (string): Identifiant unique du bloc (ex: "Section", "Button")
- **`label`** (string): Nom affiché dans l'éditeur
- **`category`** (string): Catégorie du bloc (Layout, Media, Forms, Widgets, Advanced, Page)
- **`description`** (string): Description du bloc
- **`icon`** (string): Icône Font Awesome (ex: "fa-solid fa-layer-group")
- **`acceptsChildren`** (boolean): Si le bloc peut contenir d'autres blocs
- **`props`** (object): Définition des props éditables

### Propriétés optionnelles

- **`isRoot`** (boolean): Si c'est le bloc racine (pour Page uniquement)

## Définition des props

Chaque prop dans l'objet `props` doit avoir:

- **`type`** (string): Type de champ
- **`label`** (string): Label affiché dans l'éditeur
- **`default`** (any): Valeur par défaut

### Types de props disponibles

#### `string`
```jsx
text: {
  type: "string",
  label: "Texte",
  default: "Hello World"
}
```

#### `textarea`
```jsx
content: {
  type: "textarea",
  label: "Contenu",
  default: "Ligne 1\nLigne 2"
}
```

#### `number`
```jsx
count: {
  type: "number",
  label: "Nombre",
  default: 10
}
```

#### `int`
```jsx
age: {
  type: "int",
  label: "Âge",
  default: 25
}
```

#### `double`
```jsx
price: {
  type: "double",
  label: "Prix",
  default: 19.99
}
```

#### `boolean`
```jsx
visible: {
  type: "boolean",
  label: "Visible",
  default: true
}
```

#### `select`
```jsx
size: {
  type: "select",
  label: "Taille",
  default: "medium",
  options: ["small", "medium", "large"]
}
```

#### `color`
```jsx
backgroundColor: {
  type: "color",
  label: "Couleur de fond",
  default: "#ffffff"
}
```

## Styles inline (IMPORTANT)

**NE PAS utiliser de classes Tailwind CSS.** Utilisez uniquement des styles inline avec des props explicites.

### Mauvais exemple (NE PAS FAIRE):
```jsx
export default function MonBloc({ children, className = "p-4 bg-white" }) {
  return <div className={className}>{children}</div>;
}
```

### Bon exemple:
```jsx
export const json_config = {
  // ...
  props: {
    padding: {
      type: "select",
      label: "Padding (px)",
      default: "16",
      options: ["0", "8", "16", "24", "32"]
    },
    backgroundColor: {
      type: "color",
      label: "Couleur de fond",
      default: "#ffffff"
    }
  }
};

export default function MonBloc({ children, padding = "16", backgroundColor = "#ffffff" }) {
  return (
    <div style={{ padding: `${padding}px`, backgroundColor }}>
      {children}
    </div>
  );
}
```

## Exemple complet: Bloc Section

```jsx
export const json_config = {
  type: "Section",
  label: "Section",
  category: "Layout",
  description: "Section container",
  acceptsChildren: true,
  props: {
    padding: {
      type: "select",
      label: "Padding (px)",
      default: "64",
      options: ["0", "16", "32", "64", "96", "128"]
    },
    backgroundColor: {
      type: "color",
      label: "Background Color",
      default: "#ffffff"
    },
    maxWidth: {
      type: "select",
      label: "Max Width",
      default: "1200",
      options: ["640", "768", "1024", "1200", "1400", "none"]
    }
  }
};

export default function Section({ children, padding = "64", backgroundColor = "#ffffff", maxWidth = "1200" }) {
  return (
    <section style={{ padding: `${padding}px`, backgroundColor }}>
      <div style={{ maxWidth: maxWidth === "none" ? "none" : `${maxWidth}px`, margin: "0 auto" }}>
        {children}
      </div>
    </section>
  );
}
```

## Exemple avec enfants: Bloc Tabs

```jsx
export const json_config = {
  type: "Tabs",
  label: "Tabs",
  category: "Advanced",
  description: "Tabbed content container",
  acceptsChildren: true,
  props: {
    titles: {
      type: "textarea",
      label: "Tab Titles (one per line)",
      default: "Tab 1\nTab 2\nTab 3"
    },
    activeColor: {
      type: "color",
      label: "Active Color",
      default: "#4f46e5"
    },
    inactiveColor: {
      type: "color",
      label: "Inactive Color",
      default: "#6b7280"
    }
  }
};

export default function Tabs({ children, titles = "Tab 1\nTab 2\nTab 3", activeColor = "#4f46e5", inactiveColor = "#6b7280" }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const childArray = React.Children.toArray(children);
  const titleList = typeof titles === "string" ? titles.split("\n").filter(t => t.trim()) : titles;

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
        {titleList.map((title, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "8px 16px",
              fontWeight: "500",
              color: activeTab === index ? activeColor : inactiveColor,
              borderBottom: activeTab === index ? `2px solid ${activeColor}` : "none",
              cursor: "pointer",
              background: "none",
              border: "none"
            }}
          >
            {title}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px" }}>
        {childArray[activeTab] || null}
      </div>
    </div>
  );
}
```

## Emplacement du fichier

Placez votre fichier dans le dossier `blocks/` avec l'extension `.jsx`:

```
blocks/
  Section.jsx
  Button.jsx
  MonNouveauBloc.jsx
```

## Intégration dans l'éditeur

Le bloc sera automatiquement disponible dans:
- La bibliothèque de blocs (catégorie spécifiée)
- Le panneau des propriétés pour éditer les props
- La génération JSX automatique

## Bonnes pratiques

1. **Utilisez des props explicites** pour tout ce qui est stylable (couleurs, tailles, espacements)
2. **Évitez les valeurs codées en dur** dans le composant
3. **Utilisez des styles inline** avec des props
4. **Gérez les enfants** avec `acceptsChildren: true` si nécessaire
5. **Utilisez React.useState** pour l'état local (comme Tabs, Accordion)
6. **Testez** votre bloc dans l'éditeur avant de le déployer

## Structure du fichier

Un fichier de bloc doit contenir deux exports:

1. **`export const json_config`** - Configuration du bloc pour l'éditeur
2. **`export default function`** - Composant React par défaut

### Exemple de structure minimale

```jsx
export const json_config = {
  type: "MonBloc",
  label: "Mon Bloc",
  category: "Layout",
  description: "Description",
  acceptsChildren: false,
  props: {}
};

export default function MonBloc({ ...props }) {
  return <div>{/* JSX */}</div>;
}
```

## Définition de la configuration

`json_config` définit comment le bloc apparaît dans l'éditeur:

- **type**: Nom unique du bloc (ex: "Section", "Button")
- **label**: Nom affiché dans l'interface
- **category**: Catégorie (Layout, Media, Forms, Widgets, Advanced, Page)
- **description**: Description courte
- **acceptsChildren**: `true` si le bloc peut contenir d'autres blocs, `false` sinon
- **props**: Liste des propriétés modifiables

## Définition du composant par défaut

Le composant est une fonction React qui:

- Reçoit les props définis dans `json_config.props`
- Utilise des styles inline basés sur ces props
- Peut avoir un état local avec `React.useState`
- Peut afficher des enfants avec `React.Children.toArray(children)`

## Importation dans l'éditeur

Le bloc est importé automatiquement:

```jsx
import MonBloc from './blocks/MonBloc.jsx';
```

L'éditeur utilise `json_config` pour afficher le bloc et créer les champs d'édition.
