# Nomad



---

- [Nomad](#nomad)
  - [Usage](#usage)
  - [Configuration and technical characteristics](#configuration-and-technical-characteristics)
    - [Additional technicalities](#additional-technicalities)
  - [Files and project structure](#files-and-project-structure)
  - [Features delivered](#features-delivered)
  - [Browser compatibility](#browser-compatibility)
  - [External resources](#external-resources)
  - [License and contact information](#license-and-contact-information)
  - [Authors](#authors)
  - [Changelog and version history](#changelog-and-version-history)

---

## Usage 


---

## Configuration and technical characteristics



### Additional technicalities



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
        arrivalpredictions.resolver.ts    FIXME:
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
    JSDoc/ -> client documentation  TODO:
    LICENSE
    README.md
```

--- 
## Features delivered




## Browser compatibility             

Given the choice to create the web application with Angular15, there are no issues with these browsers that the framework supports:                 

-  


---

## External resources

- Undraw open source for the illustrations: [Undraw](https://undraw.co/)
- Free images without copyright: [Unsplash](https://unsplash.com/)
- The template for the license: [Choose a license](https://choosealicense.com/)
- Tailwind CSS library for the style: [TailwindCSS](https://tailwindcss.com/)
- DaisyUI plugin: [DaisyUI](https://daisyui.com/)
- Angular International to translate the application: [Angular International](https://angular.io/guide/i18n-overview)


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

---

## Changelog and version history

You can check the git history of this project from our repository:
[Nomad Project](https://github.com/FedericoFornone/Laboratorio_Integrato).




