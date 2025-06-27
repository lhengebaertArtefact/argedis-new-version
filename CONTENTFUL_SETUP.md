# Configuration Contentful

## Prérequis

Tu as déjà un compte Contentful existant avec des données. Voici comment connecter ce projet à ton compte existant.

## Étapes de configuration

### 1. Récupérer les clés d'API

Dans ton dashboard Contentful existant :

1. Va dans **Settings > API keys**
2. Sélectionne ton API key existant ou crée-en un nouveau
3. Note le **Space ID** et le **Content Delivery API - access token**

### 2. Configurer les variables d'environnement

Crée un fichier `.env.local` à la racine du projet :

```env
CONTENTFUL_SPACE_ID=ton_space_id_ici
CONTENTFUL_ACCESS_TOKEN=ton_access_token_ici
```

### 3. Structure des données Contentful

Assure-toi que ton Space Contentful contient les types de contenu suivants :

#### Type "Station"

- `id` (Short text)
- `backgroundRadient` (Short text - URL)
- `primaryColor` (Short text - couleur hex)
- `secondaryColor` (Short text - couleur hex)
- `lottieMap` (Short text - URL)
- `producersCollection` (Reference - many -> Producer)

#### Type "Producer"

- `id` (Short text)
- `title1` (Short text)
- `title2` (Short text)
- `y` (Number)
- `x` (Number)
- `picture` (Media - Image)
- `miniMap` (Media - Image)
- `description` (Rich text)
- `hasSpace` (Boolean)
- `productsCollection` (Reference - many -> Product)

#### Type "Product"

- `id` (Short text)
- `picture` (Media - Image)

### 4. Locales

Assure-toi d'avoir configuré les locales :

- **French (France)** - `fr`
- **English (United States)** - `en`

## Utilisation

Une fois configuré, l'application utilisera automatiquement les données Contentful au lieu des données mock.

### Fonctionnalités

- **Chargement automatique** : Les données se chargent automatiquement depuis Contentful
- **Gestion des erreurs** : Affichage d'erreurs en cas de problème de connexion
- **États de chargement** : Indicateurs de chargement pendant la récupération des données
- **Support multilingue** : Les données se chargent selon la locale sélectionnée

### Hooks disponibles

- `useContentfulStations(locale)` : Récupère la liste des stations
- `useContentfulStationData(stationId, locale)` : Récupère les données d'une station spécifique

## Dépannage

### Erreur "Space ID not found"

- Vérifie que le `CONTENTFUL_SPACE_ID` est correct
- Assure-toi que tu as accès au Space

### Erreur "Access token invalid"

- Vérifie que le `CONTENTFUL_ACCESS_TOKEN` est correct
- Assure-toi que le token a les bonnes permissions

### Données vides

- Vérifie que les types de contenu existent dans ton Space
- Assure-toi que les champs correspondent à la structure attendue
