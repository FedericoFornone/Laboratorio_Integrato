# Nomad

This is a web application about tourism, named "_Nomad_". The application analyses official datasets  
from Istat ([istat.it](https://www.istat.it)) and generates statistics and predictions about tourists flow  
in the region Abruzzo. The predictions are calculated using a trained machine learning model.

The web application has the following areas:

- Homepage
- Dashboard (with two sections, statistics and forecasts)
- About (about the company and the project Nomad)

---

- [Nomad](#nomad)
  - [Usage](#usage)
  - [Configuration and technical characteristics](#configuration-and-technical-characteristics)
  - [Files and project structure](#files-and-project-structure)
  - [Features delivered](#features-delivered)
    - [Additional features](#additional-features)
  - [Browser compatibility](#browser-compatibility)
  - [External resources](#external-resources)
  - [License and contact information](#license-and-contact-information)
  - [Authors](#authors)
    - [Contacts](#contacts)
  - [Changelog and version history](#changelog-and-version-history)
---

## Usage

This web application can ben run in a number of different ways. To open the application in a      
local environment you have to first clone the [repository from Github](https://github.com/FedericoFornone/Laboratorio_Integrato) and open it in your IDE.     

Then you have to run this command: 

```
npm ci
```

and after

```
npm start
```
to run the application in development mode.     


Note that you have to follow some instructions to have the backend up and running.    
In the next section you can find the link to that documentation.    

If you want, you can check a deployed version of the project on this link, but note that you won't   
see the dashboard because the database is not yet deployed.      
The entire project will be deployed soon.    

---

## Configuration and technical characteristics

The project is written entirely in `HTML5`, `SCSS` and `Typescript`, using the framework `Angular15`.       
The backend is written using `SpringBoot` and `Java`, while the fintech is written using `Python`.      

You can find their relative documentation here:     

- [Backend](https://github.com/FedericoFornone/Laboratorio_Integrato/blob/dev/Backend/README.md)
- [Fintech](https://github.com/FedericoFornone/Laboratorio_Integrato/blob/dev/Fintech/README.md)

---

## Files and project structure

```
Files structure
    components/ -> components used in all the application
        avatar/
        button/
        content/ -> component used to display content in the dashboard
        footer/
        multistep-modal/ -> modal used to display the tutorials
        navbar/
        responsive-slider/ -> slider of the dashboard
    pages/
        home/
        dashboard/
            stats/ -> the statistics and predictions page shown in the dashboard
        about/
        page-not-found/ -> the 404 page
    models/
        api.model.ts -> it contains all the interfaces used to handle the API
    resolvers/
        arrivalpredictions.resolver.ts   
        arrivalstats.resolver.ts
        attendancepredictions.resolver.ts
        attendancestats.resolver.ts
        region.resolver.ts
        windowsize.resolver.ts
    services/
        predictions.service.ts
        stats.service.ts
        utils.ts -> utils functions for the application
    assets/
        404/ -> image for the 404 page
        home/
        about/
        provinces/ -> images for the dashboard
        flags/ -> flags svg for the navbar
        logos/ -> logos of Nomad
        i18n/ -> json files to translate the application
    app-routing.module.ts -> the Angular file to simulate the application routes
    app-component.html -> the main component hmtl
    app-component.ts -> the main component logic
    app.module.ts
    index.html
    styles.scss
    LICENSE
    README.md
```

---

## Features delivered

The main feature of the application is the dashboard, where are displayed the statistics and the predictions.  
When the user opens the dashboard, he can choose to see the charts for the entire region or for a specific province.  
Note that when he enters the page for the **first time**, a **tutorial** is showed to guide him through the page. This tutorial is always  
accesibile clicking on the question mark on the top right corner of the page.

After the user has chosen an area of Abruzzo, he can see the dashboard with the charts. The page is divided in two sections:

- The statistics section
- The forecasts section

Both the sections shows the necessary information to better understand the page, the control panel with the filters and the charts.  
Let's analyse in details the control panel and the charts. The control panel has 3 filter per section:

- **Type of tourists**: it concerns their country of residence. You can choose between Italians, foreigners or both.
- **Residence structure**: you can choose the accommodation among hotels, other (includes b&b, farmhouses or private) or all.
- **Year**:
  - of the statistics: it concerns the section Statistics. You can choose a year in particular from 2008 to 2021.
  - of the forecast: it concerns the Forecast section. You can choose a particular year from 2022 to 2032.

Note that when the user enters the page for the **first time**, a **tutorial** is showed to guide him through the page. This tutorial is always  
accessible clicking on the question mark on the top right corner of the page.

The user can choose to **NOT** select any filter. In that case he will see:

- the statistics of all tourists in any residence structure in the year 2021
- the predictive model of all tourists in any residence structure from January 2022 to December 2026   



⚠️ Some important information about the forecast sections:      

- the predictive model is only accurate for the first 5 years, later it will be less precise
- the model does not consider the years 2020 and 2021, in which the COVID-19 has determined an intense bending of the tourist      
flows in all the national territory
- If the user prefers to take these years into account, he can select the check below the control panel.      
However, we advise not to consider them for greater stability of the model.

### Additional features     

We have delivered two addictional features on the project:   

- a **dark mode**, in the navbar there is a toggle with an icon of the moon.     
- the possibility to **change the language** of the web application. We have used     
  Angular international to do so, you can find a link to its documentation in the [External resources](#external-resources) section

--- 

## Browser compatibility

Given the choice to create the web application with Angular15, there are no issues with these browsers that the framework supports:        

- Chrome, 2 most recent versions
- Firefox, latest and extended support release (ESR)
- Edge, 2 most recent major versions
- Safari, 2 most recent major versions
- iOS, 2 most recent major versions
- Android, 2 most recent major versions

You can check the link in the [External resources](#external-resources) section to find more.   


## External resources

- Undraw open source for the illustrations: [Undraw](https://undraw.co/)
- Free images without copyright: [Unsplash](https://unsplash.com/)
- The template for the license: [Choose a license](https://choosealicense.com/)
- Tailwind CSS library for the style: [TailwindCSS](https://tailwindcss.com/)
- DaisyUI plugin: [DaisyUI](https://daisyui.com/)
- Angular International to translate the application: [Angular International](https://angular.io/guide/i18n-overview)
- Angular browser support: [Angular Documentation](https://angular.io/guide/browser-support)
- ChartJS library to show the charts: [ChartsJS](https://www.chartjs.org/)

---

## License and contact information

License: there is a file LICENSE that contains an open source license.
The template is taken from an online generator, to have more info
check the link in the [External resources](#external-resources) section.

---

## Authors

- Jacopo Trompeo, Web Developer
- Luna Diatto, Web Developer
- Michele Aliverti, Web Developer

### Contacts

- jacopo.trompeo@edu.itspiemonte.it
- luna.diatto@edu.itspiemonte.it
- michele.aliverti@edu.itspiemonte.it

---

## Changelog and version history

You can check the git history of this project from our repository:
[Nomad Project](https://github.com/FedericoFornone/Laboratorio_Integrato).
