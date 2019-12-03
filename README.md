<p align='center'>
  <img src='researchspace\app\assets\images\logo_black.png' alt='ResearchSpace' />
</p>

- - -

<p align="center">
   Clavardage de la communité de Researchspace
</p>

<p align="center">
  <a href="https://gitter.im/researchspace/community"><img src="https://badges.gitter.im/Join Chat.svg" alt="Researchspace gitter"></a>
</p>

- - -

Hercules est une plateforme consistant à faire évoluer le site Web actuel du Répertoire du patrimoine culturel du Québec vers un plateforme sémantique contenant des connaissances structurées et formalisées.

Hercules est développé dans le but d'offrir une plateforme collaborative aux intervenants du secteur afin de colliger, de mettre à jour et de diffuser les données sur le patrimoine culturel québécois au grand public. Hercules contient aussi un volet expérimental, [hercules-extraction](https://github.com/vincentlabonte/hercules-extraction),proposant un outil d’identification et de désambiguïsation des entités nommées présentes dans un texte.

Hercules est une application propulsée par le système de connaissances contextualisées [Researchspace](https://github.com/researchspace/researchspace). 

# Table des matières

   * [Déploiement](#déploiement)
      * [Configuration](#configuration)
   * [Fonctionnalités](#fonctionnalités)
   * [Développement](#développement)

# Déploiement

Les étapes de déploiement sont les mêmes que la plateforme Researchspace. Elles se trouvent au lien suivant : 

[Researchspace Setup](SETUP.md)



## Configuration

### Configuration des entrepôts de données
La plateforme exigera la configuration de l'entrepôt de données par défaut. La figure suivante illustre le menu de configuration de cet entrepôt de données.
![Configuration de l'entrepôt de données par défaut](https://github.com/SamChaps/researchspace/wiki/images/hercules_entrepot_donnees_configuration.jpg)
Pour ce faire, il est essentiel d'avoir les permissions requises à la modification de la configuration des entrepôts de données. Le nom d'utilisateur `admin` et le mot de passe `admin` peuvent être utilisés afin d'accéder au compte administrateur qui a les permissions nécessaires. Ensuite, la configuration proposée dans la [documentation](https://github.com/SamChaps/researchspace/wiki/Entrep%C3%B4ts-de-donn%C3%A9es#entrep%C3%B4t-par-d%C3%A9faut) peut être utilisée pour initialiser l'entrepôt de données par défaut.

### Importation des ontologies
Deux ontologies sont fournies avec le projet, soit [l'ontologie de la CIDOC CRM](researchspace/ontologies/cidoccrm_v6.2.1.ttl) et une [ontologie de métadonnées](researchspace/ontologies/hercules_meta.owl) nécessaire à quelques fonctionnalités de la plateformes. La [documentation usager](https://github.com/SamChaps/researchspace/wiki/Gestion-des-donn%C3%A9es#importation) indique comment importer des données à la plateforme. Le même processus peut être suivi afin d'importer ces deux ontologies.

### Importation des modèles de connaissances
Deux modèles de connaissances sont nécessaires au bon fonctionnement de l'[outil de création de formulaires](https://github.com/SamChaps/researchspace/wiki/Cr%C3%A9ation-de-formulaires#outil-de-cr%C3%A9ation-de-formulaires). Ces derniers se trouvent dans le fichier [label_type_fields.trig](researchspace/external-data/label_type_fields.trig).  La [documentation usager](https://github.com/SamChaps/researchspace/wiki/Mod%C3%A8les-de-connaissances#importationexportation-de-mod%C3%A8les-de-connaissances) indique comment importer des modèles de connaissances à la plateforme.

# Fonctionnalités

La [documentation usager](https://github.com/SamChaps/researchspace/wiki/Documentation-usager) détaille les fonctionnalités principales de la plateforme.

# Développement

La [documentation développeur](https://github.com/SamChaps/researchspace/wiki/Documentation-d%C3%A9veloppeur) détaille différentes informations utiles au développement de la plateforme.