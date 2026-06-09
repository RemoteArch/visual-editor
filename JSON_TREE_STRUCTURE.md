# Structure du JSON Tree (Device Tree)

Le visual editor utilise une structure JSON tree pour représenter le composant. Chaque nœud dans l'arbre représente un bloc.

## Structure d'un nœud

```json
{
  "id": "unique-id",
  "type": "BlockType",
  "props": {
    "propName": "value"
  },
  "children": []
}
```

## Propriétés du nœud

- **`id`** (string): Identifiant unique du nœud (généré automatiquement)
- **`type`** (string): Type du bloc (correspond à `json_config.type`)
- **`props`** (object): Propriétés du bloc avec leurs valeurs
- **`children`** (array): Tableau des nœuds enfants

## Exemple de tree complet

```json
{
  "id": "root",
  "type": "root",
  "props": {},
  "children": [
    {
      "id": "n_a3qiic0bz0",
      "type": "Map",
      "props": {
        "address": "rue casternau",
        "zoom": "15",
        "height": "600"
      },
      "children": []
    }
  ]
}
```

## Initialisation avec initialTree

Pour initialiser l'éditeur avec un tree existant:

```jsx
<ReactVisualBuilder
  initialTree={{
    id: "root",
    type: "root",
    props: {},
    children: [
      // vos blocs ici
    ]
  }}
  blocks={blocks}
  onChange={(tree) => console.log(tree)}
  onExportJson={(tree) => console.log(tree)}
  onExportJsx={(jsx) => console.log(jsx)}
/>
```

## Export du JSON Tree

Le callback `onExportJson` reçoit le tree complet:

```jsx
const handleExportJson = (tree) => {
  const json = JSON.stringify(tree, null, 2);
  // Sauvegarder ou envoyer le JSON
  console.log(json);
};
```

## Génération JSX

Le tree est automatiquement converti en JSX pour l'export. La fonction `generateJsx` parcourt le tree récursivement et génère le JSX correspondant.

### Exemple de génération

Le tree JSON ci-dessus génère le JSX suivant:

```jsx
<>
  <Map address="rue casternau" zoom="15" height="600" />
</>
```

## Modification du tree

Le callback `onChange` est appelé à chaque modification du tree:

```jsx
const handleChange = (tree) => {
  // Sauvegarder le tree à chaque modification
  localStorage.setItem('savedTree', JSON.stringify(tree));
};
```

## Types de blocs courants

- **Layout**: Section, Container, Grid, Columns, FlexContainer, Divider, Spacer
- **Content**: Heading, Paragraph, Text, Link, List, Blockquote, Code
- **Media**: Image, Video, Audio, Gallery, Map
- **Forms**: Input, Textarea, Select, Button, Form, Checkbox, Radio
- **Advanced**: Tabs, Accordion, Alert, CallToAction, Icon, IconBox
- **Widgets**: Menu, Breadcrumb, SearchBar, Pagination, SocialIcons, Logo, Copyright
- **Data**: Counter, Countdown, ProgressBar, PriceTable, Testimonial

## Nœud racine (Root)

Le nœud racine a toujours:
- `type: "root"`
- `props: {}` (vide)
- `children`: tableau des blocs de premier niveau

## Best Practices

1. **IDs uniques**: Chaque nœud doit avoir un ID unique
2. **Immutabilité**: Ne modifiez jamais le tree directement, utilisez les callbacks
3. **Validation**: Vérifiez que le type correspond à un bloc existant
4. **Props**: Assurez-vous que les props correspondent à la configuration du bloc
