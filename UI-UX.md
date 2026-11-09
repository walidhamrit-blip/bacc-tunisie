# Simplification de l'interface

Objectif : rendre l'application compréhensible au premier regard **sans supprimer aucune fonctionnalité**.
Les 15 rubriques et toutes les pages de détail restent accessibles.

## Ce qui posait problème

- **En-tête** : 13 liens + 2 boutons d'action, puis une seconde barre de 14 puces défilantes sur mobile
  (la même navigation présentée deux fois).
- **Accueil** : 7 blocs empilés (héros + tableau de bord + 6 cartes colorées + Pomodoro complet +
  8 cartes matières + méthode + promotion PDF + 3 fiches), avec 3 appels à l'action concurrents
  et des liens répétés partout.
- **Pied de page** : 14 liens, doublon de l'en-tête.
- **Forme** : dégradés flous en fond, 5 couleurs d'accent + emojis, badges et textes en gras multiples,
  intitulés techniques (« SM-2 », « Gamification », « Anti-partage de compte »).

## Principes appliqués

1. **Un seul endroit pour naviguer.** `src/lib/navigation.ts` est la source de vérité :
   4 accès rapides permanents (`Cours`, `Exercices`, `Examens`, `Quiz`) et un menu « Toutes les
   rubriques » qui range les 15 pages en 3 groupes : *Apprendre*, *S'entraîner*, *Suivre mes progrès*.
   Le même menu sert sur mobile, à la place de l'ancienne barre dupliquée.
2. **Une seule action principale par écran.** L'accueil propose « Commencer à réviser » et une
   action secondaire « Voir ma progression ». Les autres outils sont dans un plan du site lisible,
   pas dans une grille de cartes concurrentes.
3. **Progression divulguée.** Le widget Pomodoro et les 8 cartes matières ont quitté l'accueil :
   ils restent disponibles en plein écran sur `/organisation` et `/matieres`. Le tableau de bord
   d'accueil ne garde que 4 chiffres utiles et renvoie vers `/evaluation` pour le détail.
4. **Hiérarchie visuelle calme.** Fond uni, une seule couleur d'accent (rouge), icônes linéaires
   monochromes, titres de page courts + une seule phrase d'explication, espacements plus généreux.
5. **Accessibilité.** Focus visible sur tous les contrôles, menu fermable par `Échap` ou clic extérieur,
   verrouillage du scroll quand le menu est ouvert, `aria-current` sur la page active,
   animation désactivée avec `prefers-reduced-motion`, réglage de la taille de police (`A−` / `A+` jusqu'à 145 %)
   dans la barre supérieure pour les élèves à faible vision. Le mode sombre est conservé.

## Où trouver chaque chose

| Groupe | Rubriques |
| --- | --- |
| Apprendre | Matières, Fiches de cours, Programme officiel, Flashcards, Carnet d'erreurs, Communauté |
| S'entraîner | Exercices corrigés, Examens & séries, Quiz, Bac blanc, Corriger un PDF |
| Suivre mes progrès | Mon niveau, Calculateur FG, Organisation, Mon compte |

Pour ajouter une rubrique : l'ajouter dans `NAV_GROUPS` (ou `PRIMARY_NAV`) de
`src/lib/navigation.ts`. L'en-tête, le menu, le plan du site de l'accueil et le pied de page
se mettent à jour automatiquement.
