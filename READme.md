# WineCellular

Application moile de gestion de cave à vin, développée en React NAtive avec Firebase.

## Description 

WineCellular est une application qui permet à l'utilisateur de géré sa ou ses caves à vins.
Elle permet de créer plusieurs caves, d'enregistrer des bouteilles et de consulter leurs détails (le nom, le domain, le pays d'origin, la position de chaque bouteille dans la cave, ...).
Elle propose aussi une partie "découverte" en proposant 50 vins venant du monde entier afin de permettre à l'utilisateur de découvrir de nouveau vin.

## Thème et API

Thème : Le vin (Bouteilles et cave à vin)

API : API perso, faites à partir du wine-dataset disponible sur le site kaggle.com

## Schéma de navigation

Lors du lancement de l'application, l'utilisateur vas se retrouver sur la page d'accueil avec une petite présentation de l'application.
Il pourra ensuite sois consulter la liste de 50 vins proposer par l'application ou alors consulter sa ou ses caves à vin.
Sur la page de découverte des vins, l'utilisateur pourra faire défiler une liste de 50 vins et consulter les détails de ces vins afin d'en apprendre plus et d'y gouter si l'envie lui prends
Ensuite sur la page des caves à vins, l'utilisateur aura un aperçus de ses caves à vin avec leurs nom, la capacité max et le nombres de bouteilles présents et pourra en ajouter si il le souhaite ou s'il a acquis une nouvelle cave à vin
Il pourra depuis cette page gérer les caves indépendament les unes des autres (modifier ou supprimer) ou alors consulter le contenu des caves
Si il consulte le contenu il verra alors toutes les bouteilles présentes dans la cave choisi avec toute les infos des bouteilles (le nom, le domain, le pays d'origin, la position de chaque bouteille dans la cave, ...) et pourra sois ajouter une nouvelle bouteille sois en supprimé une.

## Flux de données distantes

L’application communique avec Firebase Firestore afin de gérer les données de manière centralisée et en temps réel.

### Lecture des données

Les données sont récupérées via la méthode `onSnapshot`, ce qui permet une synchronisation en temps réel entre la base de données et l’application.

Exemples :
- Récupération des caves depuis la collection `WineCellar`
- Récupération des bouteilles liées à une cave spécifique grâce à la collection `Bottle`

À chaque modification dans Firestore, l’interface utilisateur est automatiquement mise à jour.

---

### Écriture des données

Les opérations suivantes sont envoyées vers Firestore :

- Création d’une cave (`addWineCellar`)
- Mise à jour d’une cave (`updateWineCellar`)
- Suppression d’une cave (`deleteWineCellar`)
- Création d’une bouteille (`addBottleToCellar`)
- Association d’une bouteille à une cave via `arrayUnion`
- Suppression d’une bouteille via `arrayRemove`

---

### Relation entre caves et bouteilles

Chaque cave contient un tableau de références vers des documents de la collection `Bottle`.

Lorsqu’une bouteille est ajoutée :
1. Un document est créé dans la collection `Bottle`
2. Sa référence est ajoutée dans le tableau `bottles` du document `WineCellar`

Ce système permet de maintenir une relation propre entre les deux collections.

## Difficultés rencontrées 

 - Mise en place de l'API :
    A défaut d'avoir une API déjà existante en ligne, il a fallut la créer à partir d'un dataset trouver en ligne(sur kaggle.com)

 - Fonction d'ajout et suppression des bouteilles :
    Il a fallut trouver le moyen de supprimé ou créer une bouteille uniquement dans la bonne cave sans altérer les potentielles autres caves présente 

## Choix techniques

### Utilisation de Firestore en temps réel

L’utilisation de `onSnapshot` permet une synchronisation automatique des données entre la base distante et l’application.

Avantages :
- Mise à jour immédiate de l’interface utilisateur
- Pas besoin de rafraîchir manuellement les données
- Meilleure expérience utilisateur

---

### Séparation en couches (Architecture modulaire)

Le projet est structuré en trois parties :

- `components` : composants réutilisables (Card, Form)
- `screens` : écrans principaux de l’application
- `services` : logique liée à Firebase

Cette organisation permet :
- Une meilleure lisibilité du code
- Une séparation claire des responsabilités
- Une maintenance plus simple

---

### Gestion des relations entre données

Les caves contiennent un tableau de références vers les bouteilles via `arrayUnion` et `arrayRemove`.

Ce choix permet :
- Une relation claire entre collections
- Une récupération ciblée des données
- Une base de données plus normalisée

---

### Utilisation des Hooks React

Les hooks `useState` et `useEffect` ont été utilisés pour :
- Gérer les états locaux
- Contrôler l’affichage des modals
- Gérer les flux asynchrones

---

### Gestion des modals pour l’expérience utilisateur

L’utilisation de modals permet :
- Une navigation plus fluide
- Un affichage dynamique sans changer d’écran
- Une meilleure ergonomie
